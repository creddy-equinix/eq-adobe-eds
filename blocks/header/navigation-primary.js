/**
 * Binds Equinix primary navigation interactions (scroll, mobile nav, dropdowns).
 * Call after the header DOM has been rendered.
 */
export default function decorateNavigation() {
  const header = document.getElementById('header-primary');
  const announcement = document.getElementById('announcement') || undefined;
  const headerFloat = document.getElementById('header-float');
  const navBtnOpen = document.querySelector('[data-role="navigation-open-toggle"]');
  const navBtnClose = document.querySelector('[data-role="navigation-close-toggle"]');
  const navPrimary = document.getElementById('nav-primary');
  const navPrimaryChildren = document.querySelectorAll('#nav-primary [data-role="navigation-children"]');
  const navPrimaryCaret = document.querySelectorAll('#nav-primary a[data-children="true"] [data-role="caret"]');
  const navLang = document.getElementById('language-list');
  const navLangBtn = document.querySelector('[data-role="language-select-toggle"]');
  const navLangBtnCaret = document.querySelector('[data-role="language-select-toggle"] [data-role="caret"]');
  const offCanvasBtn = document.getElementById('off-canvas');
  const navLinks = document.querySelectorAll('#nav-primary a[data-children="true"]');
  const html = document.documentElement;

  if (!header || !headerFloat || !navPrimary || header.dataset.navPrimaryBound) return;
  header.dataset.navPrimaryBound = 'true';

  let topOffset = 60; // Default header height as fallback
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    // Check for header or header and announcement and offset as needed
    if (header && announcement) {
      topOffset = header.offsetHeight + announcement.offsetHeight;
    } else {
      topOffset = header.offsetHeight;
    }

    const currentScrollY = window.scrollY || window.pageYOffset;
    const isScrollingUp = currentScrollY < lastScrollY;
    const isAtTop = currentScrollY === 0;
    const isNearTop = currentScrollY <= topOffset;

    // Next 3 lines are for Safari's benefit and users who scroll really fast
    headerFloat.classList.remove('tw:shadow-lg', 'tw:dark:outline-1', 'tw:dark:outline-neutral-800');
    header.classList.add('tw:bg-canvas', 'tw:shadow-sm');
    header.classList.remove('tw:translate-y-3');

    if (isAtTop) {
      header.classList.remove('tw:sticky', 'tw:translate-y-3', 'tw:-translate-y-full', 'tw:scroll-marker');
      navPrimary.classList.add('tw:pt-1.5', 'tw:bg-canvas', 'tw:shadow-sm');
      navPrimary.classList.remove('tw:max-nav:-translate-y-3', 'tw:pt-3');
    } else if (isNearTop) {
      header.classList.add('tw:bg-canvas', 'tw:shadow-sm');
      header.classList.remove('tw:translate-y-3');
      headerFloat.classList.remove('tw:shadow-lg', 'tw:dark:outline-1', 'tw:dark:outline-neutral-800');
      navPrimary.classList.add('tw:pt-1.5');
      navPrimary.classList.remove('tw:max-nav:-translate-y-3', 'tw:pt-3');
    } else if (isScrollingUp) {
      header.classList.remove('tw:-translate-y-full', 'tw:bg-canvas', 'tw:shadow-sm');
      header.classList.add('tw:sticky', 'tw:translate-y-3', 'tw:scroll-marker');
      headerFloat.classList.add('tw:shadow-lg', 'tw:dark:outline-1', 'tw:dark:outline-neutral-800');
    } else {
      header.classList.remove('tw:translate-y-3', 'tw:bg-canvas');
      header.classList.add('tw:-translate-y-full', 'tw:scroll-marker');
      headerFloat.classList.remove('tw:shadow-lg', 'tw:dark:outline-1', 'tw:dark:outline-neutral-800');
      navPrimary.classList.add('tw:pt-3', 'tw:max-nav:-translate-y-3');
      navPrimary.classList.remove('tw:max-nav:translate-y-0', 'tw:pt-1.5');
    }

    lastScrollY = currentScrollY;
  });

  const closeMobileNav = () => {
    if (offCanvasBtn) offCanvasBtn.classList.add('tw:hidden');
    headerFloat.classList.add('tw:backdrop-blur-xs');
    navPrimary.classList.add('tw:hidden');
    html.classList.remove('tw:no-scroll');
    navPrimary.setAttribute('aria-expanded', false);
  };

  if (navBtnOpen) {
    navBtnOpen.addEventListener('click', () => {
      if (offCanvasBtn) offCanvasBtn.classList.remove('tw:hidden');
      headerFloat.classList.remove('tw:backdrop-blur-xs');
      navPrimary.classList.remove('tw:hidden');
      html.classList.add('tw:no-scroll');
      navPrimary.setAttribute('aria-expanded', true);
    });
  }

  if (navBtnClose) {
    navBtnClose.addEventListener('click', closeMobileNav);
  }

  if (offCanvasBtn) {
    offCanvasBtn.addEventListener('click', () => {
      closeMobileNav();
      navPrimaryChildren.forEach((child) => { child.classList.add('tw:hidden'); });
      navPrimaryCaret.forEach((caret) => { caret.classList.remove('tw:rotate-180'); });
      if (navLang) navLang.classList.add('tw:hidden');
      if (navLangBtnCaret) navLangBtnCaret.classList.remove('tw:rotate-180');
      navLinks.forEach((child) => { child.setAttribute('aria-expanded', 'false'); });
    });
  }

  if (navLangBtn && navLang) {
    navLangBtn.addEventListener('click', () => {
      const isOpen = !navLang.classList.toggle('tw:hidden');
      if (navLangBtnCaret) navLangBtnCaret.classList.toggle('tw:rotate-180', isOpen);
      navLang.setAttribute('aria-expanded', isOpen);
      navPrimaryChildren.forEach((child) => { child.classList.add('tw:hidden'); });
      navPrimaryCaret.forEach((caret) => { caret.classList.remove('tw:rotate-180'); });
      navLinks.forEach((child) => { child.setAttribute('aria-expanded', 'false'); });
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      let targetChild = link.nextElementSibling;
      while (targetChild && targetChild.getAttribute('data-role') !== 'navigation-children') {
        targetChild = targetChild.nextElementSibling;
      }

      if (!targetChild) return;

      const isOpen = !targetChild.classList.contains('tw:hidden');

      navPrimaryChildren.forEach((child) => {
        child.classList.add('tw:hidden');

        let prev = child.previousElementSibling;
        while (prev && prev.tagName !== 'A') {
          prev = prev.previousElementSibling;
        }

        if (prev && prev.hasAttribute('data-children')) {
          prev.setAttribute('aria-expanded', 'false');
        }
      });

      navPrimaryCaret.forEach((caret) => {
        caret.classList.remove('tw:rotate-180');
      });

      if (navLang) navLang.classList.add('tw:hidden');
      if (navLangBtnCaret) navLangBtnCaret.classList.remove('tw:rotate-180');
      if (navLang) navLang.setAttribute('aria-expanded', 'false');

      if (!isOpen) {
        targetChild.classList.remove('tw:hidden');
        link.setAttribute('aria-expanded', 'true');
        const caret = link.querySelector('[data-role="caret"]');
        if (caret) caret.classList.add('tw:rotate-180');
      } else {
        link.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      navPrimaryChildren.forEach((child) => child.classList.add('tw:hidden'));
      navPrimaryCaret.forEach((caret) => caret.classList.remove('tw:rotate-180'));
      navLinks.forEach((link) => link.setAttribute('aria-expanded', 'false'));
      if (navLang) navLang.classList.add('tw:hidden');
      if (navLangBtnCaret) navLangBtnCaret.classList.remove('tw:rotate-180');
      if (navLang) navLang.setAttribute('aria-expanded', 'false');
    }
  });

  const observer = new MutationObserver(() => {

    if (
        header &&
        header.parentNode &&
        header.parentNode.parentNode &&
        header.parentNode.parentNode.parentNode &&
        header.parentNode.parentNode.parentNode.parentNode &&
        header.parentNode.parentNode.parentNode.parentNode.nodeType === 1
    ) {
        const parentDiv = header.parentNode;
        const grandParent = parentDiv.parentNode;
        const greatGrandParent = grandParent.parentNode;
        const greatGreatGrandParent = greatGrandParent.parentNode;

        // Move all children of parentDiv to greatGreatGrandParent before greatGrandParent
        while (parentDiv.firstChild) {
            greatGreatGrandParent.insertBefore(parentDiv.firstChild, greatGrandParent);
        }

        // Remove parent, grandparent, and greatGrandParent
        grandParent.removeChild(parentDiv);
        greatGrandParent.removeChild(grandParent);
        greatGreatGrandParent.removeChild(greatGrandParent);
    }

    // Disconnect observer only if all target elements are processed
    const headerRemoved = !document.getElementById('header-primary');

    if (headerRemoved) {
        observer.disconnect();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
}
