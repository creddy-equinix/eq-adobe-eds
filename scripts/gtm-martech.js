// eslint-disable-next-line import/no-relative-packages
import GtmMartech from '../plugins/gtm-martech/src/index.js';
import {
  getCurrentGroups,
  toAdobeConsent,
  toGoogleConsent,
  waitForConsent,
} from './consent-check.js';
import { applyUserConsent } from './martech.js';

/**
 * Same GTM container as https://dev.equinix.com/ (GTM-KPFQZC3 on `dataLayer`).
 * OneTrust is loaded by that container. This helper maps those groups to:
 *   - gtmMartech.updateUserConsent → gtag('consent', 'update', …)
 *   - Adobe Web SDK / Target updateUserConsent
 *
 * Disable with ?martech=off (also used by DA preview).
 */
const disabled = new URLSearchParams(window.location.search).get('martech') === 'off';

let consentedLoaded = false;

function loadConsentedScripts() {
  if (consentedLoaded) return;
  consentedLoaded = true;
  import('./consented.js');
}

export function applyConsent(groups) {
  const google = toGoogleConsent(groups);
  // eslint-disable-next-line no-use-before-define
  gtmMartech.updateUserConsent(google);
  applyUserConsent(toAdobeConsent(groups));
  if (google.analytics_storage === 'granted') {
    loadConsentedScripts();
  }
}

const gtmMartech = new GtmMartech({
  analytics: !disabled,
  consent: !disabled,
  dataLayerInstanceName: 'dataLayer',
  tags: ['G-KW187RQL41'],
  containers: {
    lazy: ['GTM-KPFQZC3'],
    delayed: [],
  },
  consentCallback: async () => {
    const groups = await waitForConsent();
    applyConsent(groups);
    return toGoogleConsent(groups);
  },
});

function syncFromCmp() {
  const groups = getCurrentGroups();
  if (groups.length) applyConsent(groups);
}

const known = getCurrentGroups();
if (known.length) {
  applyConsent(known);
}

window.addEventListener('OneTrustGroupsUpdated', syncFromCmp);
window.addEventListener('consent.onetrust', (event) => {
  if (Array.isArray(event.detail) && event.detail.length) {
    applyConsent(event.detail);
    return;
  }
  syncFromCmp();
});

export default gtmMartech;
