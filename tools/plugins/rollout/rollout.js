// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';
// eslint-disable-next-line import/no-unresolved
import { DA_ORIGIN } from 'https://da.live/nx/public/utils/constants.js';

const TRANSLATE_PATH = '/.da/translate.json';
const ROLLOUT_ICON = 'https://da.live/nx/public/plugins/rollout/media_195da69764de2782d555abed3042d8434a040e31c.png';

function sourceUrl(org, repo, path) {
  const withExt = /\.html$/i.test(path) ? path : `${path}.html`;
  return `${DA_ORIGIN}/source/${org}/${repo}${withExt}`;
}

function destinationPath(currPrefix, destPrefix, pagePath) {
  if (currPrefix === '/') return `${destPrefix}${pagePath}`;
  return pagePath.replace(currPrefix, destPrefix);
}

function destEditHash(org, repo, destPrefix, currPrefix, pagePath) {
  return `/${org}/${repo}${destinationPath(currPrefix, destPrefix, pagePath)}`;
}

function normalizePagePath(path) {
  if (!path) return '/';
  const noExt = path.replace(/\.html$/i, '');
  return noExt.startsWith('/') ? noExt : `/${noExt}`;
}

function splitLocales(locales) {
  return String(locales || '')
    .split(',')
    .map((item) => item.trim().replaceAll(' ', ''))
    .filter(Boolean);
}

function normalizePrefix(prefix) {
  if (!prefix) return '';
  const trimmed = String(prefix).trim();
  if (!trimmed || trimmed === '/') return '';
  return trimmed.startsWith('/') ? trimmed.replace(/\/$/, '') : `/${trimmed.replace(/\/$/, '')}`;
}

function collectLocalePrefixes(json) {
  const languages = json?.languages?.data || [];
  const prefixes = new Set();
  languages.forEach((lang) => {
    const location = normalizePrefix(lang.location);
    if (location) prefixes.add(location);
    splitLocales(lang.locales).forEach((locale) => {
      const prefix = normalizePrefix(locale);
      if (prefix) prefixes.add(prefix);
    });
  });
  return [...prefixes].sort((a, b) => b.length - a.length);
}

const ASSET_PREFIXES = [
  '/scripts',
  '/styles',
  '/fonts',
  '/blocks',
  '/icons',
  '/tools',
  '/.da',
];

function isExternalHref(href) {
  if (!href) return true;
  const value = href.trim();
  return value.startsWith('#')
    || value.startsWith('//')
    || /^[a-z][a-z0-9+.-]*:/i.test(value);
}

function isAssetPath(path) {
  if (path.includes('/media_') || path.startsWith('media_')) return true;
  return ASSET_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function splitHref(href) {
  const hashIndex = href.indexOf('#');
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf('?');
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : '';
  const path = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  return { path, suffix: `${query}${hash}` };
}

/**
 * Source /master/en/xyz → /us/en/xyz
 * /xyz → prepend /master/en → /master/en/xyz → /us/en/xyz
 * http(s), mailto, assets, and other locale prefixes are left alone.
 */
function localizePath(path, sourcePrefix, destPrefix, knownPrefixes) {
  if (!path.startsWith('/') || path.startsWith('//') || isAssetPath(path)) return path;

  const source = normalizePrefix(sourcePrefix);
  const dest = normalizePrefix(destPrefix);
  if (!source || !dest) return path;

  if (path === dest || path.startsWith(`${dest}/`)) return path;
  if (path === source || path.startsWith(`${source}/`)) {
    return `${dest}${path.slice(source.length)}`;
  }

  const otherLocale = knownPrefixes.find((prefix) => prefix !== source
    && (path === prefix || path.startsWith(`${prefix}/`)));
  if (otherLocale) return path;

  return `${dest}${path}`;
}

function localizeHref(href, sourcePrefix, destPrefix, knownPrefixes) {
  if (isExternalHref(href)) return href;
  const leading = href.match(/^\s*/)?.[0] || '';
  const trailing = href.match(/\s*$/)?.[0] || '';
  const { path, suffix } = splitHref(href.trim());
  return `${leading}${localizePath(path, sourcePrefix, destPrefix, knownPrefixes)}${suffix}${trailing}`;
}

function isPathOnlyText(text) {
  return /^\/[^\s]+$/.test(text.trim());
}

function serializeDaHtml(original, doc) {
  if (/<!doctype/i.test(original) || /<html[\s>]/i.test(original)) {
    const doctype = original.match(/^\s*<!doctype[^>]*>/i)?.[0] || '';
    return `${doctype}${doc.documentElement.outerHTML}`;
  }
  if (/<body[\s>]/i.test(original)) return doc.body.outerHTML;
  return doc.body.innerHTML;
}

function rewriteHtmlLinks(html, sourcePrefix, destPrefix, knownPrefixes) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('[href]').forEach((el) => {
    el.setAttribute('href', localizeHref(el.getAttribute('href'), sourcePrefix, destPrefix, knownPrefixes));
  });
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  texts.forEach((node) => {
    if (!isPathOnlyText(node.textContent)) return;
    if (node.parentElement?.closest('a[href]')) return;
    node.textContent = localizeHref(node.textContent, sourcePrefix, destPrefix, knownPrefixes);
  });
  return serializeDaHtml(html, doc);
}

function formatPrefixes(org, repo, currPrefix, locales, pagePath) {
  return splitLocales(locales).map((destPrefix) => ({
    active: true,
    path: destPrefix,
    source: sourceUrl(org, repo, pagePath),
    destination: sourceUrl(org, repo, destinationPath(currPrefix, destPrefix, pagePath)),
    edit: destEditHash(org, repo, destPrefix, currPrefix, pagePath),
    status: 'none',
    message: '',
  }));
}

function getPrefixDetails(json, org, repo, pagePath) {
  const languages = json?.languages?.data || [];
  const config = json?.config?.data || [];
  const knownPrefixes = collectLocalePrefixes(json);

  const pathLang = languages.find((lang) => pagePath.startsWith(`${lang.location}/`)
    || pagePath === lang.location);
  if (pathLang) {
    return {
      currPrefix: pathLang.location,
      prefixes: formatPrefixes(org, repo, pathLang.location, pathLang.locales, pagePath),
      knownPrefixes,
      isLocale: false,
    };
  }

  const allLocales = languages.flatMap((lang) => splitLocales(lang.locales));
  const pathLocale = allLocales.find((locale) => pagePath.startsWith(`${locale}/`)
    || pagePath === locale);
  if (pathLocale) {
    return { currPrefix: pathLocale, prefixes: [], knownPrefixes, isLocale: true };
  }

  const sourceLang = config.find((row) => row.key === 'source.language');
  const syncLang = languages.find((lang) => lang.name === sourceLang?.value);
  if (!syncLang) {
    return { currPrefix: null, prefixes: [], knownPrefixes, isLocale: false };
  }

  return {
    currPrefix: '/',
    prefixes: formatPrefixes(org, repo, '/', syncLang.location, pagePath),
    knownPrefixes,
    isLocale: false,
  };
}

function isEmptyHtml(html) {
  if (!html) return true;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const main = doc.querySelector('body > main');
  const inner = main ? main.innerHTML.trim() : doc.body?.innerHTML.trim();
  return !inner || inner === '<div></div>';
}

async function readSource(daFetch, url) {
  const resp = await daFetch(url);
  if (!resp.ok) return { ok: false, status: resp.status, text: '' };
  return { ok: true, status: resp.status, text: await resp.text() };
}

async function writeSource(daFetch, url, html) {
  const body = () => {
    const formData = new FormData();
    formData.append('data', new Blob([html], { type: 'text/html' }));
    return formData;
  };

  let resp = await daFetch(url, { method: 'PUT', body: body() });
  if (!resp.ok && resp.status !== 401 && resp.status !== 403) {
    resp = await daFetch(url, { method: 'POST', body: body() });
  }
  return resp;
}

async function saveVersion(daFetch, destUrl, label) {
  const versionUrl = destUrl.replace('/source/', '/versionsource/');
  try {
    await daFetch(versionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: `${label} - Rolled Out` }),
    });
  } catch {
    // Versioning is optional; the copy already succeeded.
  }
}

async function copyPrefix(daFetch, prefix, behavior, label, sourcePrefix, knownPrefixes) {
  const source = await readSource(daFetch, prefix.source);
  if (!source.ok || !source.text) {
    prefix.status = 'error';
    prefix.message = `Source ${source.status || 'missing'}`;
    return;
  }

  const dest = await readSource(daFetch, prefix.destination);
  const destMissing = !dest.ok || dest.status === 404 || isEmptyHtml(dest.text);
  const html = rewriteHtmlLinks(source.text, sourcePrefix, prefix.path, knownPrefixes);

  if (behavior === 'merge' && !destMissing && dest.text === html) {
    prefix.status = 'success';
    prefix.message = 'Already in sync';
    return;
  }

  const resp = await writeSource(daFetch, prefix.destination, html);
  if (!resp.ok) {
    prefix.status = 'error';
    prefix.message = `Save failed (${resp.status})`;
    return;
  }

  await saveVersion(daFetch, prefix.destination, label);
  prefix.status = 'success';
  prefix.message = destMissing ? 'Created' : 'Updated';
}

function showMessage(className, text) {
  const el = document.createElement('div');
  el.className = className;
  el.textContent = text;
  document.body.appendChild(el);
}

function renderLocaleNote(currPrefix) {
  const note = document.createElement('div');
  note.className = 'locale-note';
  note.textContent = `This page is in a locale (${currPrefix}). There are no downstream pages to roll out to.`;
  document.body.appendChild(note);
}

function iconButton(label, svg, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'icon-btn';
  btn.setAttribute('aria-label', label);
  btn.innerHTML = svg;
  btn.addEventListener('click', onClick);
  return btn;
}

function renderPrefixList(title, items, onChange) {
  const wrap = document.createElement('div');
  const label = document.createElement('label');
  label.textContent = title;
  wrap.appendChild(label);

  if (!items.length) return wrap;

  const list = document.createElement('ul');
  list.className = 'prefix-list';

  items.forEach((prefix) => {
    const li = document.createElement('li');
    li.className = `prefix-item status-${prefix.status || 'none'}`;

    const name = document.createElement('span');
    name.textContent = prefix.path.replace(/^\//, '');
    li.appendChild(name);

    const actions = document.createElement('div');
    actions.className = 'prefix-actions';

    const status = document.createElement('span');
    status.className = 'prefix-status';
    status.textContent = prefix.message || '';
    actions.appendChild(status);

    actions.appendChild(iconButton(
      'Open destination',
      '<svg viewBox="0 0 18 18" width="16" height="16"><path fill="currentColor" d="M16 9h-2v5H4V4h5V2H2v14h14z"/><path fill="currentColor" d="M11 2h5v5h-2V5.4L9.7 9.7 8.3 8.3 12.6 4H11z"/></svg>',
      () => window.open(`https://da.live/edit#${prefix.edit}`, `_${prefix.edit}`),
    ));

    actions.appendChild(iconButton(
      prefix.active ? 'Exclude locale' : 'Include locale',
      prefix.active
        ? '<svg viewBox="0 0 18 18" width="16" height="16"><path fill="currentColor" d="M14.5 4.1 13.9 3.5 9 8.4 4.1 3.5 3.5 4.1 8.4 9 3.5 13.9 4.1 14.5 9 9.6 13.9 14.5 14.5 13.9 9.6 9z"/></svg>'
        : '<svg viewBox="0 0 18 18" width="16" height="16"><path fill="currentColor" d="M14 8H10V4H8v4H4v2h4v4h2v-4h4z"/></svg>',
      () => {
        prefix.active = !prefix.active;
        onChange();
      },
    ));

    li.appendChild(actions);
    list.appendChild(li);
  });

  wrap.appendChild(list);
  return wrap;
}

function renderForm({ context, actions, details }) {
  const container = document.createElement('div');
  container.className = 'rollout-container';

  const header = document.createElement('div');
  header.className = 'rollout-header';
  const brand = document.createElement('div');
  brand.className = 'rollout-brand';
  const logo = document.createElement('img');
  logo.className = 'rollout-logo';
  logo.src = ROLLOUT_ICON;
  logo.alt = '';
  const title = document.createElement('h2');
  title.textContent = 'Rollout';
  brand.append(logo, title);
  const pathLine = document.createElement('p');
  pathLine.className = 'rollout-path';
  pathLine.textContent = context.path || '';
  header.append(brand, pathLine);
  container.appendChild(header);

  const fields = document.createElement('div');
  fields.className = 'two-col';

  const behaviorWrap = document.createElement('div');
  const behaviorLabel = document.createElement('label');
  behaviorLabel.textContent = 'Behavior';
  behaviorLabel.setAttribute('for', 'rollout-behavior');
  const behavior = document.createElement('select');
  behavior.id = 'rollout-behavior';
  behavior.innerHTML = '<option value="merge">Merge</option><option value="overwrite">Overwrite</option>';
  behaviorWrap.append(behaviorLabel, behavior);

  const labelWrap = document.createElement('div');
  const labelEl = document.createElement('label');
  labelEl.textContent = 'Label (optional)';
  labelEl.setAttribute('for', 'rollout-label');
  const labelInput = document.createElement('input');
  labelInput.id = 'rollout-label';
  labelInput.type = 'text';
  labelInput.placeholder = 'adhoc';
  labelWrap.append(labelEl, labelInput);

  fields.append(behaviorWrap, labelWrap);
  container.appendChild(fields);

  const lists = document.createElement('div');
  lists.className = 'two-col';

  const actionsRow = document.createElement('div');
  actionsRow.className = 'actions';
  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'btn btn-primary';
  submitBtn.textContent = 'Rollout';
  actionsRow.appendChild(submitBtn);

  let running = false;

  const redrawLists = () => {
    lists.replaceChildren(
      renderPrefixList('Include', details.prefixes.filter((item) => item.active), redrawLists),
      renderPrefixList('Exclude', details.prefixes.filter((item) => !item.active), redrawLists),
    );
    submitBtn.disabled = !details.prefixes.some((item) => item.active) || running;
  };

  submitBtn.addEventListener('click', async () => {
    const active = details.prefixes.filter((item) => item.active);
    if (!active.length || running) return;

    running = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Rolling out…';
    const copyLabel = labelInput.value.trim() || 'Adhoc';

    await active.reduce(async (prev, prefix) => {
      await prev;
      prefix.status = 'pending';
      prefix.message = 'Copying…';
      redrawLists();
      await copyPrefix(
        actions.daFetch,
        prefix,
        behavior.value,
        copyLabel,
        details.currPrefix,
        details.knownPrefixes,
      );
      redrawLists();
    }, Promise.resolve());

    running = false;
    submitBtn.textContent = 'Rollout';
    submitBtn.disabled = !details.prefixes.some((item) => item.active);
  });

  redrawLists();
  container.append(lists, actionsRow);
  document.body.appendChild(container);
}

async function init() {
  try {
    const { context, actions } = await DA_SDK;
    const { org, repo } = context;
    const pagePath = normalizePagePath(context.path);

    const confResp = await actions.daFetch(
      `${DA_ORIGIN}/source/${org}/${repo}${TRANSLATE_PATH}`,
    );
    if (!confResp.ok) {
      showMessage('error-message', 'Could not load /.da/translate.json for this site.');
      return;
    }

    const json = await confResp.json();
    const details = getPrefixDetails(json, org, repo, pagePath);

    if (details.isLocale) {
      renderLocaleNote(details.currPrefix);
      return;
    }

    if (!details.prefixes.length) {
      showMessage(
        'error-message',
        'No rollout locales found. Check the languages sheet in /.da/translate.',
      );
      return;
    }

    renderForm({ context, actions, details });
  } catch {
    showMessage(
      'error-message',
      'Initialization failed. Open this plugin from the DA library, not as a standalone page.',
    );
  }
}

init();
