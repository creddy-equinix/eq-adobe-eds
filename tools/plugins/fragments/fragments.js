// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';
// eslint-disable-next-line import/no-unresolved
import { crawl } from 'https://da.live/nx/public/utils/tree.js';
// eslint-disable-next-line import/no-unresolved
import { DA_ORIGIN } from 'https://da.live/nx/public/utils/constants.js';

// Base path for fragments
const FRAGMENTS_BASE = '/fragments';

// Add constants at the top
const CONSTANTS = {
  AUTO_HIDE_DELAY: 1000,
  CRAWL_THROTTLE: 10,
  ICONS: {
    FOLDER: '/.da/icons/folder-icon.png',
    FOLDER_OPEN: '/.da/icons/folder-open-icon.png',
    FRAGMENT: '/.da/icons/fragment-icon.png',
  },
};

// Track currently selected fragment
let selectedFragment = null;

function isHtmlFile(file) {
  if (!file) return false;
  if (file.ext && String(file.ext).toLowerCase() === 'html') return true;
  return Boolean(file.path?.endsWith('.html'));
}

function toSitePath(filePath, basePath) {
  return filePath.replace(basePath, '').replace(/\.html$/, '');
}

function fragmentHref(filePath) {
  const { context } = sdk;
  const sitePath = toSitePath(filePath, `/${context.org}/${context.repo}`);
  const ref = !context.ref || context.ref === 'local' ? 'main' : context.ref;
  return `https://${ref}--${context.repo}--${context.org}.aem.page${sitePath}`;
}

function toSourceUrl(filePath) {
  const withExt = /\.html$/i.test(filePath) ? filePath : `${filePath}.html`;
  return `${DA_ORIGIN}/source${withExt}`;
}

function wrapPreviewHtml(html) {
  if (/<html[\s>]/i.test(html) || /<body[\s>]/i.test(html)) return html;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`;
}

function previewOrigin(context) {
  const ref = context.ref || 'main';
  return `https://${ref}--${context.repo}--${context.org}.aem.page`;
}

const sdk = { actions: null, context: null };

function markLeavesAsFiles(node) {
  const names = Object.keys(node.children || {});
  if (!names.length) {
    node.isFile = true;
    return;
  }
  node.isFile = false;
  names.forEach((name) => markLeavesAsFiles(node.children[name]));
}

/**
 * Shows a user-facing message in the feedback area
 * @param {string} text - Message text to display
 * @param {boolean} isError - Whether this is an error message
 * @param {boolean} autoHide - Whether to auto-hide after delay
 */
function showMessage(text, isError = false, autoHide = false) {
  const message = document.querySelector('.feedback-message');
  const msgContainer = document.querySelector('.message-wrapper');

  if (!message || !msgContainer) return;

  message.innerHTML = text.replace(/\r?\n/g, '<br>');
  message.classList.toggle('error', isError);
  msgContainer.classList.remove('hidden');

  if (autoHide && !isError) {
    // Use CSS animation end event instead of setTimeout
    msgContainer.classList.add('auto-hide');
    const handleAnimationEnd = () => {
      msgContainer.classList.add('hidden');
      msgContainer.classList.remove('auto-hide');
      msgContainer.removeEventListener('animationend', handleAnimationEnd);
    };
    msgContainer.addEventListener('animationend', handleAnimationEnd);
  }
}

/**
 * Creates a tree structure from file paths
 * @param {Array} files - Array of file objects with paths
 * @param {string} basePath - Base path to remove from display
 * @returns {Object} Tree structure
 */
function createFileTree(files, basePath) {
  const tree = {};
  files.forEach((file) => {
    let displayPath = file.path.replace(basePath, '');
    if (displayPath.startsWith(FRAGMENTS_BASE)) {
      displayPath = displayPath.slice(FRAGMENTS_BASE.length);
    }
    const parts = displayPath.split('/').filter(Boolean);
    let current = tree;
    parts.forEach((part, i) => {
      const isLast = i === parts.length - 1;
      if (!current[part]) {
        current[part] = {
          isFile: isLast,
          children: {},
          path: file.path,
        };
      } else if (isLast) {
        current[part].path = file.path;
      }
      current = current[part].children;
    });
  });
  Object.values(tree).forEach(markLeavesAsFiles);
  return tree;
}


/**
 * Shows preview in the right panel and updates selection state
 * @param {string} fragmentPath - Path to the fragment file
 * @param {string} fragmentName - Display name of the fragment
 * @param {Object} context - SDK context object
 * @param {HTMLElement} fragmentElement - The tree item element that was selected
 */
async function showPreview(fragmentPath, fragmentName, fragmentElement) {
  const iframe = document.querySelector('.preview-iframe');
  const placeholder = document.querySelector('.preview-placeholder');
  const insertBtn = document.querySelector('.insert-btn');

  if (selectedFragment?.element) {
    selectedFragment.element.classList.remove('selected');
    selectedFragment.element.classList.add('was-selected');
  }

  selectedFragment = {
    path: fragmentPath,
    name: fragmentName,
    element: fragmentElement,
  };

  if (fragmentElement) {
    fragmentElement.classList.remove('was-selected');
    fragmentElement.classList.add('selected');
  }

  if (insertBtn) {
    insertBtn.disabled = false;
    insertBtn.removeAttribute('disabled');
    insertBtn.setAttribute('aria-label', `Insert fragment "${fragmentName}"`);
  }

  if (placeholder) placeholder.classList.add('hidden');
  if (!iframe) {
    showMessage(`Selected "${fragmentName}". Click Insert to add it.`, false, true);
    return;
  }

  iframe.classList.remove('hidden');

  try {
    const resp = await sdk.actions.daFetch(toSourceUrl(fragmentPath));
    if (!resp.ok) throw new Error(`Preview failed (${resp.status})`);
    iframe.removeAttribute('src');
    iframe.srcdoc = wrapPreviewHtml(await resp.text());
  } catch (error) {
    const { context } = sdk;
    const displayPath = toSitePath(fragmentPath, `/${context.org}/${context.repo}`);
    iframe.srcdoc = '';
    iframe.removeAttribute('srcdoc');
    iframe.src = `${previewOrigin(context)}${displayPath}`;
  }
}

/**
 * Creates a tree item element
 * @param {string} name - Item name
 * @param {Object} node - Tree node data
 * @param {Object} context - SDK context for preview URL generation
 * @returns {HTMLElement} Tree item element
 */
function createTreeItem(name, node) {
  const item = document.createElement('div');
  item.className = 'tree-item';
  item.setAttribute('role', 'listitem');

  const content = document.createElement('div');
  content.className = 'tree-item-content';
  const isFile = node.isFile || !Object.keys(node.children || {}).length;

  if (isFile) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'fragment-btn-item';
    const displayName = name.replace(/\.html$/i, '');
    button.dataset.path = node.path;
    button.dataset.name = displayName;
    button.setAttribute('aria-label', `Preview fragment "${displayName}"`);
    button.title = `Click to preview "${displayName}"`;

    const fragmentIcon = document.createElement('img');
    fragmentIcon.src = '/.da/icons/fragment-icon.png';
    fragmentIcon.alt = '';
    fragmentIcon.className = 'tree-icon';
    fragmentIcon.setAttribute('aria-hidden', 'true');

    const textSpan = document.createElement('span');
    textSpan.textContent = displayName;

    button.appendChild(fragmentIcon);
    button.appendChild(textSpan);
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      showPreview(node.path, displayName, item);
    });
    button.addEventListener('dblclick', (event) => {
      event.preventDefault();
      event.stopPropagation();
      showPreview(node.path, displayName, item);
      handleFragmentInsert(event);
    });

    content.appendChild(button);
  } else {
    const folderButton = document.createElement('button');
    folderButton.type = 'button';
    folderButton.className = 'folder-btn';
    folderButton.setAttribute('aria-expanded', 'false');
    folderButton.setAttribute('aria-label', `Folder ${name}`);

    const folderIcon = document.createElement('img');
    folderIcon.src = '/.da/icons/folder-icon.png';
    folderIcon.alt = ''; // Decorative image, using aria-hidden instead
    folderIcon.className = 'tree-icon folder-icon';
    folderIcon.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'folder-name';
    label.textContent = name;

    folderButton.appendChild(folderIcon);
    folderButton.appendChild(label);

    const toggleFolder = () => {
      folderButton.classList.toggle('expanded');
      folderButton.setAttribute('aria-expanded', folderButton.classList.contains('expanded'));
      folderIcon.src = folderButton.classList.contains('expanded')
        ? '/.da/icons/folder-open-icon.png'
        : '/.da/icons/folder-icon.png';
      const list = item.querySelector('.tree-list');
      if (list) {
        list.classList.toggle('hidden');
      }
    };

    folderButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleFolder();
    });
    content.appendChild(folderButton);

    if (Object.keys(node.children).length > 0) {
      const list = document.createElement('div');
      list.className = 'tree-list hidden';
      list.setAttribute('role', 'list');

      Object.entries(node.children)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([childName, childNode]) => {
          list.appendChild(createTreeItem(childName, childNode));
        });

      item.appendChild(content);
      item.appendChild(list);
    }
  }

  if (!content.parentElement) {
    item.appendChild(content);
  }

  return item;
}

/**
 * Inserts the selected fragment link into the open DA document.
 * DA's editor ignores a bare <a>; wrap it in a paragraph and use a full URL.
 */
function handleFragmentInsert(event) {
  event?.preventDefault();
  event?.stopPropagation();

  const { actions } = sdk;
  if (!selectedFragment?.path) {
    showMessage('Select a fragment first', true);
    return;
  }

  if (!actions?.sendHTML && !actions?.sendText) {
    showMessage('Cannot insert fragment: Editor not available', true);
    return;
  }

  const href = fragmentHref(selectedFragment.path);
  if (!href.includes('/fragments/')) {
    showMessage(`Could not build fragment URL from ${selectedFragment.path}`, true);
    return;
  }

  try {
    // Tags in this repo inserts with sendText. Some DA dialogs ignore sendHTML.
    // A paragraph-wrapped link is what the editor actually persists.
    const html = `<p><a href="${href}">${href}</a></p>`;
    if (typeof actions.sendHTML === 'function') actions.sendHTML(html);
    if (typeof actions.sendText === 'function') actions.sendText(href);
    showMessage(`Inserted ${href}. Close this plugin and check the document.`, false, false);
  } catch (error) {
    showMessage(error?.message || 'Failed to insert fragment', true);
  }
}

/**
 * Filters tree items based on search text
 * @param {string} searchText - Text to search for
 * @param {HTMLElement} fragmentsList - List container element
 */
function filterFragments(searchText, fragmentsList) {
  const items = fragmentsList.querySelectorAll('.tree-item');
  const searchLower = searchText.toLowerCase();

  // First pass: Find matching items and their parent folders
  const matchingPaths = new Set();
  items.forEach((item) => {
    const button = item.querySelector('.fragment-btn-item');
    if (button && button.textContent.toLowerCase().includes(searchLower)) {
      // Add current item and all its parent folders to matching paths
      let current = item;
      while (current && current.classList.contains('tree-item')) {
        matchingPaths.add(current);
        current = current.parentElement.closest('.tree-item');
      }
    }
  });

  // Second pass: Show/hide items and expand folders
  items.forEach((item) => {
    const isMatching = matchingPaths.has(item);
    item.style.display = isMatching ? '' : 'none';

    // If it's a folder and it's in the matching paths, expand it
    const folderBtn = item.querySelector('.folder-btn');
    const list = item.querySelector('.tree-list');
    if (folderBtn && list && isMatching) {
      folderBtn.classList.add('expanded');
      folderBtn.setAttribute('aria-expanded', 'true');
      const folderIcon = folderBtn.querySelector('.folder-icon');
      if (folderIcon) {
        folderIcon.src = '/.da/icons/folder-open-icon.png';
      }
      list.classList.remove('hidden');
    }
  });

  // If search is cleared, restore to initial state
  if (!searchText) {
    const targetDepth = getBasePathDepth();

    items.forEach((item) => {
      // Show all items
      item.style.display = '';

      // Re-expand to initial depth
      const depth = getItemDepth(item);
      const folderBtn = item.querySelector(':scope > .tree-item-content > .folder-btn');
      const list = item.querySelector(':scope > .tree-list');

      if (folderBtn && list) {
        if (depth <= targetDepth) {
          // Expand folders within target depth
          folderBtn.classList.add('expanded');
          folderBtn.setAttribute('aria-expanded', 'true');
          const folderIcon = folderBtn.querySelector('.folder-icon');
          if (folderIcon) {
            folderIcon.src = '/.da/icons/folder-open-icon.png';
          }
          list.classList.remove('hidden');
        } else {
          // Collapse folders beyond target depth
          folderBtn.classList.remove('expanded');
          folderBtn.setAttribute('aria-expanded', 'false');
          const folderIcon = folderBtn.querySelector('.folder-icon');
          if (folderIcon) {
            folderIcon.src = '/.da/icons/folder-icon.png';
          }
          list.classList.add('hidden');
        }
      }
    });
  }
}

/**
 * Gets the depth level of a tree item
 * @param {HTMLElement} item - Tree item element
 * @returns {number} Depth level (1-based)
 */
function getItemDepth(item) {
  let depth = 0;
  let current = item;
  while (current && current.classList.contains('tree-item')) {
    depth += 1;
    current = current.parentElement.closest('.tree-item');
  }
  return depth;
}

// Function to get the depth of FRAGMENTS_BASE
function getBasePathDepth() {
  return FRAGMENTS_BASE.split('/').filter(Boolean).length; // filter(Boolean) removes empty strings
}

// Function to expand folder to specific depth
function expandToDepth(item, currentDepth, targetDepth) {
  const folderBtn = item.querySelector('.folder-btn');
  const list = item.querySelector('.tree-list');

  if (folderBtn && list && currentDepth <= targetDepth) {
    // Expand this folder
    folderBtn.classList.add('expanded');
    folderBtn.setAttribute('aria-expanded', 'true');
    const folderIcon = folderBtn.querySelector('.folder-icon');
    if (folderIcon) {
      folderIcon.src = '/.da/icons/folder-open-icon.png';
    }
    list.classList.remove('hidden');

    // Recursively expand child folders
    const childFolders = list.querySelectorAll(':scope > .tree-item');
    childFolders.forEach((childItem) => {
      expandToDepth(childItem, currentDepth + 1, targetDepth);
    });
  }
}

/**
 * Initializes the fragments interface and sets up event handlers
 */
(async function init() {
  try {
    const { actions, context } = await DA_SDK;
    sdk.actions = actions;
    sdk.context = context;
    const fragmentsList = document.querySelector('.fragments-list');
    const searchInput = document.querySelector('.fragment-search');
    const insertBtn = document.querySelector('.insert-btn');

    if (!fragmentsList || !searchInput || !insertBtn) {
      throw new Error('Fragments plugin markup is missing required elements');
    }

    searchInput.addEventListener('input', (e) => {
      filterFragments(e.target.value, fragmentsList);
    });

    insertBtn.addEventListener('click', handleFragmentInsert);

    fragmentsList.addEventListener('keydown', (e) => {
      const allFragments = Array.from(fragmentsList.querySelectorAll('.fragment-btn-item'));
      if (allFragments.length === 0) return;

      const currentIndex = allFragments.findIndex((btn) => btn === document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % allFragments.length;
        allFragments[nextIndex].focus();
        allFragments[nextIndex].click();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? allFragments.length - 1 : currentIndex - 1;
        allFragments[prevIndex].focus();
        allFragments[prevIndex].click();
      } else if (e.key === 'Enter' && currentIndex >= 0) {
        e.preventDefault();
        insertBtn.click();
      }
    });

    async function loadFragments() {
      const fragmentsContainer = document.querySelector('.fragments-list');

      if (!fragmentsContainer.querySelector('.loading-state')) {
        fragmentsContainer.innerHTML = '<div class="loading-state">Loading fragments...</div>';
      }

      try {
        const { context: loadContext, actions: loadActions } = await DA_SDK;
        const path = `/${loadContext.org}/${loadContext.repo}${FRAGMENTS_BASE}`;
        const basePath = `/${loadContext.org}/${loadContext.repo}`;

        const probe = await loadActions.daFetch(`${DA_ORIGIN}/list${path}`);
        if (!probe.ok) {
          const hint = probe.status === 404
            ? `No ${FRAGMENTS_BASE} folder found in this site.`
            : `Could not list fragments (${probe.status}).`;
          throw new Error(hint);
        }

        const found = [];
        const { results } = crawl({
          path,
          callback: (file) => {
            if (isHtmlFile(file)) found.push(file);
          },
          throttle: CONSTANTS.CRAWL_THROTTLE,
        });

        const crawled = await results;
        const files = found.length
          ? found
          : (crawled || []).filter(isHtmlFile);

        fragmentsContainer.innerHTML = '';

        if (files.length === 0) {
          fragmentsContainer.innerHTML = `<div class="loading-state">No fragments found in ${FRAGMENTS_BASE}</div>`;
          return;
        }

        const tree = createFileTree(files, basePath);
        const targetDepth = getBasePathDepth();

        Object.entries(tree)
          .sort(([a], [b]) => a.localeCompare(b))
          .forEach(([name, node]) => {
            const item = createTreeItem(name, node);
            fragmentsContainer.appendChild(item);
            expandToDepth(item, 1, targetDepth);
          });
      } catch (error) {
        const detail = error?.message || 'Failed to load fragments.';
        fragmentsContainer.innerHTML = `
        <div class="error-state">
          <p></p>
          <button class="retry-btn" type="button">Retry</button>
        </div>
      `;
        fragmentsContainer.querySelector('.error-state p').textContent = detail;
        showMessage(`${detail} Click Retry to try again.`, true);

        const retryBtn = fragmentsContainer.querySelector('.retry-btn');
        if (retryBtn) {
          retryBtn.addEventListener('click', loadFragments);
        }
      }
    }

    await loadFragments();
  } catch (error) {
    showMessage('Initialization failed. Open this plugin from the DA library, not as a standalone page.', true);
  }
}());