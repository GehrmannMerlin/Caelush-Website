# Production deployment

The production setup serves the Nuxt-generated `.output/public/` files through a dedicated, unprivileged Nginx container. The website container publishes no host ports and joins only the existing `caelush-cloud-edge` Docker network. The Cloud API container, data services, DNS, and host firewall are not part of the website release.

## Site container

- `compose.yaml` runs the Nginx image already validated on the server, pinned by digest in `deploy.env.example`.
- `site.conf` serves the read-only release at `/srv/site/current` on the internal port 8080.
- Because the container runs as UID 101, the bind-mounted `deploy/site.conf` must be readable by that UID (mode `0644`); keep the server-local `deploy.env` restricted (mode `0600`).
- The server data directory is mounted at `/opt/data/caelush-website`; each release belongs in `releases/<git-sha>` and `current` is a symlink to the active release. Changing that symlink provides a fast rollback without rebuilding the container.
- The real `/opt/apps/caelush-website/deploy.env` is server-local and must not be committed. Start from `deploy.env.example` and retain `PULL_IMAGES=false` when using the preloaded image.

## Domains and HTTPS

`caelush.com.cn` is canonical. Both names are covered by the certificate; `www.caelush.com.cn` redirects to `https://caelush.com.cn` while preserving the path and query. `nginx-website-bootstrap.conf` is used temporarily to serve the site and HTTP-01 challenges over port 80 while the certificate is expanded. Then `nginx-website-vhost.conf` enables the HTTPS routes and HTTP redirect.

The server already renews its `api.caelush.com.cn` certificate through its Certbot webroot timer. Expanding that certificate to include both website names keeps renewal and Nginx reloads on the existing path. Back up `/opt/data/caelush-cloud/config/nginx-tls.conf` before adding the website virtual hosts, validate the full Nginx configuration with `nginx -t`, and reload the existing reverse-proxy container only after validation succeeds. Edit the bind-mounted file in place so the running container keeps the same mount.

## Release procedure

1. Run `pnpm generate` from the repository root and use only `.output/public/` as the website payload.
2. Create `/opt/data/caelush-website/releases/<git-sha>` and upload the contents of `.output/public/` there. Files and directories must be readable by UID 101 in the Nginx container.
3. Point `/opt/data/caelush-website/current` to that release, preserving the previous target for rollback.
4. Install this repository's root `deploy.conf`, `deploy/compose.yaml`, and `deploy/site.conf` under `/opt/apps/caelush-website`; create the server-local `deploy.env` from the example.
5. Run `/opt/scripts/deploy-preflight /opt/apps/caelush-website`, then `/opt/scripts/deploy-project /opt/apps/caelush-website`.
6. Check the container health, the generated homepage and brand assets, both HTTPS hostnames and the `www` redirect, then confirm the existing API health endpoint remains ready.

To roll back website content, point `current` to the previous release and verify the homepage again. The Nginx container can be rolled back separately with the server's deployment tooling if a container configuration change caused the problem.
