import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  buildBlock,
  readBlockConfig,
  toCamelCase,
} from './aem.js';

if (window.trustedTypes && window.trustedTypes.createPolicy) {
  const innerTT = window.trustedTypes.createPolicy('tt-inner', {
    createHTML: (s) => s, // avoid stack overflow
  });

  window.trustedTypes.createPolicy('default', {
    createHTML: (input, type, sink) => {
      let processedInput = input;
      if (/srcdoc\s*=/i.test(processedInput)) {
        const doc = new DOMParser().parseFromString(innerTT.createHTML(processedInput), 'text/html');
        doc.querySelectorAll('iframe[srcdoc]').forEach((el) => el.removeAttribute('srcdoc'));
        processedInput = doc.body.innerHTML;
      }
      if (sink.includes('createContextualFragment') || sink.includes('Document write')) {
        const doc = new DOMParser().parseFromString(innerTT.createHTML(processedInput), 'text/html');
        doc.querySelectorAll('script').forEach((el) => el.remove());
        processedInput = doc.body.innerHTML;
      }
      return processedInput;
    },
    createScriptURL: (input) => input,
    createScript: (input) => input,
  });
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Turns `/widgets/...` links into widget blocks.
 * @param {Element} main The container element
 */
function buildWidgetAutoBlocks(main) {
  const widgetLinks = [...main.querySelectorAll('a[href*="/widgets/"]')];
  widgetLinks.forEach((link) => {
    if (link.closest('.widget')) return;
    const newLink = link.cloneNode(true);
    const widgetBlock = buildBlock('widget', { elems: [newLink] });
    const p = link.closest('p');
    if (
      p
      && p.querySelectorAll('a').length === 1
      && p.querySelector('a') === link
      && p.textContent.trim() === link.textContent.trim()
    ) {
      p.replaceWith(widgetBlock);
    } else {
      link.replaceWith(widgetBlock);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto load `*/fragments/*` references
    const fragments = [...main.querySelectorAll('a[href*="/fragments/"]')].filter((f) => !f.closest('.fragment'));
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            fragment.parentElement.replaceWith(...frag.children);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }
    buildWidgetAutoBlocks(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();

    // quick structural checks
    if (a.querySelector('img') || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    // require authored formatting for buttonization
    const strong = a.closest('strong');
    const em = a.closest('em');
    if (!strong && !em) return;

    p.className = 'button-wrapper';
    a.className = 'button';
    if (strong && em) { // high-impact call-to-action
      a.classList.add('accent');
      const outer = strong.contains(em) ? strong : em;
      outer.replaceWith(a);
    } else if (strong) {
      a.classList.add('primary');
      strong.replaceWith(a);
    } else {
      a.classList.add('secondary');
      em.replaceWith(a);
    }
  });
}

/**
 * Tailwind variant prefixes, longest first so `max-nav` wins over `nav`.
 */
const TW_VARIANTS = [
  'max-nav', 'max-2xl', 'max-xl', 'max-lg', 'max-md', 'max-sm',
  'focus-visible', 'focus-within', 'group-hover', 'group-focus',
  'peer-hover', 'peer-focus', 'first-of-type', 'last-of-type',
  'only-of-type', 'motion-reduce', 'motion-safe', 'aria-expanded',
  '2xl', 'xl', 'lg', 'md', 'sm', 'xs',
  'header', 'logo', 'nav', 'no-js',
  'dark', 'hover', 'focus', 'active', 'disabled', 'visited',
  'checked', 'first', 'last', 'odd', 'even', 'print', 'rtl', 'ltr',
];

/**
 * Restores colon variants in a class token.
 * Authors encode colons as underscores (`tw_md_grid-cols-2`); the HTML pipeline
 * then sanitizes both `_` and `:` to hyphens (`tw-md-grid-cols-2`).
 * @param {string} className
 * @returns {string}
 */
function toColonClass(className) {
  if (className.includes('_')) {
    return className.replace(/_/g, ':');
  }
  if (!className.startsWith('tw-') || className.includes(':')) {
    return className;
  }
  let rest = className.slice(3);
  const variants = [];
  let matched = true;
  while (matched) {
    matched = false;
    for (let i = 0; i < TW_VARIANTS.length; i += 1) {
      const variant = TW_VARIANTS[i];
      if (rest === variant || rest.startsWith(`${variant}-`)) {
        variants.push(variant);
        rest = rest.slice(variant.length);
        if (rest.startsWith('-')) rest = rest.slice(1);
        matched = true;
        break;
      }
    }
  }
  return ['tw', ...variants, rest].filter(Boolean).join(':');
}

/**
 * Applies remaining Section Metadata (Style → classes with colons restored)
 * and rewrites pipeline-sanitized `tw-*` classes on the section.
 * @param {Element} main The main element
 */
function applySectionMetadata(main) {
  main.querySelectorAll(':scope > .section').forEach((section) => {
    const metaBlock = section.querySelector('.section-metadata');
    if (metaBlock) {
      const meta = readBlockConfig(metaBlock);
      Object.keys(meta).forEach((key) => {
        if (key === 'style') {
          String(meta.style)
            .split(',')
            .flatMap((part) => part.trim().split(/\s+/))
            .filter((token) => token)
            .forEach((token) => {
              const className = toColonClass(token);
              if (className) section.classList.add(className);
            });
        } else if (key === 'id') {
          section.id = String(meta.id).trim();
        } else {
          section.dataset[toCamelCase(key)] = meta[key];
        }
      });
      const wrapper = metaBlock.parentElement;
      if (wrapper && wrapper !== section && wrapper.childElementCount === 1) {
        wrapper.remove();
      } else {
        metaBlock.remove();
      }
    }
    [...section.classList].forEach((className) => {
      const next = toColonClass(className);
      if (next !== className) section.classList.replace(className, next);
    });
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  applySectionMetadata(main);
  decorateBlocks(main);
  decorateButtons(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
    //loadCSS(`https://qa.equinix.com/etc.clientlibs/eqxcorp/clientlibs/clientlib-v2.lc-344f7a0821e429efd76e605c18285125-lc.min.css`);
    loadCSS(`${window.hlx.codeBasePath}/styles/equinixsite.css`);
}

/**
 * Site chrome (header/footer) is only for authored pages under DA `/dev`.
 * Fragments, redirects, and other root/utility docs should render without it.
 * @returns {boolean}
 */
function shouldLoadSiteChrome() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/dev' || path.startsWith('/dev/');
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const header = doc.querySelector('body > header');
  const footer = doc.querySelector('body > footer');
  const loadChrome = shouldLoadSiteChrome();

  if (loadChrome) {
    loadHeader(header);
  } else {
    header?.remove();
    footer?.remove();
  }

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  if (loadChrome) {
    loadFooter(footer);
  }

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  import('./consent-check.js');
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

/**
 * Enables DA Live Preview in the document editor.
 * Only loads when the page is opened with ?dapreview=...
 * @see https://docs.da.live/authors/reference/live-preview
 */
(async function loadDa() {
  if (!new URL(window.location.href).searchParams.get('dapreview')) return;
  import('https://da.live/scripts/dapreview.js').then(({ default: daPreview }) => daPreview(loadPage));
}());
