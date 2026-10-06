# temp

Temporary public site for Avon at [avon.ac](https://avon.ac), before hosting.

`web/` is a mirror of `apps/web` from the private `avon-vle/avon` monorepo.
**Don't edit it here** — the next sync overwrites it. Make changes in
`avon-vle/avon` instead.

## How it deploys

`.github/workflows/deploy.yml` checks out only `apps/web` (plus the shared
`packages/tsconfig` preset, vendored into `web/vendor/`), commits it to `web/`,
builds it with Bun, and deploys `web/dist` to GitHub Pages.

It runs when `avon-vle/avon` force-pushes to the `sync-trigger` branch (on
pushes to its `main` that touch the website), hourly as a fallback, and on
demand from the Actions tab. `sync-trigger` is only a signal; never merge it.

## Configuration

| Name                | Kind     | Purpose                                                        |
| ------------------- | -------- | -------------------------------------------------------------- |
| `AVON_SYNC_SSH_KEY` | secret   | Private key for a **read-only** deploy key on `avon-vle/avon`. |
| `VITE_DOCS_URL`     | variable | Optional docs link target. Defaults to `https://docs.avon.ac`. |

`web/AVON_SOURCE` records the `avon-vle/avon` commit the mirror was taken from.

The old Next.js placeholder (`app/`, `public/`, root `package.json`) is no
longer built or deployed.
