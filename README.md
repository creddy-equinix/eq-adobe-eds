# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Tailwind

This project uses the same Tailwind build pattern as [Danaher Life Sciences EDS](https://github.com/hlxsites/danaher-ls-aem-prod): classes in JS are compiled to CSS that Edge Delivery can serve.

- Source: `styles/tailwind.css` and `blocks/**/*-dev.css`
- Generated (commit these): `styles/styles.css` and `blocks/**/*.css`
- Tokens and custom utilities: `styles/tw-tokens.css` (`tw:` prefix so Equinix markup works)
- Put Tailwind classes on elements in JS (e.g. `tw:flex tw:nav:hidden`). Do not edit generated CSS.

```sh
npm run build:css
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/aem-cli): `npm install -g @adobe/aem-cli`
1. Install dependencies: `npm i`
1. Start CSS watch + AEM proxy: `npm run dev` (opens `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
