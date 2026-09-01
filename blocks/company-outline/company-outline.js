import { getMetadata } from '../../scripts/aem.js';

const COMPANY_OUTLINE_MARKUP = `
                    <div class="tw:lg:h-full tw:lg:pe-16 tw:2xl:pe-22">
                        <div class="tw:lg:sticky tw:lg:top-24">

                          <!-- Company outline block -->
                            <div class="tw:w-full tw:text-secondary tw:overflow-y-auto tw:scrollbar">
                                <div class="tw:relative tw:space-y-6 tw:text-sm tw:text-pretty tw:lg:text-xs">
                                    <img class="tw:h-auto tw:w-full tw:max-w-40 tw:dark:grayscale-100 tw:dark:saturate-0 tw:dark:brightness-0 tw:dark:invert-100" data-graphic="logo-nanyang-biologics" src="/content/dam/eqxcorp/en_us/images/customer-stories/Nanyang.svg" alt="Nanyang Logo Alt text">
                                    <div data-role="aside-description" class="tw:prose-minor tw:space-y-3" aria-label="Company description">
                                        <p>Nanyang Biologics has been shaping Hong Kong's skyline and infrastructure since 1958, delivering critical infrastructure while continually tackling complex safety challenges. Building on its long-standing Zero Harm commitment, Gammon is now re-imagining its future through digital transformation and AI-driven Smart Construction 4.0.</p>
                                    </div>
                                    <div data-role="aside-metadata" aria-label="Company attributes" class="tw:grid tw:grid-cols-1 tw:gap-6 tw:sm:grid-cols-3 tw:lg:grid-cols-1 tw:xl:grid-cols-2 tw:print:hidden">
                                        <dl>
                                            <dt><strong class="tw:text-strong">Company size</strong></dt>
                                            <dd>$2.5B (USD)</dd>
                                        </dl>
                                        <dl data-meta="region">
                                            <dt><strong class="tw:text-strong">Region</strong></dt>
                                        </dl>
                                        <dl data-meta="solution">
                                            <dt><strong class="tw:text-strong">Solutions</strong></dt>
                                        </dl>
                                        <dl data-meta="product">
                                            <dt><strong class="tw:text-strong">Products</strong></dt>
                                        </dl>
                                        <dl data-meta="industry">
                                            <dt><strong class="tw:text-strong">Industry</strong></dt>
                                        </dl>
                                        <dl data-meta="team">
                                            <dt><strong class="tw:text-strong">Teams/Role</strong></dt>
                                        </dl>
                                    </div>
                                    <div data-role="aside-cta" class="tw:flex tw:flex-row tw:flex-wrap tw:gap-2 tw:items-center tw:max-w-max tw:xl:pt-4">
    <a class="tw:button tw:cursor-pointer tw:button--primary tw:button--sm   " data-component="button" href="/contact-us/sales">
    	<span class="tw:button__label">Talk to an expert</span>
    </a>
                                        <a id="btn-print" href="#" data-component="button" class="tw:button tw:cursor-pointer tw:button--secondary tw:button--icon-start tw:button--sm">
                                            <span class="tw:button__label">Print page</span>
                                            <span class="tw:button__icon">
                                                <svg class="tw:e-print" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M7.1999 2.39999C5.87615 2.39999 4.7999 3.47624 4.7999 4.79999V8.39999H7.1999V4.79999H15.7012L16.7999 5.89874V8.39999H19.1999V5.89874C19.1999 5.26124 18.9487 4.64999 18.4987 4.19999L17.3999 3.10124C16.9499 2.65124 16.3387 2.39999 15.7012 2.39999H7.1999ZM16.7999 15.6V16.8V19.2H7.1999V16.8V16.2V15.6H16.7999ZM19.1999 16.8H20.3999C21.0637 16.8 21.5999 16.2637 21.5999 15.6V12C21.5999 10.6762 20.5237 9.59999 19.1999 9.59999H4.7999C3.47615 9.59999 2.3999 10.6762 2.3999 12V15.6C2.3999 16.2637 2.93615 16.8 3.5999 16.8H4.7999V19.2C4.7999 20.5237 5.87615 21.6 7.1999 21.6H16.7999C18.1237 21.6 19.1999 20.5237 19.1999 19.2V16.8ZM18.5999 11.7C18.8386 11.7 19.0675 11.7948 19.2363 11.9636C19.4051 12.1324 19.4999 12.3613 19.4999 12.6C19.4999 12.8387 19.4051 13.0676 19.2363 13.2364C19.0675 13.4052 18.8386 13.5 18.5999 13.5C18.3612 13.5 18.1323 13.4052 17.9635 13.2364C17.7947 13.0676 17.6999 12.8387 17.6999 12.6C17.6999 12.3613 17.7947 12.1324 17.9635 11.9636C18.1323 11.7948 18.3612 11.7 18.5999 11.7Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                          <!-- END Company outline block -->
                        </div>
                    </div>
`;

/** Path bases used when turning metadata labels into anchors. */
const META_LINK_BASES = {
  region: '/data-centers',
  solution: '/product-solutions',
  product: '/product-solutions',
  industry: '/industries',
  team: '/teams',
};

/** Page metadata fields rendered into the company outline. */
const META_FIELDS = Object.keys(META_LINK_BASES);

/**
 * Splits a comma-separated metadata value into trimmed labels.
 * @param {string} value
 * @returns {string[]}
 */
function splitMetaValues(value) {
  return String(value || '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Converts a label into a URL path segment.
 * @param {string} label
 * @returns {string}
 */
function toSlug(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Fills a definition list with linked <dd> labels from page metadata.
 * Hides the list when metadata is missing.
 * @param {Element} root
 * @param {string} metaName metadata name attribute, e.g. 'region'
 */
function populateMetaList(root, metaName) {
  const list = root.querySelector(`dl[data-meta="${metaName}"]`);
  if (!list) return;

  const labels = splitMetaValues(getMetadata(metaName));
  if (labels.length === 0) {
    list.hidden = true;
    return;
  }

  const base = META_LINK_BASES[metaName] || '';
  labels.forEach((label) => {
    const dd = document.createElement('dd');
    const slug = toSlug(label);
    if (base && slug) {
      const link = document.createElement('a');
      link.href = `${base}/${slug}`;
      link.className = 'tw:text-link';
      link.textContent = label;
      dd.append(link);
    } else {
      dd.textContent = label;
    }
    list.append(dd);
  });
}

/**
 * loads and decorates the COMPANY_OUTLINE
 * @param {Element} block The COMPANY_OUTLINE block element
 */
export default async function decorate(block) {
  const staticContainer = document.createElement('aside');
  staticContainer.className = 'tw:relative tw:order-last tw:pt-12 tw:lg:pt-0 tw:lg:order-first tw:lg:col-span-4 tw:2xl:col-span-3';

  staticContainer.innerHTML = COMPANY_OUTLINE_MARKUP;

  // Labels come from page metadata, e.g.:
  // <meta name="region" content="Asia Pacific, Americas">
  // <meta name="solution" content="Colocation, AI">
  // <meta name="product" content="Equinix Fabric, Fabric Cloud Router">
  // <meta name="industry" content="Automotive, Public Sector">
  // <meta name="team" content="AI Leaders, Cloud Architects">
  META_FIELDS.forEach((metaName) => populateMetaList(staticContainer, metaName));

  block.replaceChildren(staticContainer);

  const wrapper = block.parentElement;
  const section = wrapper?.parentElement;

  if (section && wrapper) {
    while (block.firstChild) {
      section.insertBefore(block.firstChild, wrapper);
    }
    wrapper.remove();
  }
}
