/**
 * OneTrust / GTM consent helpers used by aem-gtm-martech.
 *
 * Matches https://dev.equinix.com/: GTM-KPFQZC3 loads OneTrust, which writes
 * OptanonActiveGroups / OptanonConsent. Footer Privacy Settings uses #ot-sdk-btn.
 *
 * OneTrust groups (standard Equinix categories):
 *   C0001 Necessary
 *   C0002 Performance
 *   C0003 Functional
 *   C0004 Targeting
 *
 * Test override (does not require OneTrust):
 *   ?consent=accept   treat all groups as granted
 *   ?consent=decline  treat all optional groups as denied
 */

const ALL_GROUPS = ['C0001', 'C0002', 'C0003', 'C0004'];
const CONSENT_WAIT_MS = 10000;
/** Same default COM script as AEM onetrust.html / GTM-KPFQZC3. */
const ONETRUST_DOMAIN_SCRIPT = '04658866-4023-4350-94ca-9033965f7b0b';

/**
 * Load OneTrust from the site (not GTM). GTM-KPFQZC3 injects
 * otSDKStub.js?did=undefined on aem.live because its domain-id lookup
 * only matches *.equinix.com.
 */
export function loadOneTrust() {
  if (typeof window.OptanonWrapper !== 'function') {
    window.OptanonWrapper = function OptanonWrapper() {};
  }
  if (document.querySelector(`script[data-domain-script="${ONETRUST_DOMAIN_SCRIPT}"]`)) {
    return;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE || node.tagName !== 'SCRIPT') return;
        const src = node.getAttribute('src') || '';
        if (src.includes('otSDKStub') && src.includes('did=undefined')) {
          node.remove();
        }
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  const script = document.createElement('script');
  script.src = `https://cdn.cookielaw.org/consent/${ONETRUST_DOMAIN_SCRIPT}/otSDKStub.js`;
  script.setAttribute('data-domain-script', ONETRUST_DOMAIN_SCRIPT);
  script.setAttribute('data-document-language', 'true');
  script.async = true;
  document.head.append(script);
}

function parseQueryConsent() {
  const consent = new URLSearchParams(window.location.search).get('consent');
  if (consent === null) return null;
  if (['accept', 'true', '1', 'yes'].includes(consent.toLowerCase())) {
    return ALL_GROUPS;
  }
  return ['C0001'];
}

function parseActiveGroupsString(raw) {
  if (!raw) return [];
  return String(raw)
    .split(',')
    .map((part) => part.trim())
    .filter((part) => /^C\d+/i.test(part))
    .map((part) => part.toUpperCase());
}

function parseOptanonConsentCookie() {
  const match = document.cookie.match(/(?:^|; )OptanonConsent=([^;]*)/);
  if (!match) return [];
  let decoded = match[1];
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // keep raw cookie value
  }
  const groupsPart = decoded.split('&').find((part) => part.startsWith('groups='));
  if (!groupsPart) return [];
  return groupsPart
    .slice('groups='.length)
    .split(',')
    .flatMap((pair) => {
      const [id, on] = pair.split(':');
      return on === '1' && id ? [id.toUpperCase()] : [];
    });
}

/**
 * Current OneTrust groups from query, live globals, or the OptanonConsent cookie.
 * @returns {string[]}
 */
export function getCurrentGroups() {
  const fromQuery = parseQueryConsent();
  if (fromQuery) return fromQuery;

  const live = parseActiveGroupsString(
    window.OnetrustActiveGroups || window.OptanonActiveGroups,
  );
  if (live.length) return live;

  return parseOptanonConsentCookie();
}

/**
 * Map OneTrust groups to Google Consent Mode v2.
 * @param {string[]} groups
 * @returns {Object}
 */
export function toGoogleConsent(groups) {
  const granted = (id) => (groups.includes(id) ? 'granted' : 'denied');
  return {
    ad_storage: granted('C0004'),
    ad_user_data: granted('C0004'),
    ad_personalization: granted('C0004'),
    analytics_storage: granted('C0002'),
    functionality_storage: granted('C0003'),
    personalization_storage: granted('C0003'),
    security_storage: 'granted',
  };
}

/**
 * Map OneTrust groups to Adobe Web SDK / Target consent.
 * @param {string[]} groups
 * @returns {Object}
 */
export function toAdobeConsent(groups) {
  const collect = groups.includes('C0002');
  const targeting = groups.includes('C0004');
  return {
    collect,
    marketing: targeting,
    personalize: targeting,
    share: targeting,
  };
}

/**
 * Resolves when OneTrust (or the ?consent= override) has a known state.
 * GTM loads OneTrust in the lazy phase, so first-time visitors wait here.
 * @returns {Promise<string[]>}
 */
export function waitForConsent() {
  return new Promise((resolve) => {
    const existing = getCurrentGroups();
    if (existing.length) {
      resolve(existing);
      return;
    }

    let settled = false;
    let timer;
    const onUpdate = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener('OneTrustGroupsUpdated', onUpdate);
      window.removeEventListener('consent.onetrust', onUpdate);
      window.clearTimeout(timer);
      resolve(getCurrentGroups());
    };

    window.addEventListener('OneTrustGroupsUpdated', onUpdate);
    window.addEventListener('consent.onetrust', onUpdate);
    timer = window.setTimeout(onUpdate, CONSENT_WAIT_MS);
  });
}
