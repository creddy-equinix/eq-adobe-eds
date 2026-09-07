/* eslint-disable max-len */

import decorateNavigation from './navigation-primary.js';

const HEADER_MARKUP = `
<header id="header-primary" lang="" dir="" data-theme="" data-component="header" class="tw:bg-canvas tw:shadow-sm tw:relative tw:px-4 tw:text-sm-fixed tw:text-primary tw:top-0 tw:transition-transform tw:duration-200 tw:ease-linear tw:z-190 tw:will-change tw:header:px-0">
  <div id="header-float" class="tw:wrapper tw:px-0 tw:bg-white/95 tw:rounded-md tw:will-change tw:backdrop-blur-xs tw:dark:bg-black/90">
    <div class="tw:px-4 tw:flex tw:flex-row tw:items-center tw:justify-between tw:header:px-8">
      <a href="/" rel="home" class="tw:text-primary tw:focus:outline-0 tw:focus-visible:outline-1 tw:focus-visible:outline-violet tw:flex tw:flex-col tw:justify-center tw:py-4 tw:w-[41px] tw:overflow-hidden tw:logo:w-[145px] tw:dark:focus-visible:outline-violet-100" aria-label="Equinix Logo" title="Equinix Logo">
        <svg class="tw:logo-prime tw:rtl:scale-x-[-1] tw:rtl:nav:scale-x-100" alt="Equinix Logo" aria-label="Equinix logo" role="img" width="145" height="22" viewBox="0 0 311 44" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path id="eqx-branded-fortress" d="M33.7007 0L26.9606 2.34754V37.6729L22.4672 36.111V3.9188L8.98687 8.61856V31.4065L4.49811 29.8399V10.1851L0 11.7564V33.0292L13.4803 37.729V11.8078L17.9784 10.2413V39.3002L31.4587 44V5.53683L33.7007 4.7512L35.9475 5.53683V44L49.4371 39.3002V10.2413L53.9212 11.8078V37.729L67.4015 33.0292V11.7564L62.9081 10.1851V29.8399L58.4193 31.4065V8.61856L44.9343 3.9188V36.111L40.4409 37.6729V2.34754L33.7007 0Z" fill="url(#eqxGradient)"></path>
            <path d="M79.8333 31.5421C82.0894 31.5421 83.8774 29.6809 83.8774 27.4737V27.4503C83.8774 25.2431 82.1081 23.4006 79.8333 23.4006C77.5726 23.4006 75.7846 25.2618 75.7846 27.4737V27.4971C75.7846 29.6996 77.5538 31.5421 79.8333 31.5421ZM79.8333 31.0979C77.7879 31.0979 76.2526 29.4705 76.2526 27.4971V27.4737C76.2526 25.4956 77.8113 23.8495 79.8333 23.8495C81.8788 23.8495 83.414 25.4769 83.414 27.4503V27.4737C83.414 29.4471 81.8554 31.0979 79.8333 31.0979ZM79.1827 29.4939V28.1658H79.8333L80.7414 29.4939H81.9724L80.9052 27.9834C81.4622 27.7964 81.832 27.3568 81.832 26.6834C81.832 25.7341 81.1111 25.2852 80.1282 25.2852H78.153V29.4939H79.1827ZM79.1827 27.3334V26.169H80.0627C80.5027 26.169 80.7835 26.3794 80.7835 26.7489C80.7835 27.0996 80.5307 27.3287 80.0627 27.3287H79.1827V27.3334Z" fill="#E91C24"></path>
          </g>
          <g class="tw:translate-x-3">
            <path class="tw:hidden tw:logo:block" d="M95.0437 22.6011H105.051V19.7953H95.0437V13.744H109.966V10.9476H92.02V32.3139H110.495V29.5548H95.0437V22.6011Z" fill="currentColor"></path>
            <path class="tw:hidden tw:logo:block" d="M141.022 21.619C141.022 24.6353 140.076 26.5994 138.349 28.2782L136.739 26.3562L133.294 26.3515L136.116 29.6951C135.428 30.0365 134.183 30.3124 133.214 30.3218C128.782 30.3545 125.253 26.6602 125.253 21.6424V21.5629C125.253 16.4563 128.557 12.8415 133.013 12.8181C137.469 12.7807 141.017 16.4563 141.017 21.5302V21.619H141.022ZM133.083 10.0824C126.914 10.1245 122.159 14.9412 122.159 21.6658V21.7453C122.159 28.4278 127.031 33.1323 133.154 33.0902C134.726 33.0762 136.589 32.6553 137.979 31.9117L139.669 33.9179L143.128 33.9132L140.17 30.42C142.59 28.5167 144.116 25.3789 144.116 21.5068V21.4226C144.116 14.7822 139.224 10.0357 133.083 10.0824Z" fill="currentColor"></path>
            <path class="tw:hidden tw:logo:block" d="M173.997 23.7982C173.997 27.6142 171.549 30.1394 167.912 30.1394C164.383 30.1394 162.174 27.5861 162.174 23.7982V11.0037H159.178V23.9432C159.178 29.77 163.255 32.9452 167.889 32.9452C174.737 32.9452 176.96 28.1192 176.96 23.9432V11.0037H173.997V23.7982Z" fill="currentColor"></path>
            <path class="tw:hidden tw:logo:block" d="M196.6 10.9476H193.628V32.3139H196.6V10.9476Z" fill="currentColor"></path>
            <path class="tw:hidden tw:logo:block" d="M232.079 27.689L217.391 10.9476H214.452V32.3139H217.42V15.4369L232.14 32.3139H235.042V10.9476H232.079V27.689Z" fill="currentColor"></path>
            <path class="tw:hidden tw:logo:block" d="M256.03 10.9476H253.063V32.3139H256.03V10.9476Z" fill="currentColor"></path>
            <path class="tw:hidden tw:logo:block" d="M284.929 20.7212L293.55 10.9242H289.886L283.042 18.6075L276.386 10.9242H272.506L280.819 20.7259L270.419 32.3092H274.219L282.748 22.7975L290.883 32.3092H295.001L284.929 20.7212Z" fill="currentColor"></path>
          </g>
          <defs>
            <linearGradient id="eqxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#e91c24" stop-opacity="1"></stop>
              <stop offset="25%" stop-color="#e91c24" stop-opacity="1"></stop>
              <stop offset="50%" stop-color="#e91c24" stop-opacity="1"></stop>
              <stop offset="75%" stop-color="#e91c24" stop-opacity="1"></stop>
              <stop offset="100%" stop-color="#e91c24" stop-opacity="1"></stop>
            </linearGradient>
          </defs>
        </svg>
      </a>
      <nav id="nav-primary" aria-expanded="false" data-component="navigation/primary" class="tw:z-200 tw:flex tw:flex-col tw:p-6 tw:pt-1.5 tw:bg-canvas tw:border-s tw:border-offset tw:shadow-2xl tw:hidden tw:will-change tw:max-nav:overflow-y-scroll tw:max-nav:w-3/4 tw:max-nav:end-0 tw:max-nav:top-0 tw:max-nav:fixed tw:max-nav:h-dvh tw:max-nav:translate-y-0 tw:nav:border-s-0 tw:nav:flex tw:nav:items-start tw:nav:bg-transparent tw:nav:p-0 tw:nav:relative tw:nav:grow-1 tw:nav:px-5 tw:nav:shadow-none tw:logo:items-center">
        <div class="tw:flex tw:flex-col">
          <button data-role="navigation-close-toggle" aria-controls="nav-primary" class="tw:self-end tw:text-secondary tw:w-12 tw:h-12 tw:p-3.5 tw:translate-x-4 tw:rtl:-translate-x-4 tw:cursor-pointer tw:nav:hidden">
            <span class="tw:sr-only">Close navigation</span>
            <svg class="e-cross" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18.3525 3.95062C18.8212 3.48187 19.5825 3.48187 20.0512 3.95062C20.52 4.41937 20.52 5.18062 20.0512 5.64937L13.6987 11.9981L20.0475 18.3506C20.5162 18.8194 20.5162 19.5806 20.0475 20.0494C19.5787 20.5181 18.8175 20.5181 18.3487 20.0494L12 13.6969L5.64748 20.0456C5.17873 20.5144 4.41748 20.5144 3.94873 20.0456C3.47998 19.5769 3.47998 18.8156 3.94873 18.3469L10.3012 11.9981L3.95248 5.64562C3.48373 5.17687 3.48373 4.41937 3.95248 3.95062C4.42123 3.48187 5.18248 3.48187 5.65123 3.95062L12 10.2994L18.3525 3.95062Z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
        <ul class="tw:list-none tw:flex tw:flex-col tw:nav:flex-row tw:nav:gap-3 tw:logo:gap-5">
          <li data-role="parent" data-section="product-solutions" class="tw:relative tw:max-nav:border-b tw:border-offset tw:last-of-type:border-0">
            <a href="/product-solutions" aria-label="Products &amp; solutions" class="tw:nav-link nav-primary tw:text-primary tw:aria-expanded:text-violet tw:dark:aria-expanded:text-violet-100" aria-controls="navigation-product-solutions" data-children="true">
              Products &amp; solutions
              <span data-role="caret" class="tw:w-3 tw:h-3 tw:transition-transform tw:duration-75 tw:flex">
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
            <div id="navigation-product-solutions" data-role="navigation-children" data-parent="product-solutions" class="tw:dropdown tw:hidden tw:divide-neutral-200 tw:dark:divide-neutral-700 tw:nav:start-0 tw:nav:-translate-x-1.5 tw:rtl:nav:translate-x-1.5 tw:nav:divide-x-1 tw:divide-solid">
              <ul class="tw:no-list tw:w-full tw:nav:self-stretch tw:nav:pe-5 tw:nav:w-auto tw:nav:min-w-36 tw:nav:max-w-2xs">
                <li>
                  <a href="/product-solutions" aria-label="All Solutions" role="link" title="All Solutions" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>All Solutions</span>
                  </a>
                </li>
                <li>
                  <a href="/product-solutions/ai" aria-label="AI" role="link" title="AI" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>AI</span>
                  </a>
                </li>
                <li>
                  <a href="/product-solutions/cloud" aria-label="Cloud" role="link" title="Cloud" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Cloud</span>
                  </a>
                </li>
                <li>
                  <a href="/product-solutions/data-center" aria-label="Data Center" role="link" title="Data Center" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Data Center</span>
                  </a>
                </li>
                <li>
                  <a href="/product-solutions/networking" aria-label="Networking" role="link" title="Networking" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Networking</span>
                  </a>
                </li>
                <li>
                  <a href="/product-solutions/sovereignty" aria-label="Sovereignty" role="link" title="Sovereignty" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Sovereignty</span>
                  </a>
                </li>
              </ul>
              <div class="tw:gap-3 tw:flex-col tw:w-full tw:pb-2 tw:flex tw:nav:w-auto tw:nav:pb-0 tw:nav:max-w-2xs">
                <ul class="tw:no-list tw:w-full tw:nav:w-auto tw:nav:self-stretch">
                  <li class="tw:text-xs-fixed tw:heading tw:text-secondary tw:p-1.5 tw:hidden tw:nav:block">Products</li>
                  <li>
                    <a href="/product-solutions/colocation" aria-label="Colocation" role="link" title="Colocation" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>Colocation</span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">Deploy inside the world's most reliable and interconnected data centers. </span>
                    </a>
                  </li>
                  <li>
                    <a href="/product-solutions/connectivity" aria-label="Connectivity" role="link" title="Connectivity" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>Connectivity</span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">High-performance interconnection built for scale. </span>
                    </a>
                  </li>
                  <li>
                    <a href="/product-solutions/managed-solutions" aria-label="Managed Solutions" role="link" title="Managed Solutions" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>Managed Solutions</span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">Deploy private cloud infrastructure at the heart of the internet.</span>
                    </a>
                  </li>
                </ul>
                <a href="/product-solutions/fabric-intelligence-signup" title="See how with Fabric Intelligence" aria-label="See how with Fabric Intelligence" data-theme="light" data-component="navigation/promotion" class="tw:relative tw:hidden tw:flex-col tw:items-start tw:gap-2 tw:p-4 tw:rounded-sm tw:overflow-hidden tw:bg-linear-120 tw:nav:flex tw:hover:underline tw:focus:outline-0 tw:focus-visible:outline-1 tw:focus-visible:outline-violet tw:hover:dark:text-white tw:focus:dark:text-white tw:focus-visible:dark:outline-violet-100 tw:from-aqua-100 tw:via-purple-100 tw:to-orange-100 tw:dark:from-blue-900 tw:dark:via-purple tw:dark:to-red">
                  <div class="tw:absolute tw:top-0 tw:end-0 tw:opacity-30 tw:h-full">
                    <img alt="" loading="lazy" class="tw:object-cover tw:h-full tw:w-auto" decoding="async" data-graphic="promotion" src="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-interconnection.png" width="560" height="560" srcset="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-interconnection.png 400w, https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-interconnection.png  560w" sizes="100vw">
                  </div>
                  <p class="tw:text-sm-fixed tw:relative tw:heading tw:text-primary">
                    Transform your network with AI-driven automation.
                  </p>
                  <span class="tw:text-xs-fixed tw:text-primary tw:flex tw:flex-row tw:items-center tw:gap-0.5">
                    See how with Fabric Intelligence
                    <span class="tw:w-3 tw:h-3">
                      <svg class="e-arrow-right" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.7935 4.3522C11.9341 4.17638 12.2154 4.17638 12.3912 4.3522L19.7402 11.7012C19.916 11.877 19.916 12.1231 19.7402 12.2989L12.3912 19.6479C12.2154 19.8237 11.9341 19.8237 11.7935 19.6479L11.0902 18.9798C10.9144 18.804 10.9144 18.5227 11.0902 18.382L16.5404 12.8967H4.55C4.30386 12.8967 4.12805 12.7209 4.12805 12.4747V11.4902C4.12805 11.2792 4.30386 11.0682 4.55 11.0682H16.5404L11.0902 5.61805C10.9144 5.4774 10.9144 5.1961 11.0902 5.02028L11.7935 4.3522Z" fill="currentColor"></path>
                      </svg>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </li>
          <li data-role="parent" data-section="industries" class="tw:relative tw:max-nav:border-b tw:border-offset tw:last-of-type:border-0">
            <a href="/industries" aria-label="Use cases" class="tw:nav-link nav-primary tw:text-primary tw:aria-expanded:text-violet tw:dark:aria-expanded:text-violet-100" aria-controls="navigation-industries" data-children="true">
              Use cases
              <span data-role="caret" class="tw:w-3 tw:h-3 tw:transition-transform tw:duration-75 tw:flex">
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
            <div id="navigation-industries" data-role="navigation-children" data-parent="industries" class="tw:dropdown tw:hidden tw:divide-neutral-200 tw:dark:divide-neutral-700 tw:nav:start-0 tw:nav:-translate-x-1.5 tw:rtl:nav:translate-x-1.5 tw:nav:divide-x-1 tw:divide-solid">
              <ul class="tw:no-list tw:w-full tw:nav:self-stretch tw:nav:pe-5 tw:nav:w-auto tw:nav:min-w-36 tw:nav:max-w-2xs">
                <li>
                  <a href="/industries/financial-services" aria-label="Financial Services " role="link" title="Financial Services " class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Financial Services </span>
                  </a>
                </li>
                <li>
                  <a href="/industries/technology-software-companies" aria-label="High Tech " role="link" title="High Tech " class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>High Tech </span>
                  </a>
                </li>
                <li>
                  <a href="/industries/public-sector" aria-label="Public Sector " role="link" title="Public Sector " class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Public Sector </span>
                  </a>
                </li>
                <li>
                  <a href="/industries/network-service-providers" aria-label="Network Service Providers " role="link" title="Network Service Providers " class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Network Service Providers </span>
                  </a>
                </li>
              </ul>
              <div class="tw:gap-3 tw:flex-col tw:w-full tw:pb-2 tw:flex tw:nav:w-auto tw:nav:pb-0 tw:nav:max-w-2xs">
                <ul class="tw:no-list tw:w-full tw:nav:w-auto tw:nav:self-stretch">
                  <li class="tw:text-xs-fixed tw:heading tw:text-secondary tw:p-1.5 tw:hidden tw:nav:block">Teams</li>
                  <li>
                    <a href="/teams/ai-leaders" aria-label="AI Leaders" role="link" title="AI Leaders" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>AI Leaders</span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">Accelerate AI with globally distributed infrastructure. </span>
                    </a>
                  </li>
                  <li>
                    <a href="/teams/cloud-architects" aria-label="Cloud Architects " role="link" title="Cloud Architects " class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>Cloud Architects </span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">Build across any cloud without lock-in. </span>
                    </a>
                  </li>
                  <li>
                    <a href="/teams/infrastructure-leaders" aria-label="Infrastructure Leaders " role="link" title="Infrastructure Leaders " class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>Infrastructure Leaders </span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">Transform legacy data centers with reliable and secure infrastructure. </span>
                    </a>
                  </li>
                  <li>
                    <a href="/teams/network-architects" aria-label="Network Architects " role="link" title="Network Architects " rel="external noreferrer noopener" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5" target="_blank">
                      <span>Network Architects </span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">Simplify hybrid multicloud networking with private, API‑driven connectivity.</span>
                    </a>
                  </li>
                </ul>
                <a href="https://www.equinix.com/lp/equinix-sovereignty" title="Explore Digital Sovereignty" aria-label="Explore Digital Sovereignty" data-theme="dark" data-component="navigation/promotion" class="tw:relative tw:hidden tw:flex-col tw:items-start tw:gap-2 tw:p-4 tw:rounded-sm tw:overflow-hidden tw:bg-linear-120 tw:nav:flex tw:hover:underline tw:focus:outline-0 tw:focus-visible:outline-1 tw:focus-visible:outline-violet tw:hover:dark:text-white tw:focus:dark:text-white tw:focus-visible:dark:outline-violet-100 tw:from-blue-900 tw:via-purple tw:to-red">
                  <div class="tw:absolute tw:top-0 tw:end-0 tw:opacity-30 tw:h-full">
                    <img alt="" loading="lazy" class="tw:object-cover tw:h-full tw:w-auto" decoding="async" data-graphic="promotion" src="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-Cloud_hero_square.png" width="560" height="560" srcset="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-Cloud_hero_square.png 400w, https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-Cloud_hero_square.png  560w" sizes="100vw">
                  </div>
                  <p class="tw:text-sm-fixed tw:relative tw:heading tw:text-primary">
                    Keep data local. Scale globally. Stay compliant.
                  </p>
                  <span class="tw:text-xs-fixed tw:text-primary tw:flex tw:flex-row tw:items-center tw:gap-0.5">
                    Explore Digital Sovereignty
                    <span class="tw:w-3 tw:h-3">
                      <svg class="e-arrow-right" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.7935 4.3522C11.9341 4.17638 12.2154 4.17638 12.3912 4.3522L19.7402 11.7012C19.916 11.877 19.916 12.1231 19.7402 12.2989L12.3912 19.6479C12.2154 19.8237 11.9341 19.8237 11.7935 19.6479L11.0902 18.9798C10.9144 18.804 10.9144 18.5227 11.0902 18.382L16.5404 12.8967H4.55C4.30386 12.8967 4.12805 12.7209 4.12805 12.4747V11.4902C4.12805 11.2792 4.30386 11.0682 4.55 11.0682H16.5404L11.0902 5.61805C10.9144 5.4774 10.9144 5.1961 11.0902 5.02028L11.7935 4.3522Z" fill="currentColor"></path>
                      </svg>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </li>
          <li data-role="parent" data-section="resources" class="tw:relative tw:max-nav:border-b tw:border-offset tw:last-of-type:border-0">
            <a href="/resources" aria-label="Resources" class="tw:nav-link nav-primary tw:text-primary tw:aria-expanded:text-violet tw:dark:aria-expanded:text-violet-100" aria-controls="navigation-resources" data-children="true">
              Resources
              <span data-role="caret" class="tw:w-3 tw:h-3 tw:transition-transform tw:duration-75 tw:flex">
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
            <div id="navigation-resources" data-role="navigation-children" data-parent="resources" class="tw:dropdown tw:hidden tw:divide-neutral-200 tw:dark:divide-neutral-700 tw:nav:start-0 tw:nav:-translate-x-1.5 tw:rtl:nav:translate-x-1.5 tw:nav:divide-x-1 tw:xl:start-0">
              <ul class="tw:no-list tw:w-full tw:nav:self-stretch tw:nav:pe-5 tw:nav:w-auto tw:nav:min-w-36 tw:nav:max-w-3xs">
                <li class="tw:last:pb-2 tw:nav:last-pb-0">
                  <a href="/resources" aria-label="All resources" role="link" title="All resources" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>All resources</span>
                  </a>
                </li>
                <li class="tw:last:pb-2 tw:nav:last-pb-0">
                  <a href="/insights/analyst-industry-research" aria-label="Analyst insights" role="link" title="Analyst insights" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Analyst insights</span>
                  </a>
                </li>
                <li class="tw:last:pb-2 tw:nav:last-pb-0">
                  <a href="/insights" aria-label="Insights" role="link" title="Insights" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Insights</span>
                  </a>
                </li>
                <li class="tw:last:pb-2 tw:nav:last-pb-0">
                  <a href="https://blog.equinix.com" aria-label="Interconnections blog" role="link" title="Interconnections blog" rel="external noreferrer noopener" class="tw:nav-link tw:nav-nested tw:nav:px-1.5" target="_blank">
                    <span>Interconnections blog</span>
                  </a>
                </li>
                <li class="tw:last:pb-2 tw:nav:last-pb-0">
                  <a href="/insights/case-studies" aria-label="Case studies" role="link" title="Case studies" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Case studies</span>
                  </a>
                </li>
                <li class="tw:last:pb-2 tw:nav:last-pb-0">
                  <a href="https://docs.equinix.com/" aria-label="Developer docs" role="link" title="Developer docs" rel="external noreferrer noopener" class="tw:nav-link tw:nav-nested tw:nav:px-1.5" target="_blank">
                    <span>Developer docs</span>
                  </a>
                </li>
                <li class="tw:last:pb-2 tw:nav:last-pb-0">
                  <a href="https://community.equinix.com/" aria-label="Community" role="link" title="Community" rel="external noreferrer noopener" class="tw:nav-link tw:nav-nested tw:nav:px-1.5" target="_blank">
                    <span>Community</span>
                  </a>
                </li>
                <li class="tw:last:pb-2 tw:nav:last-pb-0">
                  <a href="https://portal.equinix.com/fabric/marketplace" aria-label="Fabric Marketplace" role="link" title="Fabric Marketplace" rel="external noreferrer noopener" class="tw:nav-link tw:nav-nested tw:nav:px-1.5" target="_blank">
                    <span>Fabric Marketplace</span>
                  </a>
                </li>
              </ul>
              <div class="tw:gap-3 tw:flex-col tw:hidden tw:max-w-2xs tw:nav:flex">
                <ul class="tw:no-list tw:w-full tw:nav:w-auto tw:nav:self-stretch">
                  <li class="tw:text-xs-fixed tw:heading tw:text-secondary tw:p-1.5">What's new?</li>
                  <li>
                    <a href="https://blog.equinix.com/blog/2025/07/17/to-manage-cloud-sprawl-in-the-ai-era-choose-the-right-networking-strategy/?country_selector=Global%20(EN)" aria-label="Manage cloud sprawl in the AI era" role="link" title="Manage cloud sprawl in the AI era" rel="external noreferrer noopener" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5" target="_blank">
                      <span>Manage cloud sprawl in the AI era</span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100">Interconnections blog</span>
                    </a>
                  </li>
                  <li>
                    <a href="/resources/whitepapers/where-edge-meets-ai-opportunities" aria-label="Where edge meets AI opportunity" role="link" title="Where edge meets AI opportunity" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>Where edge meets AI opportunity</span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100">Equinix whitepaper</span>
                    </a>
                  </li>
                </ul>
                <a href="https://blog.equinix.com/blog/2024/10/02/to-get-ai-right-tomorrow-modernize-your-network-today/" title="Read how" aria-label="Read how" rel="external noreferrer noopener" data-theme="light" data-component="navigation/promotion" class="tw:relative tw:hidden tw:flex-col tw:items-start tw:gap-2 tw:p-4 tw:rounded-sm tw:overflow-hidden tw:bg-linear-120 tw:nav:flex tw:hover:underline tw:focus:outline-0 tw:focus-visible:outline-1 tw:focus-visible:outline-violet tw:hover:dark:text-white tw:focus:dark:text-white tw:focus-visible:dark:outline-violet-100 tw:from-aqua-100 tw:via-purple-100 tw:to-orange-100 tw:dark:from-blue-900 tw:dark:via-purple tw:dark:to-red" target="_blank">
                  <div class="tw:absolute tw:top-0 tw:end-0 tw:opacity-30 tw:h-full">
                    <img alt="" loading="lazy" class="tw:object-cover tw:h-full tw:w-auto" decoding="async" data-graphic="promotion" src="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/banner_multicloud_networking.png" width="560" height="560" srcset="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/banner_multicloud_networking.png 400w, https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/banner_multicloud_networking.png  560w" sizes="100vw">
                  </div>
                  <p class="tw:text-sm-fixed tw:relative tw:heading tw:text-primary">
                    To get AI right tomorrow, modernize your network today.
                  </p>
                  <span class="tw:text-xs-fixed tw:text-primary tw:flex tw:flex-row tw:items-center tw:gap-0.5">
                    Read how
                    <span class="tw:w-3 tw:h-3">
                      <svg class="e-arrow-right" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.7935 4.3522C11.9341 4.17638 12.2154 4.17638 12.3912 4.3522L19.7402 11.7012C19.916 11.877 19.916 12.1231 19.7402 12.2989L12.3912 19.6479C12.2154 19.8237 11.9341 19.8237 11.7935 19.6479L11.0902 18.9798C10.9144 18.804 10.9144 18.5227 11.0902 18.382L16.5404 12.8967H4.55C4.30386 12.8967 4.12805 12.7209 4.12805 12.4747V11.4902C4.12805 11.2792 4.30386 11.0682 4.55 11.0682H16.5404L11.0902 5.61805C10.9144 5.4774 10.9144 5.1961 11.0902 5.02028L11.7935 4.3522Z" fill="currentColor"></path>
                      </svg>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </li>
          <li data-role="parent" data-section="data-centers" class="tw:relative tw:max-nav:border-b tw:border-offset tw:last-of-type:border-0">
            <a href="/data-centers" aria-label="Data centers" class="tw:nav-link nav-primary tw:text-primary tw:aria-expanded:text-violet tw:dark:aria-expanded:text-violet-100" aria-controls="navigation-data-centers" data-children="true">
              Data centers
              <span data-role="caret" class="tw:w-3 tw:h-3 tw:transition-transform tw:duration-75 tw:flex">
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
              </span>
            </a>
            <div id="navigation-data-centers" data-role="navigation-children" data-parent="data-centers" class="tw:dropdown tw:hidden tw:divide-neutral-200 tw:dark:divide-neutral-700 tw:nav:start-0 tw:nav:-translate-x-1.5 tw:rtl:nav:translate-x-1.5 tw:nav:divide-x-1 tw:divide-solid">
              <ul class="tw:no-list tw:w-full tw:nav:self-stretch tw:nav:pe-5 tw:nav:w-auto tw:nav:min-w-36 tw:nav:max-w-2xs">
                <li>
                  <a href="/data-centers" aria-label="All locations" role="link" title="All locations" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>All locations</span>
                  </a>
                </li>
                <li>
                  <a href="/data-centers/americas-colocation" aria-label="Americas" role="link" title="Americas" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Americas</span>
                  </a>
                </li>
                <li>
                  <a href="/data-centers/europe-colocation" aria-label="Europe, Middle East &amp; Africa" role="link" title="Europe, Middle East &amp; Africa" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Europe, Middle East &amp; Africa</span>
                  </a>
                </li>
                <li>
                  <a href="/data-centers/asia-pacific-colocation" aria-label="Asia Pacific" role="link" title="Asia Pacific" class="tw:nav-link tw:nav-nested tw:nav:px-1.5">
                    <span>Asia Pacific</span>
                  </a>
                </li>
              </ul>
              <div class="tw:gap-3 tw:flex-col tw:w-full tw:pb-2 tw:flex tw:nav:w-auto tw:nav:pb-0 tw:nav:max-w-2xs">
                <ul class="tw:no-list tw:w-full tw:nav:w-auto tw:nav:self-stretch">
                  <li>
                    <a href="/data-centers/explore" aria-label="Explore" role="link" title="Explore" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>Explore</span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">Learn more about our data centers</span>
                    </a>
                  </li>
                  <li>
                    <a href="/data-centers/expansions" aria-label="Expansions" role="link" title="Expansions" class="tw:group tw:nav-link tw:nav-nested tw:nav:px-1.5">
                      <span>Expansions</span>
                      <span class="tw:text-secondary tw:text-xs-fixed tw:font-normal tw:group-hover:text-violet tw:group-hover:dark:text-violet-100 tw:hidden tw:nav:block">See where Equinix is heading next</span>
                    </a>
                  </li>
                </ul>
                <a href="/data-centers/explore#tours" title="Take a tour" aria-label="Take a tour" data-theme="light" data-component="navigation/promotion" class="tw:relative tw:hidden tw:flex-col tw:items-start tw:gap-2 tw:p-4 tw:rounded-sm tw:overflow-hidden tw:bg-linear-120 tw:nav:flex tw:hover:underline tw:focus:outline-0 tw:focus-visible:outline-1 tw:focus-visible:outline-violet tw:hover:dark:text-white tw:focus:dark:text-white tw:focus-visible:dark:outline-violet-100 tw:from-aqua-100 tw:via-purple-100 tw:to-orange-100 tw:dark:from-blue-900 tw:dark:via-purple tw:dark:to-red">
                  <div class="tw:absolute tw:top-0 tw:end-0 tw:opacity-30 tw:h-full">
                    <img alt="" loading="lazy" class="tw:object-cover tw:h-full tw:w-auto" decoding="async" data-graphic="promotion" src="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-banner-square-towers.png" width="560" height="560" srcset="https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-banner-square-towers.png 400w, https://qa.equinix.com/content/dam/eqxcorp/en_us/images/promo-banner/ila-banner-square-towers.png  560w" sizes="100vw">
                  </div>
                  <p class="tw:text-sm-fixed tw:relative tw:heading tw:text-primary">
                    Get an inside look of Equinix’s state-of-the-art data centers
                  </p>
                  <span class="tw:text-xs-fixed tw:text-primary tw:flex tw:flex-row tw:items-center tw:gap-0.5">
                    Take a tour
                    <span class="tw:w-3 tw:h-3">
                      <svg class="e-arrow-right" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.7935 4.3522C11.9341 4.17638 12.2154 4.17638 12.3912 4.3522L19.7402 11.7012C19.916 11.877 19.916 12.1231 19.7402 12.2989L12.3912 19.6479C12.2154 19.8237 11.9341 19.8237 11.7935 19.6479L11.0902 18.9798C10.9144 18.804 10.9144 18.5227 11.0902 18.382L16.5404 12.8967H4.55C4.30386 12.8967 4.12805 12.7209 4.12805 12.4747V11.4902C4.12805 11.2792 4.30386 11.0682 4.55 11.0682H16.5404L11.0902 5.61805C10.9144 5.4774 10.9144 5.1961 11.0902 5.02028L11.7935 4.3522Z" fill="currentColor"></path>
                      </svg>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </li>
          <li data-role="parent" data-section="partners" class="tw:relative tw:max-nav:border-b tw:border-offset tw:last-of-type:border-0">
            <a href="/partners" aria-label="Partners" class="tw:nav-link nav-primary tw:text-primary tw:aria-expanded:text-violet tw:dark:aria-expanded:text-violet-100" data-children="false">
              Partners
            </a>
          </li>
        </ul>
        <div class="tw:flex tw:flex-col tw:pt-3 tw:gap-3 tw:nav:hidden">
          <a href="https://customerportal.equinix.com" data-component="button" aria-label="Login" class="tw:button tw:cursor-pointer tw:button--primary tw:w-full tw:max-w-full" rel="external noreferrer noopener" target="_blank">
            <span class="tw:button__label">Login</span>
          </a>
          <a href="/contact-us" data-component="button" class="tw:button tw:cursor-pointer tw:button--secondary tw:w-full tw:max-w-full" aria-label="Contact">
            <span class="tw:button__label">Contact</span>
          </a>
        </div>
      </nav>
      <div class="tw:flex tw:flex-row tw:items-center">
        <div data-role="language-select" data-component="navigation/language" class="tw:relative tw:no-js:hidden">
          <button aria-controls="language-list" data-role="language-select-toggle" class="tw:nav-link tw:leading-none tw:font-bold tw:cursor-pointer tw:py-4 tw:h-[60px]">
            <div class="tw:flex tw:flex-row-reverse tw:items-center tw:gap-1 tw:text-end">
              <span data-role="caret" class="tw:w-3 tw:h-3 tw:transition-transform tw:flex tw:duration-75">
                <svg class="e-caret-down" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.1525 16.4493C11.6213 16.9181 12.3825 16.9181 12.8513 16.4493L20.0513 9.24934C20.52 8.78059 20.52 8.01934 20.0513 7.55059C19.5825 7.08184 18.8213 7.08184 18.3525 7.55059L12 13.9031L5.64752 7.55434C5.17877 7.08559 4.41752 7.08559 3.94877 7.55434C3.48002 8.02309 3.48002 8.78434 3.94877 9.25309L11.1488 16.4531L11.1525 16.4493Z" fill="currentColor"></path>
                </svg>
              </span>
              <div class="tw:truncate tw:py-1 tw:hidden tw:nav:block tw:xl:hidden">
                <span class="tw:text-nowrap">EN</span>
              </div>
              <div class="tw:truncate tw:py-1 tw:block tw:nav:hidden tw:xl:block">
                <span class="tw:text-nowrap">English</span>
              </div>
            </div>
          </button>
          <ol id="language-list" data-role="language-list" aria-expanded="false" class="tw:hidden tw:translate-x-4 tw:list-none tw:absolute tw:end-0 tw:top-12 tw:z-90 tw:flex tw:flex-col tw:items-start tw:gap-1 tw:px-4 tw:py-3 tw:bg-white tw:shadow-lg tw:border tw:border-neutral-200 tw:rounded-sm tw:text-neutral-700 tw:min-w-max tw:nav:top-14 tw:dark:border-neutral-700 tw:dark:text-neutral-400 tw:dark:bg-black tw:nav:start-0 tw:nav:end-auto tw:nav:-translate-x-4 tw:rtl:nav:translate-x-4">
            <li class="tw:w-full">
              <a lang="en-US" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4 tw:font-bold tw:text-primary" id="en-US" href="/" aria-label="United States" title="United States" data-analytics-language-nav-link="region:americas;country:united states;language:english">
                English
                <span data-role="check" class="tw:w-3 tw:h-3"><svg class="e-solid-check" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.79926 19.4775L2.31488 12.9932C2.10655 12.8109 2.00238 12.5765 2.00238 12.29C2.00238 12.0036 2.09353 11.7692 2.27582 11.5869L3.72113 10.1807C3.90342 9.97233 4.12478 9.86816 4.38519 9.86816C4.67165 9.86816 4.91905 9.97233 5.12738 10.1807L9.50238 14.5557L18.8774 5.18066C19.0857 4.97233 19.3201 4.86816 19.5805 4.86816C19.867 4.86816 20.1013 4.97233 20.2836 5.18066L21.6899 6.58691C21.8982 6.76921 22.0024 7.00358 22.0024 7.29004C22.0024 7.5765 21.9112 7.81087 21.7289 7.99316L10.2055 19.4775C10.0232 19.6859 9.78884 19.79 9.50238 19.79C9.21592 19.79 8.98155 19.6859 8.79926 19.4775Z" fill="currentColor"></path></svg></span>
              </a>
            </li>
            <li class="tw:w-full">
              <a lang="pt-BR" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4" id="pt-BR" href="/br/pt/" aria-label="Brazil" title="Brazil" data-analytics-language-nav-link="region:americas;country:brazil;language:portuguese">
                Português Brasileiro
              </a>
            </li>
            <li class="tw:w-full">
              <a lang="es-LA" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4" id="es-LA" href="/mx/es/" aria-label="Latin America" title="Latin America" data-analytics-language-nav-link="region:americas;country:laos;language:spanish">
                LATAM Español
              </a>
            </li>
            <li class="tw:w-full">
              <a lang="fr-FR" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4" id="fr-FR" href="/fr/fr/" aria-label="France" title="France" data-analytics-language-nav-link="region:emea;country:france;language:french">
                Français
              </a>
            </li>
            <li class="tw:w-full">
              <a lang="de-DE" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4" id="de-DE" href="/de/de/" aria-label="Germany" title="Germany" data-analytics-language-nav-link="region:emea;country:germany;language:german">
                Deutsch
              </a>
            </li>
            <li class="tw:w-full">
              <a lang="it-IT" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4" id="it-IT" href="/it/it/" aria-label="Italy" title="Italy" data-analytics-language-nav-link="region:emea;country:italy;language:italian">
                Italiano
              </a>
            </li>
            <li class="tw:w-full">
              <a lang="es-ES" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4" id="es-ES" href="/es/es/" aria-label="Spain" title="Spain" data-analytics-language-nav-link="region:emea;country:spain;language:spanish">
                Español
              </a>
            </li>
            <li class="tw:w-full">
              <a lang="ja-JP" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4" id="ja-JP" href="/jp/ja/" aria-label="Japan" title="Japan" data-analytics-language-nav-link="region:asia-pacific;country:japan;language:japanese">
                日本語
              </a>
            </li>
            <li class="tw:w-full">
              <a lang="ko-KR" aria-current="true" class="tw:text-sm-fixed tw:nav-link tw:flex tw:flex-row tw:items-center tw:justify-between tw:py-1 tw:gap-4" id="ko-KR" href="/kr/ko/" aria-label="Korea" title="Korea" data-analytics-language-nav-link="region:asia-pacific;country:south korea;language:korean">
                한국어
              </a>
            </li>
          </ol>
        </div>
        <button data-role="navigation-open-toggle" aria-controls="nav-primary" class="tw:self-end tw:w-12 tw:ps-2 tw:pe-3 tw:py-4 tw:text-primary tw:h-[60px] tw:translate-x-4 tw:rtl:-translate-x-4 tw:cursor-pointer tw:nav:hidden">
          <span class="tw:sr-only">Open navigation</span>
          <svg class="e-menu" role="presentation" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M4.90895 7.72501H19.0911C19.2494 7.72501 19.3738 7.67977 19.4643 7.5893C19.5548 7.49882 19.6 7.37442 19.6 7.21608V5.89287C19.6 5.73454 19.5322 5.61013 19.3965 5.51966C19.2834 5.42918 19.1816 5.38394 19.0911 5.38394H4.90895C4.75062 5.38394 4.62621 5.44049 4.53574 5.55358C4.44526 5.66668 4.40002 5.77977 4.40002 5.89287V7.21608C4.40002 7.32918 4.44526 7.44227 4.53574 7.55537C4.62621 7.66847 4.75062 7.72501 4.90895 7.72501ZM4.90895 13.1875H19.0911C19.2494 13.1875 19.3738 13.1423 19.4643 13.0518C19.5548 12.9387 19.6 12.8143 19.6 12.6786V11.3214C19.6 11.1631 19.5322 11.0387 19.3965 10.9482C19.2834 10.8578 19.1816 10.8125 19.0911 10.8125H4.90895C4.75062 10.8125 4.62621 10.8804 4.53574 11.0161C4.44526 11.1292 4.40002 11.231 4.40002 11.3214V12.6786C4.40002 12.7691 4.44526 12.8822 4.53574 13.0179C4.62621 13.131 4.75062 13.1875 4.90895 13.1875ZM4.90895 18.6161H19.0911C19.2494 18.6161 19.3738 18.5708 19.4643 18.4804C19.5548 18.3899 19.6 18.2655 19.6 18.1072V16.7839C19.6 16.6256 19.5322 16.5012 19.3965 16.4107C19.2834 16.3203 19.1816 16.275 19.0911 16.275H4.90895C4.75062 16.275 4.62621 16.3316 4.53574 16.4447C4.44526 16.5578 4.40002 16.6708 4.40002 16.7839V18.1072C4.40002 18.2203 4.44526 18.3333 4.53574 18.4464C4.62621 18.5595 4.75062 18.6161 4.90895 18.6161Z" fill="currentColor"></path>
          </svg>
        </button>
        <a href="https://customerportal.equinix.com" rel="external noreferrer noopener" role="button" aria-label="Login" class="tw:nav-link tw:hidden tw:flex-col tw:leading-none tw:text-secondary tw:justify-center tw:px-2 tw:py-4 tw:mx-3 tw:h-[60px] tw:nav:flex" data-role="Login" target="_blank">
          Login
        </a>
        <a href="/contact-us" data-component="button" class="tw:button tw:cursor-pointer tw:button--primary tw:button--sm tw:hidden tw:nav:flex" role="button" aria-label="Contact" data-role="Contact">
          <span class="tw:button__label tw:text-sm-fixed">Contact</span>
        </a>
      </div>
    </div>
  </div>
</header>
`;

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const headerEl = block.closest('header') || block;
  const template = document.createElement('div');
  template.innerHTML = HEADER_MARKUP.trim();
  const staticHeader = template.querySelector('#header-primary');
  if (!staticHeader) return;

  Array.from(staticHeader.attributes).forEach((attr) => {
    headerEl.setAttribute(attr.name, attr.value);
  });

  block.replaceChildren(...staticHeader.children);
  decorateNavigation();
}
