const PLAY_ICON = `
<svg class="e-playing tw:hidden" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M7.42127 1.83077C6.72764 1.40428 5.85592 1.39022 5.14823 1.78859C4.44055 2.18696 4 2.93682 4 3.7523V20.2494C4 21.0649 4.44055 21.8147 5.14823 22.2131C5.85592 22.6115 6.72764 22.5927 7.42127 22.1709L20.9189 13.9224C21.5891 13.5146 21.9968 12.7882 21.9968 12.0008C21.9968 11.2135 21.5891 10.4917 20.9189 10.0793L7.42127 1.83077Z" fill="currentColor"></path>
</svg>
`;

const PAUSE_ICON = `
<svg class="e-paused" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M6 20V5C6 3.89543 6.89543 3 8 3C9.10457 3 10 3.89543 10 5V20C10 21.1046 9.10457 22 8 22C6.89543 22 6 21.1046 6 20ZM14 20V5C14 3.89543 14.8954 3 16 3C17.1046 3 18 3.89543 18 5V20C18 21.1046 17.1046 22 16 22C14.8954 22 14 21.1046 14 20Z" fill="currentColor"></path>
</svg>
`;

const SECTION_CLASSES = [
  'tw:@container',
  'tw:relative',
  'tw:overflow-hidden',
  'tw:flex',
  'tw:flex-col',
  'tw:justify-center',
  'tw:text-black',
  'tw:items-start',
  'tw:text-start',
  'tw:dark:text-white',
  'tw:bg-black',
  'tw:min-h-[65vh]',
];

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

function cellSrc(cell) {
  const media = cell?.querySelector('source[src], video[src], img[src]');
  if (media) return media.getAttribute('src') || '';
  return cellHref(cell) || cellText(cell);
}

function mimeFromSrc(src) {
  if (/\.webm(\?|$)/i.test(src)) return 'video/webm';
  if (/\.ogg(\?|$)/i.test(src)) return 'video/ogg';
  return 'video/mp4';
}

/**
 * Reads the banner authoring table (2-column key / value rows).
 * @param {Element} block
 */
function readAuthoring(block) {
  const fields = {};
  [...block.children].forEach((row) => {
    const [nameCell, valueCell] = row.children;
    if (!valueCell) return;
    fields[toKey(nameCell.textContent)] = valueCell;
  });

  const buttonCell = fields['button-label'] || fields.button || fields.cta;
  const hrefCell = fields['button-href'] || fields['cta-href'] || fields['button-link'];
  const videoCell = fields['video-source'] || fields.video || fields['video-src'];
  const imageCell = fields.image || fields.poster || fields['image-src'];

  return {
    overline: cellText(fields.overline || fields.eyebrow) || 'Customer story',
    title: cellText(fields.title),
    description: cellText(fields.description || fields.desc),
    buttonLabel: cellText(buttonCell),
    buttonHref: cellHref(hrefCell) || cellText(hrefCell) || cellHref(buttonCell),
    videoSrc: cellSrc(videoCell),
    imageSrc: cellSrc(imageCell),
  };
}

function createVideo(uid, src) {
  const video = document.createElement('video');
  video.id = `${uid}-video`;
  video.className = 'tw:w-full tw:h-full tw:z-0 tw:absolute tw:start-0 tw:object-cover tw:mx-auto tw:motion-reduce:hidden';
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('aria-describedby', `video-described-by-${uid}`);

  const source = document.createElement('source');
  source.src = src;
  source.type = mimeFromSrc(src);
  video.append(source);
  return video;
}

function createPoster(src) {
  const img = document.createElement('img');
  img.className = 'tw:hidden tw:motion-reduce:block tw:top-1/2 tw:-translate-y-1/2 tw:absolute tw:start-0 tw:z-0 tw:w-full tw:h-full tw:object-cover';
  img.decoding = 'async';
  img.dataset.graphic = 'image';
  img.src = src;
  img.alt = '';
  return img;
}

function createPlayPause(uid) {
  const button = document.createElement('button');
  button.id = `play-pause-${uid}`;
  button.setAttribute('aria-controls', `${uid}-video`);
  button.setAttribute('aria-pressed', 'true');
  button.className = [
    'tw:cursor-pointer',
    'tw:motion-reduce:hidden',
    'tw:w-8',
    'tw:h-8',
    'tw:flex',
    'tw:flex-col',
    'tw:items-center',
    'tw:justify-center',
    'tw:absolute',
    'tw:end-3',
    'tw:bottom-3',
    'tw:z-10',
    'tw:bg-white/50',
    'tw:shadow-md',
    'tw:rounded-full',
    'tw:transition-all',
    'tw:ease-in-out',
    'tw:duration-300',
    'tw:hover:bg-white',
    'tw:focus:bg-white',
    'tw:no-js:hidden',
  ].join(' ');

  const icon = document.createElement('span');
  icon.className = 'tw:w-3.5 tw:h-3.5 tw:grow-0 tw:shrink-0 tw:text-black';
  icon.innerHTML = `${PLAY_ICON}${PAUSE_ICON}`;
  button.append(icon);
  return button;
}

function bindPlayPause(video, button, statusEl) {
  const playingIcon = button.querySelector('.e-playing');
  const pausedIcon = button.querySelector('.e-paused');

  const sync = () => {
    const playing = !video.paused;
    button.setAttribute('aria-pressed', String(playing));
    playingIcon?.classList.toggle('tw:hidden', playing);
    pausedIcon?.classList.toggle('tw:hidden', !playing);
    if (statusEl) statusEl.textContent = playing ? 'Video playing' : 'Video paused';
  };

  button.addEventListener('click', () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  video.play().catch(() => sync());
  sync();
}

function createCopy({
  uid, overline, title, description, buttonLabel, buttonHref,
}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'tw:wrapper tw:px-4 tw:py-20 tw:@6xl:py-30 tw:@8xl:py-36';

  const inner = document.createElement('div');
  inner.className = 'tw:flex tw:flex-col tw:items-start tw:text-start tw:gap-7 tw:relative tw:z-10 tw:max-w-2xl tw:@7xl:max-w-3xl tw:@9xl:max-w-4xl';

  const copy = document.createElement('div');
  copy.className = 'tw:flex tw:flex-col tw:gap-3';

  if (overline) {
    const eyebrow = document.createElement('span');
    eyebrow.dataset.role = 'overline';
    eyebrow.className = 'tw:heading tw:text-xs tw:uppercase tw:leading-none tw:translate-x-1 tw:m-0';
    eyebrow.textContent = overline;
    copy.append(eyebrow);
  }

  const heading = document.createElement('h1');
  heading.dataset.role = 'title';
  heading.id = `${uid}-banner-heading`;
  heading.className = 'tw:heading tw:text-3xl tw:max-w-4xl tw:m-0';
  heading.textContent = title;
  copy.append(heading);

  if (description) {
    const desc = document.createElement('p');
    desc.dataset.role = 'description';
    desc.className = 'tw:text-base tw:max-w-3xl tw:m-0';
    desc.textContent = description;
    copy.append(desc);
  }

  inner.append(copy);

  if (buttonLabel && buttonHref) {
    const actions = document.createElement('div');
    actions.className = 'tw:flex tw:flex-row tw:flex-wrap tw:gap-2 tw:items-center tw:max-w-max';

    const cta = document.createElement('a');
    cta.className = 'tw:button tw:cursor-pointer tw:button--primary';
    cta.dataset.component = 'button';
    cta.href = buttonHref;

    const label = document.createElement('span');
    label.className = 'tw:button__label';
    label.textContent = buttonLabel;
    cta.append(label);
    actions.append(cta);
    inner.append(actions);
  }

  wrapper.append(inner);
  return wrapper;
}

function fullBleed(block) {
  const wrapper = block.closest('.banner-wrapper');
  const container = block.closest('.banner-container');
  wrapper?.classList.add('tw:max-w-none', 'tw:p-0', 'tw:m-0');
  container?.classList.add('tw:m-0');
}

/**
 * Decorates the banner block from an authored key/value table.
 * @param {Element} block
 */
export default function decorate(block) {
  const cfg = readAuthoring(block);
  const uid = `banner-${crypto.randomUUID().slice(0, 8)}`;

  block.id = `takeover-banner-v2-${uid}`;
  block.lang = '';
  block.dir = '';
  block.dataset.theme = 'dark';
  block.dataset.component = 'banner/standard';
  block.setAttribute('aria-labelledby', `${uid}-banner-heading`);
  block.classList.add(...SECTION_CLASSES);

  const overlay = document.createElement('div');
  overlay.className = 'tw:w-full tw:h-full tw:absolute tw:top-0 tw:start-0 tw:z-10 tw:bg-black/60';

  const children = [overlay];

  let video;
  let playPause;
  let status;
  if (cfg.videoSrc) {
    video = createVideo(uid, cfg.videoSrc);
    playPause = createPlayPause(uid);
    status = document.createElement('span');
    status.id = `video-status-${uid}`;
    status.className = 'tw:sr-only';
    status.setAttribute('aria-live', 'polite');
    const describedBy = document.createElement('p');
    describedBy.id = `video-described-by-${uid}`;
    describedBy.className = 'tw:sr-only';
    children.push(video, playPause, status, describedBy);
  }

  if (cfg.imageSrc) children.push(createPoster(cfg.imageSrc));
  children.push(createCopy({ uid, ...cfg }));

  block.replaceChildren(...children);
  fullBleed(block);
  if (video && playPause) bindPlayPause(video, playPause, status);
}
