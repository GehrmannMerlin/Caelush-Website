<script setup lang="ts">
import { currentRelease } from '~/config/release'
</script>

<template>
  <section id="download" class="download-cta" aria-label="下载 Caelush">
    <a
      v-if="currentRelease.downloadEnabled"
      class="download-cta__button"
      :href="currentRelease.href"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.75v11.5m0 0 4.25-4.25M12 15.25l-4.25-4.25M5 16.75v2.5h14v-2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span>下载 {{ currentRelease.platform }} 版</span>
    </a>
    <button
      v-else
      class="download-cta__button"
      type="button"
      disabled
      aria-describedby="download-status"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.75v11.5m0 0 4.25-4.25M12 15.25l-4.25-4.25M5 16.75v2.5h14v-2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span>{{ currentRelease.platform }} 安装包准备中</span>
    </button>
    <p id="download-status" class="download-cta__status" role="status" aria-live="polite">
      {{ currentRelease.downloadEnabled ? '正式安装包已就绪。' : '安装包尚未就绪，准备完成并验证后开放下载。' }}
    </p>
    <p class="download-cta__meta" aria-label="当前发布信息">
      <span>正式版 {{ currentRelease.version }}</span>
      <span>{{ currentRelease.platform }}</span>
    </p>
  </section>
</template>
