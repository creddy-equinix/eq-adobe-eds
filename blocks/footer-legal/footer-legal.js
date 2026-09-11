/**
 * Authoring-only block. Parsed by blocks/footer/footer.js from /{locale}/footer.
 */
export default function decorate(block) {
  block.closest('.section')?.classList.add('footer-nav-section');
}
