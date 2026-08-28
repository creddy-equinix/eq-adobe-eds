export default function decorateNavigationFooter() {
    const footerToggles = document.querySelectorAll('[data-role="footer-toggle"]');
    const breakpoint = window.matchMedia('(max-width: 980px)'); // Update breakpoint
    function setupToggleBehavior(enable) {
        footerToggles.forEach((button, index) => {
            const list = button.nextElementSibling;
            const caret = button.querySelector('[data-role="caret"]');
            const isFirst = index === 0;
            if (!list || list.tagName.toLowerCase() !== 'ul') return;
            if (enable) {
                list.style.overflow = 'hidden';
                list.style.transition = 'height 0.3s ease';
                list.style.height = isFirst ? list.scrollHeight + 'px' : '0px';
                list.dataset.visible = String(isFirst);
                list.setAttribute('aria-expanded', String(isFirst)); // Apply to <ul>
                // initial caret rotation
                if (isFirst) caret?.classList.toggle('tw:rotate-180');
                // Prevent duplicate listeners
                button._listener && button.removeEventListener('click', button._listener);
                button._listener = () => {
                    const isVisible = list.dataset.visible === 'true';
                    if (isVisible) {
                        list.style.height = list.scrollHeight + 'px';
                        requestAnimationFrame(() => {
                            list.style.height = '0px';
                        });
                        list.dataset.visible = 'false';
                        list.setAttribute('aria-expanded', 'false');
                    } else {
                        list.style.height = list.scrollHeight + 'px';
                        list.dataset.visible = 'true';
                        list.setAttribute('aria-expanded', 'true');

                        const onTransitionEnd = () => {
                            list.style.height = 'auto';
                            list.removeEventListener('transitionend', onTransitionEnd);
                        };
                        list.addEventListener('transitionend', onTransitionEnd);
                    }
                    caret?.classList.toggle('tw:rotate-180');
                };
                button.addEventListener('click', button._listener);
            } else {
                // Disable toggle behavior and show all
                list.style.transition = '';
                list.style.height = 'auto';
                list.style.overflow = '';
                list.dataset.visible = 'true';
                list.setAttribute('aria-expanded', 'true');

                if (button._listener) {
                    button.removeEventListener('click', button._listener);
                    delete button._listener;
                }
            }

        });
    }

    // Initial setup
    setupToggleBehavior(breakpoint.matches);

    // Respond to viewport changes
    breakpoint.addEventListener('change', (e) => {
        setupToggleBehavior(e.matches);
    });

 
    // Remove the parent default aem generated div
    const footer = document.getElementById('footer-primary');
        if (footer) {
            const parent = footer.parentNode;
            if (parent && parent.nodeName === 'DIV') {
                const grandparent = parent.parentNode;
                // Move all children of parent to grandparent
                while (parent.firstChild) {
                    grandparent.insertBefore(parent.firstChild, parent);
                }
                grandparent.removeChild(parent);
                // If grandparent is also a <div>, unwrap it too
                if (grandparent.nodeName === 'DIV') {
                    const greatGrandparent = grandparent.parentNode;
                    while (grandparent.firstChild) {
                        greatGrandparent.insertBefore(grandparent.firstChild, grandparent);
                    }
                    greatGrandparent.removeChild(grandparent);
                }
            }
        }
        
}
