# Static deployment

The website is a Nuxt 4 static site. Production hosting needs only the generated files; the site does not use a website API, database, account system, or Caelush-Cloud API.

## Build and preview locally

From the project directory:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000> while the development server is running.

Generate the production site and preview that output locally:

```sh
pnpm generate
pnpm preview
```

Nuxt writes the static site to `.output/public/`. This directory contains `index.html`, Nuxt assets, and public brand files; it is the directory to hand off for static hosting. `pnpm preview` uses a small Node.js built-in HTTP server for local inspection at <http://127.0.0.1:4173>. That script is a development utility and is not copied into the generated site.

## Static hosting handoff

1. Run `pnpm generate` from the project root.
2. Provide the contents of `.output/public/` to the website deployment operator for upload to the document root configured for `caelush.com.cn`.
3. Configure HTTPS for `caelush.com.cn` and `www.caelush.com.cn` and serve the generated files as static content.
4. Configure HTTPS and static download handling for `releases.caelush.com.cn` separately when the installer is ready.

Do not replace or overwrite the existing `api.caelush.com.cn` Nginx configuration while adding the website or release host configuration. This project and procedure do not connect to production, change DNS, upload files, or publish the website.

## Enabling the installer download

The single release configuration is `app/config/release.ts`. It contains the public version, platform, HTTPS installer URL, and the `downloadEnabled` flag, which is initially `false`. While disabled, the page renders a disabled status button and no clickable installer link.

After the real 1.0.0 installer has been uploaded to `https://releases.caelush.com.cn/1.0.0/Caelush-Setup.exe`, verify over HTTPS that the URL serves the expected installer file and its contents are correct. Only then change `downloadEnabled` to `true`, regenerate the site with `pnpm generate`, and hand off the updated `.output/public/` files for deployment. Downloads remain direct from the release URL; do not add a website proxy or API route.

## Product details still to confirm

Before publishing final system requirements, confirm the minimum supported Windows version, the installer size, and whether a separate model-service setup is required. Confirm that the three capability descriptions in the homepage match the released 1.0.0 product.
