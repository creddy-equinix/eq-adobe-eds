/**
 * Locale helpers for document-based authoring.
 *
 * Content is authored as /{env}/{country}/{lang}/...
 * e.g. /dev/us/en/products → locale root /dev/us/en
 *      /dev/fr/fr          → locale root /dev/fr/fr
 */

/**
 * @param {string} [pathname]
 * @returns {string} locale root path with no trailing slash, or '' if none
 */
export function getLocaleRoot(pathname = window.location.pathname) {
  const threeLevel = pathname.match(/^\/([a-z0-9-]+\/[a-z]{2}\/[a-z]{2})(?=\/|$)/i);
  if (threeLevel) return `/${threeLevel[1]}`;

  const twoLevel = pathname.match(/^\/([a-z]{2}\/[a-z]{2})(?=\/|$)/i);
  if (twoLevel) return `/${twoLevel[1]}`;

  return '';
}

/**
 * Resolves nav/footer (or any shared document) for the current locale.
 * Page metadata (`nav`, `footer`, …) always wins when set.
 *
 * @param {string} name document name without leading slash, e.g. 'footer'
 * @param {string} [metaValue] value from getMetadata('footer') / getMetadata('nav')
 * @returns {string}
 */
export function getLocalizedPath(name, metaValue) {
  if (metaValue) return new URL(metaValue, window.location).pathname;
  const localeRoot = getLocaleRoot();
  return localeRoot ? `${localeRoot}/${name}` : `/${name}`;
}
