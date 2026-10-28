<script setup lang="ts">
import { currentRelease } from '~/config/release'

const workflowSteps = ['理解项目', '修改代码', '运行命令', '验证结果']

const capabilities = [
  {
    title: '项目级代码操作',
    description: '阅读、搜索和修改现有项目代码。'
  },
  {
    title: '可控执行',
    description: '在权限边界内执行开发操作，需要时请求用户确认。'
  },
  {
    title: '任务可恢复',
    description: '保留任务进度，之后可以继续处理。'
  }
]

useSeoMeta({
  title: 'Caelush — 让 AI 走完整个开发流程',
  description: '从理解项目、修改代码，到运行命令并验证结果。了解 Caelush 的 AI 开发工作流与 Windows 64 位首发信息。',
  ogTitle: 'Caelush — 让 AI 走完整个开发流程',
  ogDescription: '从理解项目、修改代码，到运行命令并验证结果。',
  ogType: 'website',
  ogUrl: 'https://caelush.com.cn/'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://caelush.com.cn/' }]
})
</script>

<template>
  <div>
    <SiteHeader />

    <main>
      <section class="hero site-container" aria-labelledby="hero-title">
        <div class="hero__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2.8 14.2 9.8 21.2 12 14.2 14.2 12 21.2 9.8 14.2 2.8 12 9.8 9.8 12 2.8Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
            <circle cx="18.7" cy="5.3" r="1" fill="currentColor" />
          </svg>
        </div>
        <h1 id="hero-title">让 AI 走<span>完整个开发流程</span></h1>
        <p class="hero__lead">从理解项目、修改代码，到运行命令并验证结果。</p>
        <DownloadCta />
      </section>

      <section class="workflow" aria-labelledby="workflow-title">
        <div class="site-container">
          <p id="workflow-title" class="workflow__label">从项目到结果</p>
          <ol class="workflow__list">
            <li v-for="(step, index) in workflowSteps" :key="step" class="workflow__item">
              <span class="workflow__number">0{{ index + 1 }}</span>
              <span>{{ step }}</span>
              <span v-if="index < workflowSteps.length - 1" class="workflow__arrow" aria-hidden="true">→</span>
            </li>
          </ol>
        </div>
      </section>

      <section id="capabilities" class="capabilities site-container" aria-labelledby="capabilities-title">
        <div class="capabilities__layout">
          <div class="capabilities__intro">
            <p class="section-kicker">Product capabilities</p>
            <h2 id="capabilities-title" class="section-heading">围绕真实项目，把开发任务向前推进</h2>
            <p class="section-copy">从理解项目、修改代码，到运行命令和验证结果，展示 Caelush 的完整开发流程。</p>
          </div>

          <ol class="capability-list">
            <li v-for="(capability, index) in capabilities" :key="capability.title" class="capability-item">
              <span class="capability-item__number">0{{ index + 1 }}</span>
              <div>
                <h3>{{ capability.title }}</h3>
                <p>{{ capability.description }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section id="requirements" class="requirements" aria-labelledby="requirements-title">
        <div class="site-container requirements__layout">
          <div>
            <p class="section-kicker">System requirements</p>
            <h2 id="requirements-title" class="section-heading">已确认的系统要求</h2>
            <p class="section-copy">这里只列出已经确认的信息。其余要求会在正式安装包准备就绪后补充。</p>
          </div>

          <dl class="requirements__list">
            <div class="requirements__row">
              <dt>首发平台</dt>
              <dd>{{ currentRelease.platform }}</dd>
            </div>
            <div class="requirements__row">
              <dt>最低 Windows 版本</dt>
              <dd class="is-pending">待最终打包配置确认</dd>
            </div>
            <div class="requirements__row">
              <dt>安装包大小</dt>
              <dd class="is-pending">待正式安装包生成后确认</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="faq" class="faq site-container" aria-labelledby="faq-title">
        <div class="faq__layout">
          <div>
            <p class="section-kicker">FAQ</p>
            <h2 id="faq-title" class="section-heading">常见问题</h2>
            <p class="section-copy">关于首发下载和运行环境的说明。</p>
          </div>

          <div class="faq__list">
            <details class="faq__item">
              <summary>安装包现在可以下载吗？</summary>
              <p>安装包尚未完成打包和上传。完成 HTTPS 下载验证后，页面会开放直连下载。</p>
            </details>
            <details class="faq__item">
              <summary>最低支持哪个 Windows 版本？</summary>
              <p>最低版本待最终安装包的系统配置确认后公布。</p>
            </details>
            <details class="faq__item">
              <summary>是否需要单独配置模型服务？</summary>
              <p>目前尚未确认这项要求，待产品方核实后更新。</p>
            </details>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
