<script lang="ts" setup>
import { getHighlighter } from 'shiki-es';
const theme = useState('theme');
const { lib } = defineProps<{
  lib: {
    package: string;
    title: string;
    snippet: string;
    github: string;
  }
}>();


const code = ref('');
const installVal ='$ npm install ' + lib.package;
const installer = ref('');
const outputVal = ref('');
const result = ref('');
const loading = ref(false);

const highlighter = await getHighlighter({
  theme: theme.value === 'Dark' ? 'github-dark' : 'github-light',
  themes: ['github-dark', 'github-light'],
  langs: ['javascript', 'typescript', 'shell', 'json']
});

code.value = highlighter.codeToHtml(lib.snippet, { lang: 'typescript' });
installer.value = highlighter.codeToHtml(installVal, { lang: 'shell' });

const runLib = async () => {
  loading.value = true;
  const { output } = await $fetch<{ output: string }>('/api/run/' + encodeURIComponent(lib.title));
  outputVal.value = output;
  result.value = highlighter.codeToHtml(output, {
    lang: 'typescript',
    theme: theme.value === 'Light' ? 'github-light' : 'github-dark'
  });
  loading.value = false;
}

watch(theme, async (_, nTheme) => {
  code.value = highlighter.codeToHtml(lib.snippet, { lang: 'typescript', theme: nTheme === 'Light' ? 'github-dark' : 'github-light' });
  installer.value = highlighter.codeToHtml(installVal, { lang: 'shell', theme: nTheme === 'Light' ? 'github-dark' : 'github-light' });
  if (result.value && result.value.length > 0) {
    result.value = highlighter.codeToHtml(outputVal.value, {
      lang: 'typescript',
      theme: theme.value === 'Light' ? 'github-light' : 'github-dark'
    });
  }
});
</script>

<template>
  <Splitter>
    <SplitterPanel class="panel" :min-size="25">
      <LibMeta :lib="lib" />
      <div class="lib-install" v-html="installer" />
      <div v-html="code" />
    </SplitterPanel>
    <SplitterPanel class="panel" :min-size="25">
      <div v-if="result && result.length">
        <h2>Result</h2>
        <div v-html="result" />
      </div>
      <div class="run-button" v-else>
        <Button 
          label="Run" 
          severity="success" 
          icon="pi pi-send" 
          icon-pos="right" 
          outlined 
          raised 
          @click="runLib" 
          :loading="loading"
        />
      </div>
    </SplitterPanel>
  </Splitter>
</template>

<style>
.shiki {
  padding: 1rem;
  line-height: 1.75rem;
  border-radius: 12px;
  overflow-x: auto;
}

.shiki code {
  font-family: 'Fira Code', monospace;
}

.panel {
  padding: 1rem;
  min-width: 25%;
}

.p-splitter {
  border: none;
  max-height: 75vh;
}

.p-splitter-panel {
  overflow-y: auto;
}

.run-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
