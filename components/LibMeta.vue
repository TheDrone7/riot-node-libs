<script setup lang="ts">
const { lib } = defineProps<{
  lib: {
    package: string;
    title: string;
    snippet: string;
    github: string;
  }
}>();

interface GitHubInfo {
  name: string;
  html_url: string;
  description: string;
  pushed_at: string;
  stargazers_count: number;
  language: string;
  license?: {
    spdx_id: string;
    key: string;
  };
  homepage: string;
}


// The token has no perms, safe to keep public. Needed to access API.
const { data: ghInfo } = await useFetch<GitHubInfo>('/api/gh/' + lib.github);
const hp = ghInfo.value?.homepage && ghInfo.value?.homepage.length > 0 
  ? ghInfo.value?.homepage
  : `https://npmjs.com/package/${lib.package}`;

const lastUpdate = new Date(ghInfo.value?.pushed_at!).toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
});
</script>

<template>
  <div class="lib-meta">
    <div class="lib-head">
      <div class="lib-name">{{ lib.title }}</div>
      <div class="lib-links">
        <a :href="ghInfo?.html_url" target="_blank">
          <Button icon="pi pi-github" text />
        </a>
        <a :href="hp" target="_blank">
          <Button icon="pi pi-globe" text />
        </a>
      </div>
    </div>
    <div class="lib-desc">{{ ghInfo?.description }}</div>
    <div class="lib-detes">
      <div class="lib-fact">
        <i class="pi pi-history"></i>
        <span>Last updated on: {{ lastUpdate }}</span>
      </div>
      <div class="lib-fact">
        <i class="pi pi-star-fill"></i>
        <span>{{ ghInfo?.stargazers_count }} stars</span>
      </div>
      <div class="lib-fact">
        <i class="pi pi-book"></i>
        <span>{{ ghInfo?.license?.spdx_id ?? 'No' }} License</span>
        <a v-if="ghInfo?.license?.key" target="_blank" :href="'https://choosealicense.com/licenses/' + ghInfo.license.key">
          <i class="pi pi-external-link"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<style>
.lib-head {
  display: flex;
  gap: 2rem;
}

.lib-name {
  font-size: 2rem;
}

.lib-detes {
  margin-top: 2rem;
}

.lib-fact {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.25rem;
  color: var(--text-color-secondary);
}
</style>