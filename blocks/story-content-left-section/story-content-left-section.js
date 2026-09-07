const ARTICLE_CLASS = [
  'tw:space-y-12',
  'tw:@2xl:space-y-18',
  'tw:@4xl:space-y-24',
  "tw:[&_[data-component*='quotation']]:mx-0",
  "tw:[&_[data-component*='quotation']]:max-w-5xl",
  "tw:[&_[data-component*='cta']]:max-w-5xl",
].join(' ');

const PROSE_CLASS = 'tw:prose tw:space-y-6 tw:text-secondary tw:max-w-5xl';

const QUOTE_CLASS = [
  "tw:before:content-['\\201C']",
  "tw:after:content-['\\201D']",
  'tw:select-all',
  'tw:text-gradient',
  'tw:before:text-purple',
  'tw:dark:before:text-purple-100',
  'tw:text-lg',
].join(' ');

const EXTERNAL_ICON = `
<svg class="tw:e-external" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M5.54785 6.54385C5.52175 6.30889 5.7306 6.10004 5.99166 6.10004L16.9041 6.10004C17.1651 6.10004 17.3479 6.28279 17.3479 6.54385L17.3479 17.4563C17.3479 17.7173 17.139 17.9262 16.9041 17.9001L15.8859 17.9262C15.6249 17.9262 15.416 17.7173 15.4421 17.4824L15.416 9.36332L6.51378 18.2656C6.33104 18.4483 6.06998 18.4483 5.88723 18.2656L5.15626 17.5346C4.99962 17.3779 4.97351 17.0908 5.15626 16.908L14.0585 8.0058L5.96555 8.0058C5.7306 8.03191 5.52175 7.82306 5.52175 7.56199L5.54785 6.54385Z" fill="currentColor"></path>
</svg>
`;

const SHARE_ICONS = {
  copy: `
<svg class="e-link" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>Copy Link</title>
  <path d="M21.7425 12.4387C23.8613 10.32 23.8613 6.88874 21.7425 4.76999C19.8675 2.89499 16.9125 2.65124 14.7563 4.19249L14.6963 4.23374C14.1563 4.61999 14.0325 5.36999 14.4188 5.90624C14.805 6.44249 15.555 6.56999 16.0913 6.18374L16.1513 6.14249C17.355 5.28374 19.0013 5.41874 20.0438 6.46499C21.225 7.64624 21.225 9.55874 20.0438 10.74L15.8363 14.955C14.655 16.1362 12.7425 16.1362 11.5613 14.955C10.515 13.9087 10.38 12.2625 11.2388 11.0625L11.28 11.0025C11.6663 10.4625 11.5388 9.71249 11.0025 9.32999C10.4663 8.94749 9.71252 9.07124 9.33002 9.60749L9.28877 9.66749C7.74377 11.82 7.98752 14.775 9.86252 16.65C11.9813 18.7687 15.4125 18.7687 17.5313 16.65L21.7425 12.4387ZM2.25752 11.5612C0.13877 13.68 0.13877 17.1112 2.25752 19.23C4.13252 21.105 7.08752 21.3487 9.24377 19.8075L9.30377 19.7662C9.84377 19.38 9.96752 18.63 9.58127 18.0937C9.19502 17.5575 8.44502 17.43 7.90877 17.8162L7.84877 17.8575C6.64502 18.7162 4.99877 18.5812 3.95627 17.535C2.77502 16.35 2.77502 14.4375 3.95627 13.2562L8.16377 9.04499C9.34502 7.86374 11.2575 7.86374 12.4388 9.04499C13.485 10.0912 13.62 11.7375 12.7613 12.9412L12.72 13.0012C12.3338 13.5412 12.4613 14.2912 12.9975 14.6737C13.5338 15.0562 14.2875 14.9325 14.67 14.3962L14.7113 14.3362C16.2563 12.18 16.0125 9.22499 14.1375 7.34999C12.0188 5.23124 8.58752 5.23124 6.46877 7.34999L2.25752 11.5612Z" fill="currentColor"></path>
</svg>`,
  slack: `
<svg class="e-share-slack" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>Share on Slack</title>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86632 4C8.98186 4.00065 8.26606 4.71698 8.26671 5.59967C8.26606 6.48237 8.98251 7.1987 9.86697 7.19935H11.4672V5.60033C11.4679 4.71764 10.7514 4.0013 9.86632 4ZM9.86632 8.26667H5.60026C4.7158 8.26732 3.99935 8.98365 4 9.86634C3.99869 10.749 4.71515 11.4654 5.59961 11.4667H9.86632C10.7508 11.466 11.4672 10.7497 11.4666 9.86699C11.4672 8.98365 10.7508 8.26732 9.86632 8.26667Z" fill="currentColor"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M20 9.86634C20.0007 8.98365 19.2842 8.26732 18.3997 8.26667C17.5153 8.26732 16.7988 8.98365 16.7995 9.86634V11.4667H18.3997C19.2842 11.466 20.0007 10.7497 20 9.86634ZM15.7333 9.86634V5.59967C15.7339 4.71764 15.0181 4.0013 14.1337 4C13.2492 4.00065 12.5328 4.71698 12.5334 5.59967V9.86634C12.5321 10.749 13.2486 11.4654 14.133 11.4667C15.0175 11.466 15.7339 10.7497 15.7333 9.86634Z" fill="currentColor"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.133 20C15.0175 19.9993 15.7339 19.283 15.7333 18.4003C15.7339 17.5176 15.0175 16.8013 14.133 16.8007H12.5328V18.4003C12.5321 19.2824 13.2486 19.9987 14.133 20ZM14.133 15.7327H18.3997C19.2842 15.732 20.0007 15.0157 20 14.133C20.0013 13.2503 19.2848 12.534 18.4004 12.5327H14.1337C13.2492 12.5333 12.5328 13.2497 12.5334 14.1324C12.5328 15.0157 13.2486 15.732 14.133 15.7327Z" fill="currentColor"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4 14.133C3.99935 15.0157 4.7158 15.732 5.60026 15.7327C6.48472 15.732 7.20118 15.0157 7.20052 14.133V12.5333H5.60026C4.7158 12.534 3.99935 13.2503 4 14.133ZM8.26671 14.133V18.3997C8.2654 19.2824 8.98186 19.9987 9.86632 20C10.7508 19.9993 11.4672 19.283 11.4666 18.4003V14.1343C11.4679 13.2516 10.7514 12.5353 9.86697 12.534C8.98186 12.534 8.26606 13.2503 8.26671 14.133Z" fill="currentColor"></path>
</svg>`,
  teams: `
<svg class="e-share-teams" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>Share on Teams</title>
  <path d="M17.6094 9.21374C18.6363 9.21374 19.4688 8.36861 19.4688 7.32609C19.4688 6.28357 18.6363 5.43844 17.6094 5.43844C16.5825 5.43844 15.75 6.28357 15.75 7.32609C15.75 8.36861 16.5825 9.21374 17.6094 9.21374Z" fill="currentColor"></path>
  <path d="M19.2031 9.75307H15.027C14.9368 9.75307 14.8503 9.78943 14.7866 9.85416C14.7228 9.9189 14.687 10.0067 14.687 10.0982V14.4722C14.6755 15.1052 14.8786 15.7231 15.2622 16.2222C15.6459 16.7214 16.1868 17.0716 16.7944 17.2141C17.1815 17.2966 17.5817 17.2904 17.966 17.1959C18.3504 17.1015 18.7092 16.9213 19.0162 16.6683C19.3233 16.4154 19.5709 16.0961 19.7411 15.7337C19.9113 15.3714 19.9997 14.975 20 14.5736V10.5621C20 10.3475 19.916 10.1417 19.7666 9.99001C19.6172 9.8383 19.4145 9.75307 19.2031 9.75307Z" fill="currentColor"></path>
  <path d="M15.4844 9.75307C15.5891 9.75292 15.6928 9.77369 15.7895 9.81429C15.8862 9.8549 15.9742 9.91456 16.0482 9.98971C16.1222 10.0649 16.1809 10.1541 16.2209 10.2523C16.2609 10.3505 16.2813 10.4558 16.2812 10.5621V15.6857C16.2817 16.6352 15.9736 17.5583 15.4045 18.3118C14.8354 19.0653 14.0372 19.607 13.1338 19.8529C12.2304 20.0988 11.2723 20.0351 10.4082 19.6717C9.54416 19.3082 8.82237 18.6654 8.35496 17.843C8.25274 17.6705 8.16394 17.4902 8.08936 17.3037C8.01983 17.1278 7.96131 16.9477 7.91409 16.7643H10.7935C10.9806 16.7635 11.5346 16.8027 11.6669 16.6683C11.7992 16.534 11.9992 16.19 12 16L12.0312 9.75307H15.4844Z" fill="currentColor"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7918 7.59575C10.9796 7.59575 11.1598 7.67145 11.2926 7.80626C11.4254 7.94107 11.5 8.12397 11.5 8.31463L11.5 15.5C11.5 15.6907 11.4254 15.8797 11.2926 16.0145C11.1598 16.1493 10.9796 16.225 10.7918 16.225H3.70816C3.5204 16.225 3.3403 16.1493 3.20752 16.0145C3.07473 15.8797 3.00018 15.6968 3.00017 15.5061L3 8.31463C3.00001 8.12397 3.07473 7.94107 3.20752 7.80626C3.3403 7.67148 3.5204 7.59577 3.70816 7.59575H10.7918ZM5.13564 9.21649V10.279H6.73365V14.6043H7.77597V10.279H9.36436V9.21649H5.13564Z" fill="currentColor"></path>
  <path d="M12.0314 4C13.4006 4.00005 14.5106 5.127 14.5106 6.5171C14.5106 7.90722 13.4005 9.03402 12.0312 9.03402V8.31463C12.0306 8.12415 11.9558 7.94163 11.8232 7.80694C11.6905 7.67229 11.5108 7.59634 11.3232 7.59575H9.79105C9.84054 7.7017 9.89704 7.80362 9.96007 7.90084C9.70217 7.50379 9.55195 7.02828 9.55195 6.5171C9.55195 5.12697 10.6621 4 12.0314 4Z" fill="currentColor"></path>
</svg>`,
  whatsapp: `
<svg class="e-share-whatsapp" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>Share on Whatsapp</title>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6678 6.32515C16.1639 4.82656 14.1637 4.00084 12.0328 4C7.64206 4 4.06855 7.55643 4.06679 11.9279C4.06621 13.3252 4.43304 14.6892 5.1301 15.8915L4 20L8.22289 18.8975C9.38638 19.5291 10.6964 19.862 12.0296 19.8625H12.0329C16.4232 19.8625 19.997 16.3056 19.9988 11.9342C19.9996 9.81573 19.1718 7.82374 17.6678 6.32515ZM12.0329 18.5235H12.0302C10.8421 18.523 9.67685 18.2054 8.66031 17.6049L8.41852 17.4621L5.91263 18.1164L6.58151 15.6847L6.42407 15.4354C5.7613 14.3861 5.41124 13.1735 5.41176 11.9284C5.41321 8.295 8.3834 5.33905 12.0355 5.33905C13.8039 5.33972 15.4663 6.02607 16.7164 7.27164C17.9665 8.51722 18.6545 10.1729 18.6538 11.9337C18.6523 15.5673 15.6822 18.5235 12.0329 18.5235ZM15.6646 13.5881C15.4656 13.489 14.487 13.0097 14.3045 12.9436C14.1221 12.8775 13.9894 12.8444 13.8567 13.0428C13.724 13.2411 13.3426 13.6873 13.2264 13.8195C13.1104 13.9517 12.9943 13.9683 12.7952 13.8691C12.5962 13.7699 11.9548 13.5607 11.1946 12.8858C10.6029 12.3606 10.2034 11.7118 10.0873 11.5135C9.97118 11.3151 10.0749 11.2079 10.1746 11.1092C10.2641 11.0204 10.3736 10.8778 10.4731 10.7621C10.5726 10.6464 10.6058 10.5638 10.6721 10.4316C10.7385 10.2994 10.7053 10.1837 10.6556 10.0845C10.6058 9.98536 10.2078 9.01027 10.0419 8.61363C9.88033 8.22734 9.71622 8.2796 9.59404 8.27355C9.47807 8.26781 9.34525 8.26658 9.21257 8.26658C9.07988 8.26658 8.86425 8.31617 8.68179 8.51448C8.49935 8.71281 7.98518 9.19208 7.98518 10.1671C7.98518 11.1422 8.69838 12.0842 8.79791 12.2164C8.89742 12.3487 10.2014 14.3496 12.1981 15.2077C12.673 15.4118 13.0437 15.5337 13.3328 15.6251C13.8096 15.7758 14.2435 15.7545 14.5865 15.7035C14.9689 15.6467 15.7641 15.2243 15.93 14.7615C16.0959 14.2988 16.0959 13.9021 16.0461 13.8195C15.9963 13.7369 15.8637 13.6873 15.6646 13.5881Z" fill="currentColor"></path>
</svg>`,
};

const TYPE_ALIASES = {
  copy: 'body',
  content: 'body',
  text: 'body',
  quotation: 'quote',
  'headshot-quote': 'quote-headshot',
  figure: 'image',
  photo: 'image',
  'call-to-action': 'cta',
  'video-title': 'video',
};

const HEADER_TYPES = new Set(['video', 'metrics']);
const IGNORED_TYPES = new Set(['title', 'logo', 'heading', 'sr-title']);
const KNOWN_TYPES = new Set([
  'video', 'metric', 'body', 'quote', 'quote-headshot', 'cta', 'image', 'card',
]);

function toKey(name) {
  return name
    .toLowerCase()
    .replace(/[^0-9a-z]+/gi, '-')
    .replace(/^-|-$/g, '');
}

function cellText(cell) {
  return cell?.textContent.replace(/\s+/g, ' ').trim() || '';
}

function cellHref(cell) {
  return cell?.querySelector('a[href]')?.getAttribute('href') || '';
}

function cellImage(cell) {
  return cell?.querySelector('img, picture') || null;
}

function appendChildren(target, cell) {
  if (!cell) return;
  while (cell.firstChild) target.append(cell.firstChild);
}

function createEl(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value;
    else node.setAttribute(key, value);
  });
  return node;
}

function youtubeEmbed(url) {
  try {
    const parsed = new URL(url, window.location.href);
    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace(/^\//, '')}`;
    }
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) return parsed.href;
      const id = parsed.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    /* keep original */
  }
  return url;
}

function readRows(block) {
  return [...block.children].map((row) => {
    const cells = [...row.children];
    if (!cells.length) return null;
    let type = toKey(cells[0].textContent);
    let values = cells.slice(1);
    if (!KNOWN_TYPES.has(TYPE_ALIASES[type] || type)) {
      const looksLikeBody = cells[0].querySelector('h2, h3, p, ul, ol, dl');
      if (looksLikeBody && values.length === 0) {
        type = 'body';
        values = [cells[0]];
      }
    }
    const resolved = TYPE_ALIASES[type] || type;
    if (IGNORED_TYPES.has(type) || IGNORED_TYPES.has(resolved)) return null;
    return { type: resolved, values };
  }).filter((row) => row?.type);
}

function groupRows(rows) {
  const items = [];
  let metrics = [];
  let cards = [];

  const flush = () => {
    if (metrics.length) {
      items.push({ type: 'metrics', metrics });
      metrics = [];
    }
    if (cards.length) {
      items.push({ type: 'cards', cards });
      cards = [];
    }
  };

  rows.forEach((row) => {
    if (row.type === 'metric') {
      if (cards.length) {
        items.push({ type: 'cards', cards });
        cards = [];
      }
      metrics.push(row);
      return;
    }
    if (row.type === 'card') {
      if (metrics.length) {
        items.push({ type: 'metrics', metrics });
        metrics = [];
      }
      cards.push(row);
      return;
    }
    flush();
    items.push(row);
  });
  flush();
  return items;
}

function createStaticTitle() {
  return createEl('h2', 'tw:sr-only', { text: 'Nanyang Biologics customer story' });
}

function createStaticLogo() {
  const img = createEl('img', [
    'tw:h-auto',
    'tw:w-full',
    'tw:max-w-40',
    'tw:dark:grayscale-100',
    'tw:dark:saturate-0',
    'tw:dark:brightness-0',
    'tw:dark:invert-100',
    'tw:lg:hidden',
    'tw:print:hidden',
  ].join(' '), {
    src: 'https://qa.equinix.com/content/dam/eqxcorp/en_us/images/customer-stories/Nanyang.svg',
    alt: 'Nanyang Biologics logo',
  });
  img.dataset.graphic = 'logo-nanyang-biologics';
  return img;
}

function createVideo(values) {
  const src = cellHref(values[0]) || cellText(values[0]);
  if (!src) return null;
  const title = cellText(values[1]) || 'Video';
  const wrap = createEl('div', 'tw:bg-offset tw:relative tw:@container tw:w-full tw:rounded-xl tw:overflow-hidden');
  wrap.dataset.component = 'video';
  const iframe = createEl('iframe', 'tw:aspect-video tw:w-full tw:h-auto', {
    width: '2240',
    height: '1260',
    src: youtubeEmbed(src),
    title,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    referrerpolicy: 'strict-origin-when-cross-origin',
  });
  iframe.setAttribute('allowfullscreen', '');
  wrap.append(iframe);
  return wrap;
}

function createMetric(row, index) {
  const [valueCell, qualifierCell, metaCell] = row.values;
  const value = cellText(valueCell);
  if (!value) return null;
  const isFirst = index === 0;
  const wrap = createEl('div', [
    'tw:border-b',
    'tw:border-offset',
    'tw:last-of-type:border-none',
    'tw:pb-7',
    'tw:@3xl:pb-0',
    'tw:@3xl:border-0',
    isFirst ? 'tw:@3xl:pe-2' : 'tw:@3xl:px-7 tw:@6xl:px-16',
  ].join(' '));
  const align = isFirst ? 'tw:items-start tw:text-start' : 'tw:items-center tw:text-center';
  const group = createEl('div', `tw:flex tw:flex-col tw:gap-2 ${align}`);
  group.setAttribute('role', 'group');
  group.dataset.component = 'metric/default';
  const stack = createEl('div', `tw:flex tw:flex-col tw:gap-1 ${align}`);
  stack.append(createEl('h3', [
    'tw:heading',
    'tw:leading-none',
    'tw:tracking-tight',
    'tw:max-w-max',
    'tw:pe-0.5',
    'tw:translate-x-0.25',
    'tw:text-gradient',
    'tw:text-2xl',
  ].join(' '), { text: value, 'data-role': 'metric' }));
  const qualifier = cellText(qualifierCell);
  if (qualifier) {
    stack.append(createEl('span', [
      'tw:leading-tight',
      'tw:font-bold',
      'tw:max-w-max',
      'tw:text-gradient',
      'tw:text-sm',
    ].join(' '), { text: qualifier, 'data-role': 'qualifier' }));
  }
  group.append(stack);
  const meta = cellText(metaCell);
  if (meta) {
    group.append(createEl('span', 'tw:text-secondary tw:max-w-max tw:text-xs', {
      text: meta,
      'data-role': 'meta',
    }));
  }
  wrap.append(group);
  return wrap;
}

function createMetrics(metrics) {
  const deck = createEl('div', 'tw:@container');
  deck.dataset.component = 'deck/metrics';
  const grid = createEl('div', [
    'tw:grid',
    'tw:grid-cols-1',
    'tw:gap-grid',
    'tw:space-y-4',
    'tw:@3xl:grid-cols-3',
    'tw:@3xl:space-y-0',
  ].join(' '));
  metrics.map(createMetric).filter(Boolean).forEach((metric) => grid.append(metric));
  if (!grid.childElementCount) return null;
  deck.append(grid);
  return deck;
}

function createBody(cell) {
  if (!cell || !cellText(cell)) return null;
  const section = createEl('section', PROSE_CLASS);
  appendChildren(section, cell);
  return section;
}

function createQuote({
  quote, name, role, image, headshot,
}) {
  if (!quote) return null;
  const uid = `quotation-${crypto.randomUUID().slice(0, 8)}`;
  if (headshot) {
    const shell = createEl('div', 'tw:@container');
    const figure = createEl('figure', [
      'tw:flex',
      'tw:flex-col',
      'tw:gap-4',
      'tw:items-center',
      'tw:justify-center',
      'tw:text-center',
      'tw:max-w-6xl',
      'tw:mx-auto',
      'tw:@3xl:gap-10',
      'tw:@3xl:flex-row',
      'tw:@3xl:items-start',
      'tw:@3xl:text-start',
    ].join(' '), { id: `headshot-${uid}` });
    figure.dataset.component = 'quotation/headshot';
    if (image) {
      const frame = createEl('div', 'tw:relative');
      const img = image.tagName === 'IMG' ? image.cloneNode(true) : image.querySelector('img')?.cloneNode(true);
      if (img) {
        img.className = [
          'tw:rounded-lg',
          'tw:border',
          'tw:border-black/20',
          'tw:dark:border-white/20',
          'tw:max-w-24',
          'tw:@3xl:max-w-44',
          'tw:relative',
          'tw:z-10',
          'tw:ratio-1/1',
        ].join(' ');
        img.decoding = 'async';
        frame.append(img);
        figure.append(frame);
      }
    }
    const blockquote = createEl('blockquote', 'tw:flex tw:flex-col tw:relative tw:gap-6');
    blockquote.append(createEl('p', `${QUOTE_CLASS} tw:@3xl:before:absolute tw:@3xl:before:-start-3`, {
      text: quote,
      'data-role': 'quote',
    }));
    const caption = createEl('figcaption', [
      'tw:flex',
      'tw:flex-col',
      'tw:gap-1',
      'tw:items-center',
      'tw:text-center',
      'tw:@3xl:items-start',
      'tw:@3xl:text-start',
    ].join(' '));
    if (name) {
      caption.append(createEl('span', 'tw:label tw:text-primary tw:text-base tw:max-w-max', {
        text: name,
        'data-role': 'attribute',
      }));
    }
    if (role) {
      caption.append(createEl('cite', 'tw:text-primary tw:max-w-max tw:text-xs', {
        text: role,
        'data-role': 'meta',
      }));
    }
    blockquote.append(caption);
    figure.append(blockquote);
    shell.append(figure);
    return shell;
  }

  const figure = createEl('figure', [
    'tw:flex',
    'tw:flex-col',
    'tw:gap-6',
    'tw:items-start',
    'tw:text-start',
    'tw:max-w-7xl',
  ].join(' '), { id: `standard-${uid}` });
  figure.dataset.component = 'quotation';
  const blockquote = createEl('blockquote', [
    'tw:flex',
    'tw:flex-col',
    'tw:relative',
    'tw:items-start',
    'tw:text-start',
    'tw:max-w-7xl',
    'tw:gap-5',
    'tw:rtl:gap-6',
  ].join(' '));
  blockquote.append(createEl('p', QUOTE_CLASS, { text: quote, 'data-role': 'quote' }));
  const caption = createEl('figcaption', [
    'tw:flex',
    'tw:flex-col',
    'tw:gap-1',
    'tw:items-start',
    'tw:text-start',
    'tw:max-w-7xl',
  ].join(' '));
  if (name) {
    caption.append(createEl('span', 'tw:label tw:text-primary tw:text-base tw:max-w-max', {
      text: name,
      'data-role': 'attribute',
    }));
  }
  if (role) {
    caption.append(createEl('cite', 'tw:text-primary tw:max-w-max tw:text-xs', {
      text: role,
      'data-role': 'meta',
    }));
  }
  blockquote.append(caption);
  figure.append(blockquote);
  return figure;
}

function quoteFromRow(row, headshot) {
  const image = row.values.map(cellImage).find(Boolean);
  return createQuote({
    quote: cellText(row.values[0]),
    name: cellText(row.values[1]),
    role: cellText(row.values[2]),
    image,
    headshot: headshot || Boolean(image),
  });
}

function createCta(values, uid) {
  const title = cellText(values[0]);
  if (!title) return null;
  const headingId = `cta-minor-heading-${uid}`;
  const wrap = createEl('div', [
    'tw:@container',
    'tw:relative',
    'tw:overflow-hidden',
    'tw:rounded-lg',
    'tw:text-black',
    'tw:dark:text-white',
    'tw:from-aqua-100',
    'tw:via-purple-100',
    'tw:to-orange-100',
    'tw:dark:from-blue-900',
    'tw:dark:via-purple',
    'tw:dark:to-red',
    'tw:bg-linear-120',
    'rtl:tw:bg-linear-240',
  ].join(' '), { id: `cta-minor-${uid}` });
  wrap.dataset.component = 'cta/minor';
  wrap.dataset.theme = 'dark';
  wrap.setAttribute('aria-labelledby', headingId);
  const inner = createEl('div', [
    'tw:flex',
    'tw:flex-col',
    'tw:items-center',
    'tw:text-center',
    'tw:justify-between',
    'tw:gap-7',
    'tw:py-6',
    'tw:px-4',
    'tw:@2xl:py-9',
    'tw:@2xl:px-6',
    'tw:@2xl:flex-row',
    'tw:@2xl:text-start',
    'tw:@2xl:gap-14',
    'tw:@7xl:px-12',
  ].join(' '));
  const copy = createEl('div', 'tw:flex tw:flex-col tw:gap-3 tw:@2xl:max-w-md tw:@4xl:max-w-3xl');
  copy.append(createEl('h2', 'tw:heading tw:text-lg', {
    id: headingId,
    text: title,
    'data-role': 'title',
  }));
  const description = cellText(values[1]);
  if (description) {
    copy.append(createEl('p', 'tw:text-sm', { text: description, 'data-role': 'description' }));
  }
  inner.append(copy);
  const label = cellText(values[2]);
  const href = cellHref(values[2]) || cellHref(values[3]) || cellText(values[3]);
  if (label && href) {
    const actions = createEl('div', 'tw:shrink-0 tw:max-w-max');
    const link = createEl('a', 'tw:button tw:cursor-pointer tw:button--secondary', { href });
    link.dataset.component = 'button';
    link.append(createEl('span', 'tw:button__label', { text: label }));
    actions.append(link);
    inner.append(actions);
  }
  wrap.append(inner);
  return wrap;
}

function createFigure(cell) {
  const image = cellImage(cell);
  if (!image) return null;
  const figure = createEl('figure', 'tw:space-y-2');
  const img = image.tagName === 'IMG' ? image.cloneNode(true) : image.querySelector('img')?.cloneNode(true);
  if (!img) return null;
  img.className = 'tw:bg-offset tw:rounded-xl tw:border tw:border-blend tw:w-full tw:h-auto';
  img.decoding = 'async';
  img.dataset.graphic = 'photo';
  figure.append(img);
  return figure;
}

function createCard(row) {
  const title = cellText(row.values[0]);
  if (!title) return null;
  const href = cellHref(row.values[2]) || cellHref(row.values[0]) || '#';
  const link = createEl('a', [
    'tw:@container',
    'tw:group',
    'tw:bg-white/95',
    'tw:dark:bg-black/80',
    'tw:backdrop-blur-sm',
    'tw:border',
    'tw:border-blend',
    'tw:rounded-md',
    'tw:transition-colors',
    'tw:duration-500',
    'tw:ease-linear',
    'tw:focus:outline-violet',
    'tw:hover:border-violet',
    'tw:dark:hover:border-violet-100',
    'tw:dark:focus:outline-violet-100',
  ].join(' '), {
    href,
    dir: 'ltr',
    role: 'link',
    'aria-label': title,
    rel: 'external noreferrer noopener',
    target: '_blank',
  });
  link.dataset.component = 'card/basic';
  const inner = createEl('div', [
    'tw:h-full',
    'tw:flex',
    'tw:flex-col',
    'tw:justify-between',
    'tw:p-6',
    'tw:gap-3',
    'tw:items-start',
    'tw:@xs:flex-row',
    'tw:@xs:items-center',
    'tw:@xs:gap-8',
  ].join(' '));
  const copy = createEl('div', 'tw:space-y-1');
  copy.append(createEl('h4', 'tw:heading tw:text-md tw:text-primary', { text: title, 'data-role': 'title' }));
  const description = cellText(row.values[1]);
  if (description) {
    copy.append(createEl('p', 'tw:text-sm tw:text-secondary', {
      text: description,
      'data-role': 'description',
    }));
  }
  const icon = createEl('span', [
    'tw:size-6',
    'tw:flex',
    'tw:flex-col',
    'tw:items-center',
    'tw:grow-0',
    'tw:shrink-0',
    'tw:text-link',
    'tw:text-link--strong',
  ].join(' '), { 'aria-hidden': 'true', html: EXTERNAL_ICON });
  icon.dataset.role = 'icon';
  inner.append(copy, icon);
  link.append(inner);
  return link;
}

function createCards(cards) {
  const deck = createEl('div', 'tw:@container');
  deck.dataset.component = 'deck/basic';
  const grid = createEl('div', 'tw:grid tw:grid-cols-1 tw:gap-4 tw:@md:grid-cols-2');
  cards.map(createCard).filter(Boolean).forEach((card) => grid.append(card));
  if (!grid.childElementCount) return null;
  deck.append(grid);
  return deck;
}

function shareButtonClass() {
  return [
    'tw:size-11',
    'tw:text-secondary',
    'tw:flex',
    'tw:flex-col',
    'tw:items-center',
    'tw:justify-center',
    'tw:rounded-full',
    'tw:transition-colors',
    'tw:duration-300',
    'tw:ease-in-out',
    'tw:hover:text-violet',
    'tw:dark:hover:text-violet',
    'tw:focus:outline-0',
    'tw:focus-visible:outline-2',
    'tw:focus-visible:outline-violet',
    'tw:dark:focus-visible:outline-violet-100',
  ].join(' ');
}

function createShareLink({
  href, label, icon, analytics, copy,
}) {
  const link = createEl('a', shareButtonClass(), {
    href,
    title: label,
    'aria-label': label,
  });
  if (!copy) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  link.dataset.analyticsSocialSharing = analytics;
  const iconWrap = createEl('span', 'tw:w-7 tw:block', { html: icon });
  link.append(iconWrap, createEl('span', 'tw:sr-only', { text: label }));
  if (copy) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      navigator.clipboard?.writeText(window.location.href);
    });
  }
  return link;
}

function createSocialShare() {
  const pageUrl = encodeURIComponent(window.location.href);
  const bar = createEl('div', 'tw:flex tw:flex-row tw:items-center');
  bar.dataset.component = 'social-share';
  bar.append(createEl('span', 'tw:text-primary tw:heading tw:text-sm tw:pe-3', { text: 'Share this story:' }));
  bar.append(createShareLink({
    href: '#',
    label: 'Copy Link',
    icon: SHARE_ICONS.copy,
    analytics: 'copy link',
    copy: true,
  }));
  bar.append(createShareLink({
    href: `https://slack.com/share?url=${pageUrl}`,
    label: 'Share on Slack',
    icon: SHARE_ICONS.slack,
    analytics: 'slack',
  }));
  bar.append(createShareLink({
    href: `https://teams.microsoft.com/share?href=${pageUrl}`,
    label: 'Share on Teams',
    icon: SHARE_ICONS.teams,
    analytics: 'teams',
  }));
  bar.append(createShareLink({
    href: `https://api.whatsapp.com/send?text=${pageUrl}`,
    label: 'Share on Whatsapp',
    icon: SHARE_ICONS.whatsapp,
    analytics: 'whatsapp',
  }));
  return bar;
}

function renderItem(item, uid) {
  switch (item.type) {
    case 'video':
      return createVideo(item.values);
    case 'metrics':
      return createMetrics(item.metrics);
    case 'body':
      return createBody(item.values[0]);
    case 'quote-headshot':
      return quoteFromRow(item, true);
    case 'quote':
      return quoteFromRow(item, false);
    case 'cta':
      return createCta(item.values, uid);
    case 'image':
      return createFigure(item.values[0]);
    case 'cards':
      return createCards(item.cards);
    default:
      return null;
  }
}

function liftBlock(block, container) {
  const wrapper = block.parentElement;
  const section = wrapper?.parentElement;
  block.replaceChildren(container);
  if (!section || !wrapper) return;
  while (block.firstChild) section.insertBefore(block.firstChild, wrapper);
  wrapper.remove();
}

/**
 * Decorates the story content left section from an authored table.
 * Rows are type / value (additional cells depend on type).
 * @param {Element} block
 */
export default function decorate(block) {
  const uid = crypto.randomUUID().slice(0, 8);
  const items = groupRows(readRows(block));
  const article = createEl('article', ARTICLE_CLASS);
  const header = createEl('header', 'tw:space-y-10 tw:xl:space-y-12 tw:print:space-y-12');
  header.append(createStaticTitle(), createStaticLogo());
  const footer = createEl('footer', 'tw:space-y-8');

  let inHeader = true;
  items.forEach((item) => {
    const node = renderItem(item, uid);
    if (!node) return;
    if (inHeader && HEADER_TYPES.has(item.type)) {
      header.append(node);
      return;
    }
    inHeader = false;
    if (item.type === 'cards') footer.append(node);
    else article.append(node);
  });

  article.prepend(header);
  footer.append(createSocialShare());
  article.append(footer);

  const container = createEl(
    'div',
    'tw:@container tw:lg:ps-16 tw:lg:col-span-8 tw:2xl:col-span-9 tw:2xl:ps-24',
  );
  container.append(article);
  liftBlock(block, container);
}
