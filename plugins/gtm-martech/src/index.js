/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * @callback consentCallback
 * @returns {Promise<object|undefined>} A promise that resolves to a consent config object.
 */

/**
 * @callback decorateCallback
 * @param {Element} el The section or block element to decorate.
 */

/**
 * Default configuration for the plugin.
 * @typedef {Object} GtmMartechConfig
 * @property {Boolean} analytics Whether to initialize analytics
 * @property {String} dataLayerInstanceName The name of the data layer instance in the global scope
 *                                         (defaults to "gtmDataLayer")
 * @property {Array<string>|String} tags The GA4 tags to initialize
 * @property {Object|Array<string>|String} containers GTM containers to load during specified phases.
 * @property {Array} containers.lazy The GTM containers to load during the lazy phase
 * @property {Array} containers.delayed The GTM containers to load during the delayed phase
 * @property {Object} gtagConfig Options passed to `gtag('config', measurementId, gtagConfig)`
 * @property {Object} [pageMetadata] Deprecated alias for `gtagConfig`
 * @property {Boolean} consent Whether consent is required
 * @property {consentCallback} consentCallback A function that will prompt the visitor for consent
 * @property {decorateCallback} decorateCallback Called on each section & block load
 */

const GTM_HOST = 'https://www.googletagmanager.com';

const DEFAULT_CONSENT = Object.freeze({
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'denied',
  wait_for_update: 500,
});

const DEFAULT_CONFIG = Object.freeze({
  analytics: true,
  dataLayerInstanceName: 'gtmDataLayer',
  tags: [],
  containers: {
    lazy: [],
    delayed: [],
  },
  pageMetadata: {},
  gtagConfig: {},
  consent: true,
  consentCallback: () => Promise.resolve(undefined),
  decorateCallback: undefined,
});

/**
 * Loads a non module JS file.
 * @param {string} src URL to the JS file
 */
async function loadScript(src) {
  const attrs = { async: true };
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`head > script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      if (attrs) {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const attr in attrs) {
          script.setAttribute(attr, attrs[attr]);
        }
      }
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    } else {
      resolve();
    }
  });
}

/**
 * Initialize the data layer
 *
 * @param {String} instanceName The name of the data layer instance in the global scope
 * @returns {Array} The data layer instance
 */
function initDataLayer(instanceName) {
  window[instanceName] = window[instanceName] || [];
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window[instanceName].push(arguments);
  }
  window.gtag = gtag;
  return window[instanceName];
}

/**
 * Initialize GA4 tags.
 *
 * @param {String} instanceName the name of the data layer instance in the global scope
 * @param {Array} tags the GA4 tags to initialize
 */
function initGa(instanceName, tags) {
  tags.forEach((tag) => {
    loadScript(`${GTM_HOST}/gtag/js?id=${tag}&l=${instanceName}`);
  });
}

/**
 * Load GTM containers for the specified phase.
 *
 * @param {String} phase the phase to load
 */
function loadGtm(phase) {
  if (!this.config.analytics) {
    // eslint-disable-next-line no-console
    console.warn('Analytics is disabled in the martech config');
    return;
  }
  if (this.config.containers[phase]?.length > 0) {
    this.pushToDataLayer({ event: 'gtm.js', [`gtm.${phase}.start`]: Date.now() });
    this.config.containers[phase].forEach((container) => {
      loadScript(`${GTM_HOST}/gtm.js?id=${container}&l=${this.config.dataLayerInstanceName}`);
    });
  }
}

/**
 * Observe for Section & Block elements so projects can decorate with DataLayer events.
 *
 * @param {Function} fn the function to call for each found section or block
 */
function observeElements(fn) {
  const decorate = (el) => {
    if (el.dataset.gtmMartechDecorated) return;
    // eslint-disable-next-line no-param-reassign
    el.dataset.gtmMartechDecorated = true;
    fn(el);
  };

  const opts = {
    subtree: true,
    attributes: true,
    attributeFilter: ['data-block-status', 'data-section-status'],
  };

  const loadingObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.target.dataset.blockStatus === 'loaded'
        || m.target.dataset.sectionStatus === 'loaded') {
        decorate(m.target);
      }
    });
  });
  loadingObserver.observe(document.querySelector('main'), opts);

  const addedObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        loadingObserver.observe(node, opts);
        if (node.dataset.blockStatus === 'loaded'
          || node.dataset.sectionStatus === 'loaded') {
          decorate(node);
        } else if (node.classList.contains('fragment-wrapper')) {
          addedObserver.observe(node, { childList: true });
        }
        node.querySelectorAll('[data-block-status="loaded"],[data-section-status="loaded"]').forEach(decorate);
        node.querySelectorAll('.fragment-wrapper').forEach((el) => {
          addedObserver.observe(el, { childList: true });
        });
      });
    });
  });

  document.querySelectorAll('body, header, footer, main, .fragment-wrapper').forEach((el) => {
    addedObserver.observe(el, { childList: true });
  });

  document.querySelectorAll('[data-block-status="loaded"],[data-section-status="loaded"]').forEach(decorate);
}

/**
 * GTM Martech plugin.
 */
class GtmMartech {
  /**
   * Create a new GtmMartech instance.
   * @param {GtmMartechConfig} martechConfig
   */
  constructor(martechConfig = {}) {
    if (typeof martechConfig.tags === 'string') {
      // eslint-disable-next-line no-param-reassign
      martechConfig.tags = [martechConfig.tags];
    }
    if (typeof martechConfig.containers === 'string') {
      // eslint-disable-next-line no-param-reassign
      martechConfig.containers = { lazy: [martechConfig.containers], delayed: [] };
    } else if (Array.isArray(martechConfig.containers)) {
      // eslint-disable-next-line no-param-reassign
      martechConfig.containers = { lazy: martechConfig.containers, delayed: [] };
    }

    // eslint-disable-next-line no-console
    console.assert(martechConfig.tags?.length > 0, 'No GA4 tag provided.');

    this.config = { ...DEFAULT_CONFIG, ...martechConfig };

    const gtagConfigProvided = Object.hasOwn(martechConfig, 'gtagConfig');
    const pageMetadataProvided = Object.hasOwn(martechConfig, 'pageMetadata');
    if (gtagConfigProvided && pageMetadataProvided) {
      // eslint-disable-next-line no-console
      console.warn(
        'aem-gtm-martech: Both gtagConfig and pageMetadata are set; using gtagConfig. pageMetadata is deprecated; use gtagConfig only.',
      );
    }
    if (gtagConfigProvided) {
      this.config.gtagConfig = martechConfig.gtagConfig ?? {};
    } else {
      this.config.gtagConfig = this.config.pageMetadata ?? {};
    }

    this.dataLayer = initDataLayer(this.config.dataLayerInstanceName);
    if (this.config.consent) {
      window.gtag('consent', 'default', DEFAULT_CONSENT);
    }
    window.gtag('js', new Date());
    this.config.tags.forEach((tag) => {
      window.gtag('config', tag, this.config.gtagConfig);
    });
  }

  async eager() {
    if (this.config.analytics) {
      initGa(this.config.dataLayerInstanceName, this.config.tags);
    } else {
      // eslint-disable-next-line no-console
      console.warn('Analytics is disabled in the martech config');
    }
  }

  async lazy() {
    if (this.config.consent) {
      this.config.consentCallback().then((consentConfig) => {
        if (consentConfig !== undefined) {
          this.updateUserConsent(consentConfig);
        }
      });
    }
    this.pushToDataLayer({ event: 'gtm.js', 'gtm.start': Date.now() });
    loadGtm.bind(this)('lazy');
    if (this.config.decorateCallback) {
      observeElements(this.config.decorateCallback);
    }
  }

  async delayed() {
    loadGtm.bind(this)('delayed');
  }

  pushToDataLayer(payload) {
    this.dataLayer.push(payload);
  }

  // eslint-disable-next-line class-methods-use-this
  updateUserConsent(consentConfig) {
    window.gtag('consent', 'update', consentConfig);
  }
}

export default GtmMartech;
