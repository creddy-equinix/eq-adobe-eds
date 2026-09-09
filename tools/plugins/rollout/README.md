# Rollout plugin

Site-hosted DA library plugin that copies the current page to locale folders from `/.da/translate.json`.

Adobe's public plugin (`https://da.live/nx/public/plugins/rollout.html`) fails in the library iframe with `Missing IMS Client ID`. This copy uses `actions.daFetch` from the DA SDK, which already has the author token.

## Register in DA library

In `https://da.live/config#/{org}/{site}/` on the **library** tab, replace the Adobe Rollout row with:

| title   | path                                  | format | ref | icon                                                                                         | experience |
| ------- | ------------------------------------- | ------ | --- | -------------------------------------------------------------------------------------------- | ---------- |
| Rollout | `/tools/plugins/rollout/rollout.html` |        |     | `https://da.live/nx/public/plugins/rollout/media_195da69764de2782d555abed3042d8434a040e31c.png` | `dialog`   |

For `eq-adobe-eds-dev`:

| title   | path                                  | icon                                                                                         | experience |
| ------- | ------------------------------------- | -------------------------------------------------------------------------------------------- | ---------- |
| Rollout | `/tools/plugins/rollout/rollout.html` | `https://da.live/nx/public/plugins/rollout/media_195da69764de2782d555abed3042d8434a040e31c.png` | `dialog`   |

Save the config. Preview/publish is not required for the HTML if the branch is already live; after a code push, hard-refresh DA and reopen Library.

## Behavior

- Locales come from the English row `locales` column in `/.da/translate`.
- **Merge:** creates the locale page when it is missing or empty; skips when source and destination already match; otherwise copies source over destination.
- **Overwrite:** always copies source over destination.
- Rollout writes DA source only. Preview/publish each locale page separately.

Open this plugin from DA Library while editing a page under `/master/en/...`. Do not open the HTML as a standalone tab.
