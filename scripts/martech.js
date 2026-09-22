import { getMetadata } from './aem.js';
// eslint-disable-next-line import/no-relative-packages
import {
  initMartech,
  updateUserConsent,
  martechEager,
  martechLazy,
  martechDelayed,
} from '../plugins/martech/src/index.js';

/**
 * Adobe Experience Platform Web SDK + Target config.
 *
 * Required from Data Collection (not secrets):
 * - orgId: Experience Cloud org
 * - datastreamId: datastream with Adobe Target (and Analytics if used) enabled
 *
 * Optional:
 * - launchUrls: AEP Tags (Launch) library URLs. Leave empty if Launch is not ready.
 *   Do not add Web SDK / Target / Analytics extensions in Launch; this plugin loads them.
 *
 * Disable on a page: ?martech=off
 * Enable Target on a page: author metadata `Target` = `on`
 */
const WEB_SDK = {
  orgId: 'ACFE2DFD5DDFE4640A495FA3@AdobeOrg',
  datastreamId: 'a529c680-fab7-44f8-bfbe-fda7f823f059',
  launchUrls: [],
};

let initialized = false;

export function isMartechDisabled() {
  return new URLSearchParams(window.location.search).get('martech') === 'off';
}

export function isMartechConfigured() {
  return Boolean(WEB_SDK.datastreamId && WEB_SDK.orgId);
}

/**
 * Authors enable Target with page metadata `Target` = `on` (any value except off/false/0/no).
 * @returns {boolean}
 */
export function isTargetRequested() {
  const value = getMetadata('target').trim().toLowerCase();
  if (!value) return false;
  return !['off', 'false', '0', 'no'].includes(value);
}

/**
 * Initializes Web SDK / Target. Independent of consent-check.js / GTM.
 * @returns {Promise<boolean>} true when the plugin was initialized
 */
export async function initSiteMartech() {
  if (initialized) return true;
  if (isMartechDisabled() || !isMartechConfigured()) {
    if (!isMartechDisabled() && !isMartechConfigured()) {
      // eslint-disable-next-line no-console
      console.warn('Adobe Target is wired but datastreamId is empty. Set it in scripts/martech.js.');
    }
    return false;
  }

  const personalization = isTargetRequested();

  await initMartech(
    {
      datastreamId: WEB_SDK.datastreamId,
      orgId: WEB_SDK.orgId,
      onBeforeEventSend: () => true,
    },
    {
      analytics: true,
      personalization,
      launchUrls: WEB_SDK.launchUrls,
    },
  );

  initialized = true;
  if (personalization) {
    await updateUserConsent({
      collect: true,
      marketing: true,
      personalize: true,
      share: true,
    });
  }
  return true;
}

export async function runMartechEager() {
  if (!initialized) return;
  await martechEager();
}

export async function runMartechLazy() {
  if (!initialized) return;
  await martechLazy();
}

export async function runMartechDelayed() {
  if (!initialized) return;
  await martechDelayed();
}

export { updateUserConsent };
