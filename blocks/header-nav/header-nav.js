/**
 * Authoring-only block. Parsed by blocks/header/header.js from /{locale}/nav.
 */
export default function decorate(block) {
  block.closest('.section')?.classList.add('header-nav-section');
}
