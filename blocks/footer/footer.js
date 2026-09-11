/* eslint-disable max-len */
import decorateNavigationFooter from './navigation-footer.js';
import { getMetadata } from '../../scripts/aem.js';
import { getLocalizedPath } from '../../scripts/locales.js';
const FOOTER_MARKUP = `
<footer id="footer-primary" lang="" dir="" data-theme="dark" data-component="footer" class="tw:relative tw:overflow-hidden tw:bg-linear-to-b tw:from-neutral-800 tw:to-black tw:text-neutral-400 tw:py-10 tw:nav:bg-linear-120">
  <div class="tw:wrapper tw:relative">
    <div class="tw:absolute tw:mask-alpha tw:mask-l-from-black tw:mask-l-from-50% tw:mask-l-to-transparent tw:start-0 tw:-bottom-10 tw:z-0 tw:nav:mask-l-from-80%">
      <img loading="lazy" src="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/footer/footer-grid.png" alt="" role="presentation" class="tw:z-0 tw:opacity-50 tw:nav:opacity-100 tw:max-w-xl">
    </div>
    <div class="tw:flex tw:flex-col tw:gap-6 tw:relative tw:z-10 tw:nav:gap-12">
      <section class="tw:flex tw:flex-col tw:gap-5 tw:nav:grid tw:nav:gap-10 tw:xl:grid-cols-2">
        <aside class="tw:flex tw:flex-col tw:gap-10 tw:pb-3 tw:justify-between tw:nav:pb-0">
          <span class="tw:max-w-max tw:block">
            <svg width="60" height="39" viewBox="0 0 60 39" alt="Equinix Logo" aria-label="Equinix logo" role="img" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff" d="M29.9243 0L23.9484 2.09008V33.3968L19.9347 32.0182V3.46864L7.98279 7.6488V27.8381L4.01369 26.4595V9.02737L0 10.4059V29.2611L11.9519 33.4413V10.4504L15.9656 9.07184V34.8198L27.9175 39V4.89168L29.9243 4.22463L31.9312 4.89168V39L43.883 34.8198V9.07184L47.8967 10.4504V33.4413L59.8486 29.2611V10.4059L55.8795 9.02737V26.4595L51.8658 27.8381V7.6488L39.9139 3.46864V32.0182L35.9002 33.3968V2.09008L29.9243 0Z"></path>
            </svg>
          </span>
          <div class="tw:flex tw:flex-row tw:items-center tw:gap-3">
            <a href="https://www.linkedin.com/company/equinix/" target="_blank" rel="external noreferrer noopener" aria-label="Follow us on LinkedIn" data-analytics-social-platform="linkedin" class="tw:w-11 tw:h-11 tw:flex tw:flex-col tw:items-center tw:justify-center tw:text-white tw:rounded-full tw:bg-black tw:transition-colors tw:duration-300 tw:ease-in-out tw:hover:bg-violet tw:focus:outline-0 tw:focus-visible:outline-2 tw:focus-visible:outline-purple-100">
              <span class="tw:w-6 tw:block">
                <svg class="e-social-linkedin" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>Follow us on LinkedIn</title>
                  <path d="M8.13438 18H5.23125V8.65312H8.13438V18ZM6.68125 7.37812C5.75312 7.37812 5 6.60938 5 5.68125C5 5.23535 5.17713 4.80772 5.49243 4.49243C5.80772 4.17713 6.23535 4 6.68125 4C7.12715 4 7.55478 4.17713 7.87007 4.49243C8.18537 4.80772 8.3625 5.23535 8.3625 5.68125C8.3625 6.60938 7.60938 7.37812 6.68125 7.37812ZM18.9969 18H16.1V13.45C16.1 12.3656 16.0781 10.975 14.5906 10.975C13.0812 10.975 12.85 12.1531 12.85 13.3719V18H9.95V8.65312H12.7344V9.92812H12.775C13.1625 9.19375 14.1094 8.41875 15.5219 8.41875C18.4594 8.41875 19 10.3531 19 12.8656V18H18.9969Z" fill="currentColor"></path>
                </svg>
              </span>
              <span class="tw:sr-only">Follow us on LinkedIn</span>
            </a>
            <a href="https://twitter.com/Equinix" target="_blank" rel="external noreferrer noopener" aria-label="Follow us on Twitter" data-analytics-social-platform="twitter" class="tw:w-11 tw:h-11 tw:flex tw:flex-col tw:items-center tw:justify-center tw:text-white tw:rounded-full tw:bg-black tw:transition-colors tw:duration-300 tw:ease-in-out tw:hover:bg-violet tw:focus:outline-0 tw:focus-visible:outline-2 tw:focus-visible:outline-purple-100">
              <span class="tw:w-6 tw:block">
                <svg class="e-social-x" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>Follow us on Twitter</title>
                  <path d="M16.0248 6H18.1725L13.4815 11.0827L19 18H14.6801L11.2942 13.8058L7.4246 18H5.27379L10.2903 12.5625L5 6H9.42938L12.4867 9.83365L16.0248 6ZM15.2703 16.7827H16.4598L8.7814 7.15385H7.50369L15.2703 16.7827Z" fill="currentColor"></path>
                </svg>
              </span>
              <span class="tw:sr-only">Follow us on Twitter</span>
            </a>
            <a href="https://www.youtube.com/@Equinix" target="_blank" rel="external noreferrer noopener" aria-label="Subscribe our YouTube Channel" data-analytics-social-platform="youtube" class="tw:w-11 tw:h-11 tw:flex tw:flex-col tw:items-center tw:justify-center tw:text-white tw:rounded-full tw:bg-black tw:transition-colors tw:duration-300 tw:ease-in-out tw:hover:bg-violet tw:focus:outline-0 tw:focus-visible:outline-2 tw:focus-visible:outline-purple-100">
              <span class="tw:w-6 tw:block">
                <svg class="e-social-youtube" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>Subscribe our YouTube Channel</title>
                  <path d="M8.90104 6.18901C8.51562 5.9453 8.03125 5.93727 7.63802 6.16491C7.24479 6.39255 7 6.82104 7 7.28703V16.7139C7 17.1799 7.24479 17.6084 7.63802 17.8361C8.03125 18.0637 8.51562 18.053 8.90104 17.812L16.401 13.0985C16.7734 12.8655 17 12.4504 17 12.0005C17 11.5506 16.7734 11.1381 16.401 10.9025L8.90104 6.18901Z" fill="currentColor"></path>
                </svg>
              </span>
              <span class="tw:sr-only">Subscribe our YouTube Channel</span>
            </a>
            <a href="https://www.facebook.com/Equinix/" target="_blank" rel="external noreferrer noopener" aria-label="Follow us on Facebook" data-analytics-social-platform="facebook" class="tw:w-11 tw:h-11 tw:flex tw:flex-col tw:items-center tw:justify-center tw:text-white tw:rounded-full tw:bg-black tw:transition-colors tw:duration-300 tw:ease-in-out tw:hover:bg-violet tw:focus:outline-0 tw:focus-visible:outline-2 tw:focus-visible:outline-purple-100">
              <span class="tw:w-6 tw:block">
                <svg class="e-social-facebook" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>Follow us on Facebook</title>
                  <path d="M9.58382 13.184V19H12.3675V13.184H14.4433L14.8752 10.5098H12.3675V9.56367C12.3675 8.15 12.8546 7.60859 14.1121 7.60859C14.5033 7.60859 14.8176 7.61953 15 7.64141V5.21602C14.6568 5.10938 13.8169 5 13.3322 5C10.7669 5 9.58382 6.38086 9.58382 9.35859V10.5098H8V13.184H9.58382Z" fill="currentColor"></path>
                </svg>
              </span>
              <span class="tw:sr-only">Follow us on Facebook</span>
            </a>
          </div>
        </aside>
        <div id="footer-columns" class="tw:flex tw:flex-col tw:border-b tw:border-offset tw:nav:grid tw:nav:grid-cols-3 tw:nav:gap-8 tw:nav:border-0 tw:nav:p-0">
          <div class="tw:flex tw:flex-col tw:nav:gap-3">
            <button data-role="footer-toggle" aria-controls="footer-Company" class="tw:text-start tw:flex tw:flex-row tw:items-center tw:gap-3 tw:justify-between tw:py-3 tw:border-t tw:border-offset tw:nav:py-0 tw:nav:border-0">
              <h6 class="tw:text-xs tw:heading tw:uppercase tw:text-white">Company</h6>
              <span data-role="caret" class="tw:group-aria-expanded tw:w-3 tw:h-3 tw:transition-transform tw:duration-75 tw:nav:hidden tw:no-js:hidden">
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
              </span>
            </button>
            <ul aria-expanded="true" id="footer-Company" class="tw:text-sm" data-visible="true">
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/about" aria-label="About">About</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="https://careers.equinix.com/homepage" aria-label="Careers" rel="external noreferrer noopener" target="_blank">Careers</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/about/leadership" aria-label="Leadership">Leadership</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/newsroom" aria-label="Newsroom">Newsroom</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/about/sustainability" aria-label="Sustainability" rel="external noreferrer noopener" target="_blank">Sustainability</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="https://equinixtogether.com/" aria-label="Local Engagement" rel="external noreferrer noopener" target="_blank">Local Engagement</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/about/equinix-foundation" aria-label="Equinix Foundation">Equinix Foundation</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="http://investor.equinix.com/" aria-label="Investor Relations" rel="external noreferrer noopener" target="_blank">Investor Relations</a>
              </li>
            </ul>
          </div>
          <div class="tw:flex tw:flex-col tw:nav:gap-3">
            <button data-role="footer-toggle" aria-controls="footer-Products" class="tw:text-start tw:flex tw:flex-row tw:items-center tw:gap-3 tw:justify-between tw:py-3 tw:border-t tw:border-offset tw:nav:py-0 tw:nav:border-0">
              <h6 class="tw:text-xs tw:heading tw:uppercase tw:text-white">Products</h6>
              <span data-role="caret" class="tw:group-aria-expanded tw:w-3 tw:h-3 tw:transition-transform tw:duration-75 tw:nav:hidden tw:no-js:hidden">
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
              </span>
            </button>
            <ul aria-expanded="true" id="footer-Products" class="tw:text-sm" data-visible="true">
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/product-solutions/connectivity" aria-label="Connectivity">Connectivity</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/product-solutions/colocation" aria-label="Colocation">Colocation</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/product-solutions/managed-solutions" aria-label="Managed Services">Managed Services</a>
              </li>
            </ul>
          </div>
          <div class="tw:flex tw:flex-col tw:nav:gap-3">
            <button data-role="footer-toggle" aria-controls="footer-Partners" class="tw:text-start tw:flex tw:flex-row tw:items-center tw:gap-3 tw:justify-between tw:py-3 tw:border-t tw:border-offset tw:nav:py-0 tw:nav:border-0">
              <h6 class="tw:text-xs tw:heading tw:uppercase tw:text-white">Partners</h6>
              <span data-role="caret" class="tw:group-aria-expanded tw:w-3 tw:h-3 tw:transition-transform tw:duration-75 tw:nav:hidden tw:no-js:hidden">
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
              </span>
            </button>
            <ul aria-expanded="true" id="footer-Partners" class="tw:text-sm" data-visible="true">
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="https://partnercentral.equinix.com/s/?language=en_US" aria-label="Partner login" rel="external noreferrer noopener" target="_blank">Partner login</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/partners/partner-directory" aria-label="Reseller directory">Reseller directory</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/partners/authorized-distributors" aria-label="Authorized distributors">Authorized distributors</a>
              </li>
              <li class="tw:last:pb-3">
                <a class="tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1" href="/partners/technology-service-distributors" aria-label="Technology service distributors">Technology service distributors</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div class="tw:flex tw:flex-col tw:gap-4 tw:pt-5 tw:nav:pt-0">
        <div class="tw:flex tw:text-white tw:text-xs tw:gap-5 tw:flex-row">
          <span class="tw:font-bold">© 2026 Equinix Inc.</span>
          <input type="hidden" id="e2-dark-mode" value="Switch to dark mode">
          <input type="hidden" id="e2-light-mode" value="Switch to light mode">
          <button id="ui-theme-toggle" class="tw:group tw:text-link tw:no-underline tw:flex tw:flex-row-reverse tw:gap-1 tw:items-center tw:cursor-pointer">
            <span id="ui-theme-toggle--label">Switch to dark mode</span>
            <span class="tw:w-4 tw:flex">
              <svg class="e-solid-mode" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>true</title>
                <path d="M18.625 11.5C18.625 7.56641 15.4336 4.375 11.5 4.375V18.625C15.4336 18.625 18.625 15.4336 18.625 11.5ZM2 11.5C2 8.98044 3.00089 6.56408 4.78249 4.78249C6.56408 3.00089 8.98044 2 11.5 2C14.0196 2 16.4359 3.00089 18.2175 4.78249C19.9991 6.56408 21 8.98044 21 11.5C21 14.0196 19.9991 16.4359 18.2175 18.2175C16.4359 19.9991 14.0196 21 11.5 21C8.98044 21 6.56408 19.9991 4.78249 18.2175C3.00089 16.4359 2 14.0196 2 11.5Z" fill="currentColor"></path>
              </svg>
            </span>
          </button>
        </div>
        <ul id="footer-legal" class="tw:flex tw:flex-row tw:flex-wrap tw:gap-x-3 tw:text-xs tw:border-t tw:pt-2 tw:border-offset">
          <li>
            <a class="tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1" href="/about/legal/terms" aria-label="Legal">Legal</a>
          </li>
          <li>
            <a class="tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1" href="/about/legal/privacy" aria-label="Privacy">Privacy</a>
          </li>
          <li>
            <a class="tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1" href="https://digital.equinix.com/Preference-Management-Center-WW" aria-label="Preferences" rel="external noreferrer noopener" target="_blank">Preferences</a>
          </li>
          <li>
            <a class="tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1" href="/about/legal/privacy/global-privacy-policy" aria-label="Binding corporate rules">Binding corporate rules</a>
          </li>
          <li>
            <a class="tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1" href="/about/legal/patents" aria-label="Patents">Patents</a>
          </li>
          <li>
            <a class="tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1" href="/about/legal/gender-pay-report" aria-label="Gender pay report (UK)">Gender pay report (UK)</a>
          </li>
          <li>
            <a class="tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1" href="/about/legal/ukmsa" aria-label="Modern slavery act">Modern slavery act</a>
          </li>
          <li>
            <a href="#" id="ot-sdk-btn" class="ot-sdk-show-settings tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1" aria-label="Cookie Preference">Privacy Settings</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
`;

const CARET_SVG = `
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
`;

const COLUMN_LINK_CLASS = 'tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:block tw:nav:py-1';
const LEGAL_LINK_CLASS = 'tw:inline-block tw:py-2 tw:text-link tw:no-underline tw:hover:text-white tw:nav:py-1';

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

function rowValue(valueCell) {
  return cellHref(valueCell) || cellText(valueCell);
}

function isCookieItem(item) {
  const id = toKey(item.id);
  const label = toKey(item.label);
  return id === 'ot-sdk-btn'
    || id === 'privacy-settings'
    || label === 'privacy-settings'
    || label === 'cookie-preference';
}

function markExternal(anchor, href) {
  if (href?.startsWith('http')) {
    anchor.rel = 'external noreferrer noopener';
    anchor.target = '_blank';
  }
}

/**
 * Reads one footer-nav table (2-column key / value rows).
 * Label = column heading; Item / Item Link = links under it.
 */
function parseFooterNavBlock(block) {
  const column = { label: '', items: [] };
  let current = null;

  [...block.children].forEach((row) => {
    const [nameCell, valueCell] = row.children;
    if (!valueCell) return;
    const key = toKey(nameCell.textContent);
    const text = cellText(valueCell);
    const href = rowValue(valueCell);

    if (key === 'label' || key === 'column' || key === 'title') {
      column.label = text;
    } else if (key === 'item' || key === 'item-label') {
      current = { label: text, link: '', id: '' };
      column.items.push(current);
    } else if (key === 'item-link') {
      if (current) current.link = href;
    } else if (key === 'item-id' || key === 'id') {
      if (current) current.id = text;
    } else if (key === 'link' && current) {
      current.link = href;
    }
  });

  return column.label ? column : null;
}

/**
 * Reads one footer-legal table (2-column key / value rows).
 */
function parseFooterLegalBlock(block) {
  const items = [];
  let current = null;

  [...block.children].forEach((row) => {
    const [nameCell, valueCell] = row.children;
    if (!valueCell) return;
    const key = toKey(nameCell.textContent);
    const text = cellText(valueCell);
    const href = rowValue(valueCell);

    if (key === 'item' || key === 'item-label' || key === 'label') {
      current = { label: text, link: '', id: '' };
      items.push(current);
    } else if (key === 'item-link' || key === 'link') {
      if (current) current.link = href;
    } else if (key === 'item-id' || key === 'id') {
      if (current) current.id = text;
    }
  });

  return items;
}

function parseAuthoredFooter(root) {
  return {
    columns: [...root.querySelectorAll('.footer-nav')].map(parseFooterNavBlock).filter(Boolean),
    legal: [...root.querySelectorAll('.footer-legal')].flatMap(parseFooterLegalBlock),
  };
}

async function fetchAuthoredFooter() {
  const path = getLocalizedPath('footer', getMetadata('footer'));
  try {
    const resp = await fetch(`${path}.plain.html`);
    if (!resp.ok) return { columns: [], legal: [] };
    const wrap = document.createElement('div');
    wrap.innerHTML = await resp.text();
    return parseAuthoredFooter(wrap);
  } catch {
    return { columns: [], legal: [] };
  }
}

function createFooterLink(item, className) {
  const href = item.link || '#';
  const a = document.createElement('a');
  a.href = href;
  a.className = className;
  a.setAttribute('aria-label', item.label);
  a.textContent = item.label;
  if (isCookieItem(item)) {
    a.id = item.id || 'ot-sdk-btn';
    a.classList.add('ot-sdk-show-settings');
    if (!item.link) a.href = '#';
  } else {
    markExternal(a, href);
  }
  return a;
}

function buildFooterColumn(column) {
  const slug = toKey(column.label) || 'column';
  const panelId = `footer-${slug}`;
  const wrap = document.createElement('div');
  wrap.className = 'tw:flex tw:flex-col tw:nav:gap-3';

  const btn = document.createElement('button');
  btn.dataset.role = 'footer-toggle';
  btn.setAttribute('aria-controls', panelId);
  btn.className = 'tw:text-start tw:flex tw:flex-row tw:items-center tw:gap-3 tw:justify-between tw:py-3 tw:border-t tw:border-offset tw:nav:py-0 tw:nav:border-0';
  const heading = document.createElement('h6');
  heading.className = 'tw:text-xs tw:heading tw:uppercase tw:text-white';
  heading.textContent = column.label;
  const caret = document.createElement('span');
  caret.dataset.role = 'caret';
  caret.className = 'tw:group-aria-expanded tw:w-3 tw:h-3 tw:transition-transform tw:duration-75 tw:nav:hidden tw:no-js:hidden';
  caret.innerHTML = CARET_SVG.trim();
  btn.append(heading, caret);

  const ul = document.createElement('ul');
  ul.id = panelId;
  ul.className = 'tw:text-sm';
  ul.setAttribute('aria-expanded', 'true');
  ul.dataset.visible = 'true';
  column.items.forEach((item) => {
    if (!item.label) return;
    const li = document.createElement('li');
    li.className = 'tw:last:pb-3';
    li.append(createFooterLink(item, COLUMN_LINK_CLASS));
    ul.append(li);
  });

  wrap.append(btn, ul);
  return wrap;
}

function buildLegalItems(items) {
  return items.filter((item) => item.label).map((item) => {
    const li = document.createElement('li');
    li.append(createFooterLink(item, LEGAL_LINK_CLASS));
    return li;
  });
}

function applyAuthoredFooter(root, authored) {
  const columnsEl = root.querySelector('#footer-columns');
  if (columnsEl && authored.columns.length) {
    columnsEl.replaceChildren(...authored.columns.map(buildFooterColumn));
  }

  const legalEl = root.querySelector('#footer-legal');
  if (legalEl && authored.legal.length) {
    legalEl.replaceChildren(...buildLegalItems(authored.legal));
  }
}

function bindFooterToggles(root) {
  const desktop = window.matchMedia('(min-width: 1024px)');

  root.querySelectorAll('[data-role="footer-toggle"]').forEach((btn) => {
    const panel = root.querySelector(`#${btn.getAttribute('aria-controls')}`);
    if (!panel) return;
    const caret = btn.querySelector('[data-role="caret"]');

    btn.addEventListener('click', () => {
      if (desktop.matches) return;
      const isOpen = panel.getAttribute('aria-expanded') === 'true';
      panel.setAttribute('aria-expanded', String(!isOpen));
      panel.dataset.visible = String(!isOpen);
      panel.classList.toggle('tw:hidden', isOpen);
      if (caret) caret.classList.toggle('tw:rotate-180', !isOpen);
    });
  });
}

function bindThemeToggle(root) {
  const btn = root.querySelector('#ui-theme-toggle');
  const label = root.querySelector('#ui-theme-toggle--label');
  if (!btn) return;

  const darkLabel = root.querySelector('#e2-dark-mode')?.value || 'Switch to dark mode';
  const lightLabel = root.querySelector('#e2-light-mode')?.value || 'Switch to light mode';

  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    if (label) label.textContent = theme === 'dark' ? lightLabel : darkLabel;
  };

  apply(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  btn.addEventListener('click', () => {
    apply(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerEl = block.closest('footer') || block;
  const template = document.createElement('div');
  template.innerHTML = FOOTER_MARKUP.trim();
  const staticFooter = template.querySelector('#footer-primary');
  if (!staticFooter) return;

  Array.from(staticFooter.attributes).forEach((attr) => {
    footerEl.setAttribute(attr.name, attr.value);
  });

  block.replaceChildren(...staticFooter.children);
  const authored = await fetchAuthoredFooter();
  applyAuthoredFooter(block, authored);
  bindFooterToggles(footerEl);
  bindThemeToggle(footerEl);
  decorateNavigationFooter();
}
