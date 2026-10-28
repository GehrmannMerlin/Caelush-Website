# Caelush Website

Caelush 官网的 Nuxt 4 静态站点。首页面向简体中文用户，首发版本与下载状态由 `app/config/release.ts` 集中管理。

## 本地开发

```sh
pnpm install
pnpm dev
```

开发服务器默认地址为 <http://localhost:3000>。

## 静态构建与预览

```sh
pnpm generate
pnpm preview
```

Nuxt 生成的静态文件位于 `.output/public/`，`pnpm preview` 通过 Node.js 内置静态文件服务器在本机预览该目录。详细说明见 [DEPLOYMENT.md](./DEPLOYMENT.md)。
