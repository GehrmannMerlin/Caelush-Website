# Caelush 官网下载首页实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. The design is already approved; do not restart brainstorming. Complete each task in this project directory and keep the production server untouched.

**Goal:** 在现有空目录中建立可静态生成的 Caelush 中文官网首页，公开版本为 Windows x64 1.0.0，安装包未就绪时不会出现失效下载链接。

**Architecture:** 使用 Nuxt 生成静态 HTML、CSS 和 JavaScript，由普通静态文件服务托管。首页、下载状态和宣传内容留在网站项目内；不增加网站 API、数据库或与 Caelush-Cloud 的运行时依赖。发布信息集中在一个 TypeScript 配置文件中，下载按钮只根据该配置决定显示“准备中”还是直链。

**Tech Stack:** Nuxt（Vue 3）、TypeScript、Tailwind CSS、按需使用 Nuxt UI、pnpm。

**Spec:** docs/superpowers/specs/2026-10-28-caelush-website-design.md

## Global Constraints

- 网站项目根目录为 D:\Develop\Caelush-Website。
- 正式公开版本为 1.0.0；0.1.0 是开发版本，不得作为正式发布版本显示。
- 首版只展示简体中文和 Windows 64 位版本。
- 采用白色背景、方案 A 的居中首屏和显眼下载入口。
- 下载地址规划为 https://releases.caelush.com.cn/1.0.0/Caelush-Setup.exe。
- 安装包目前没有准备好；初始 downloadEnabled 必须是 false，不能输出坏链接。
- 不猜测最低 Windows 版本、安装包大小、模型服务配置要求或尚未确认的产品功能。
- 不在 Caelush 主仓库或 Caelush-Cloud 仓库写入文件。
- 不连接或修改生产服务器、DNS、Nginx 配置，不上传安装包，不执行生产发布。
- 官网不新增后端 API、数据库、账号系统或版本查询接口。
- 不新增测试套件；用项目构建和本地页面预览完成必要交付确认。

## Review Focus

- 安装包未就绪时，页面必须显示准备状态且不能渲染可点击的文件 URL；通过本地预览检查。
- 发布版本、平台和 URL 必须来自同一份配置；检查 UI 展示与配置一致。
- 手机窄屏下导航和下载入口不能溢出或被遮挡；通过本地预览检查。
- 未确认的系统要求或模型配置内容不能以事实形式出现在页面；对照设计说明检查文案。
- 静态生成的输出必须包含首页且可独立由静态服务器托管；运行静态生成并查看产物。

---

### Task 1: 初始化独立 Nuxt 网站并复制品牌素材

**Files:**

- Create: Nuxt 官方 starter 所需的项目文件，包括 package.json、pnpm-lock.yaml、nuxt.config.ts、tsconfig.json、.gitignore 和 app/ 目录。
- Create: public/brand/caelush-logo.png
- Create: public/brand/caelush-icon.png

**Interfaces:**

- Consumes: 已确认的空目录 D:\Develop\Caelush-Website；现有 Logo 源文件 D:\Develop\Caelush\packages\ui-theme\assets\caelush-logo.png 和图标 D:\Develop\Caelush\packages\ui-theme\assets\caelush-icon.png。
- Produces: 可在本目录启动的 Nuxt 项目及网站自己的品牌素材副本。原 Caelush 仓库只读。

- [ ] 在 D:\Develop\Caelush-Website 使用当前 Nuxt 官方 starter 初始化项目，选择 pnpm、TypeScript 和 Nuxt 4 默认目录约定；不要创建嵌套的第二层 Caelush-Website 文件夹。
- [ ] 从给定的两个源路径复制 Logo 和图标到 public/brand/，不修改源文件。
- [ ] 安装依赖后运行开发服务器，确认 starter 首页可以在浏览器打开。

### Task 2: 配置 Tailwind、Nuxt UI 和静态生成

**Files:**

- Modify: nuxt.config.ts
- Create: app/assets/css/main.css
- Modify: app/app.vue
- Modify: package.json

**Interfaces:**

- Consumes: Task 1 的 Nuxt 4 项目。
- Produces: 可用 Tailwind CSS 和 Nuxt UI 的应用壳，以及 pnpm dev、pnpm generate、pnpm preview 等脚本。

- [ ] 按 Tailwind CSS 官方 Nuxt 指南配置 Tailwind；按 Nuxt UI 当前官方 Nuxt 安装方式注册 @nuxt/ui。避免再加入第二套 CSS 框架或无用 UI 库。
- [ ] 将首页 CSS 放在 app/assets/css/main.css，通过 Nuxt 应用配置全局加载。
- [ ] 保留 Nuxt 4 的 app/ 目录结构并确认没有新增服务端 API、数据库或运行时后端依赖。
- [ ] 配置并运行 Nuxt 静态生成命令，确认实际生成目录并记录到 DEPLOYMENT.md。

### Task 3: 集中管理版本与下载启用状态

**Files:**

- Create: app/config/release.ts
- Create: app/components/DownloadCta.vue

**Interfaces:**

- Consumes: 项目中已注册的 Tailwind 和 Nuxt UI。
- Produces: 发布配置 currentRelease，字段为 version: '1.0.0'、platform: 'Windows 64 位'、href: 'https://releases.caelush.com.cn/1.0.0/Caelush-Setup.exe'、downloadEnabled: false。DownloadCta 读取该配置，并负责展示当前下载状态。

- [ ] 在 app/config/release.ts 定义唯一发布配置，不在页面组件里重复版本号或地址。
- [ ] 在 app/components/DownloadCta.vue 中，downloadEnabled 为 false 时显示不可点击的“Windows 安装包准备中”状态，同时显示版本和平台。
- [ ] 只有 downloadEnabled 为 true 时才渲染指向 href 的直链；不通过 Cloud API、Nuxt API 或网页服务端代理。
- [ ] 保持正式版 1.0.0 与开发版 0.1.0 分离。

### Task 4: 构建首页及响应式内容

**Files:**

- Create: app/components/SiteHeader.vue
- Create: app/components/SiteFooter.vue
- Create: app/pages/index.vue
- Modify: app/assets/css/main.css

**Interfaces:**

- Consumes: Task 1 的品牌素材、Task 3 的 DownloadCta.vue。
- Produces: 单页简体中文首页，区块顺序为顶部导航、居中首屏、工作流、三项核心能力、系统要求/常见问题、页脚。

- [ ] 顶部导航使用 Logo，并通过页面锚点到达产品能力、下载和常见问题；窄屏布局保留 Logo 与下载入口。
- [ ] 首屏使用已批准的主标题“让 AI 走完整个开发流程”和说明“从理解项目、修改代码，到运行命令并验证结果。”，突出下载状态。
- [ ] 工作流展示“理解项目 → 修改代码 → 运行命令 → 验证结果”。
- [ ] 三项能力按设计说明展示；措辞不得暗示未经确认的 1.0.0 能力。
- [ ] 系统要求部分只展示已确认的 Windows 64 位信息；如最低 Windows 版本仍未核实，不得猜数字。
- [ ] FAQ 只保留能够如实回答的问题；模型服务配置等未核实事项不要杜撰答案。
- [ ] 使用白色背景和克制的 Caelush 蓝色强调，避免产品截图、大幅插画和复杂动效。

### Task 5: 设置 SEO、部署说明并完成交付检查

**Files:**

- Modify: nuxt.config.ts
- Modify: app/pages/index.vue
- Create: DEPLOYMENT.md

**Interfaces:**

- Consumes: Task 4 的完整首页和项目静态生成配置。
- Produces: 简体中文 SEO 元数据、静态部署指南和可复现的本地预览步骤。

- [ ] 设置页面语言、标题、描述、favicon 和适当的 Open Graph 基础元数据；规范域名使用 https://caelush.com.cn。
- [ ] 在 DEPLOYMENT.md 写明安装依赖、静态生成命令、实际产物目录、预览方法和上传产物的一般流程。
- [ ] 部署说明列出未来需为 caelush.com.cn、www.caelush.com.cn 和 releases.caelush.com.cn 准备 HTTPS 与站点配置；明确不要覆盖 api.caelush.com.cn 现有配置。
- [ ] 明确真实安装包上传和 HTTPS 下载验证完成后，才可将 app/config/release.ts 的 downloadEnabled 改为 true。
- [ ] 运行静态生成并启动本地预览；检查桌面/窄屏布局、锚点、禁用下载状态和静态产物。不要访问生产服务器或实际上传文件。
- [ ] 最后报告实现文件、预览方式、构建结果、下载启用条件，以及尚需用户提供的产品事实。

## 执行备注

Nuxt、Tailwind CSS 和 Nuxt UI 会继续更新。初始化和安装时以各自官方当前文档为准，不要使用 Nuxt 2 的 target: 'static'、dist/ 等过时配置假设。

官方参考：

- Nuxt：<https://nuxt.com/docs>
- Tailwind CSS Nuxt 指南：<https://tailwindcss.com/docs/installation/framework-guides/nuxt>
- Nuxt UI：<https://ui.nuxt.com/docs/getting-started>
