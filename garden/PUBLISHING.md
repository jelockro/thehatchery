# Proudfeather Fieldnotes

Author: Kestrel Proudfeather. Working title can be changed in quartz.config.yaml.

## Write in Obsidian

Only your Obsidian `90 Public Garden` folder is designated for publication.
Everything in that folder with a supported extension is public, including attachments. Keep drafts elsewhere. Never put keys, wallet recovery phrases, private notes, or credentials here.

Set GARDEN_SOURCE to the absolute path of your public folder before running the sync or build script. On PowerShell: `$env:GARDEN_SOURCE = '<path to your 90 Public Garden folder>'`.

Run from this project directory:

On this Windows computer, run `powershell -ExecutionPolicy Bypass -File .\Build-Garden.ps1`. This copies the public folder and builds the site; it does not push or publish.

With Node and npm installed, the equivalent commands are:

```sh
node sync-vault.mjs
npx quartz plugin install
npx quartz build
```

On WSL, use `GARDEN_SOURCE='/path/to/90 Public Garden' node sync-vault.mjs`.
Review `git diff` and newly added files before committing and pushing. Only this project belongs on GitHub, never the whole vault. Linked private notes are not automatically copied; use public attachments within the public folder.

## Cloudflare Pages

Repository: https://github.com/jelockro/thehatchery (public). Cloudflare root directory: `garden`.
In Cloudflare, create a Pages project connected to the GitHub repository.

- Production branch: the branch containing the garden (`main`)
- Build command: `npx quartz plugin install && npx quartz build`
- Output directory: `public`
- Node version: `24`

After Cloudflare assigns a `pages.dev` address, replace `localhost:8080` in `quartz.config.yaml` with that hostname (without https://). Commit and push to regenerate sitemap and RSS URLs.

The initial support page intentionally has no payment button or address. Add only a public receiving address or payment link that has been verified on your wallet, and label the exact network.
