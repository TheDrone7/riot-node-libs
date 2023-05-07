<script lang="ts" setup>
import { usePrimeVue } from 'primevue/config';
const PrimeVue = usePrimeVue();

const theme = useState('theme', () => 'Dark');
const options = ref(['Dark', 'Light']);

const curTheme = () => theme.value === 'Light' ? 'viva-dark' : 'viva-light';
const newTheme = () => theme.value === 'Light' ? 'viva-light' : 'viva-dark';

const onChange = () => PrimeVue.changeTheme(curTheme(), newTheme(), 'theme-link', () => {});
</script>

<template>
  <Menubar>
    <template #start>
      <div class="nav-title">Node.JS Riot API Libs</div>
    </template>
    <template #end>
      <SelectButton v-model="theme" :options="options" aria-labelledby="basic" @change="onChange" :unselectable="true" />
    </template>
  </Menubar>
</template>

<style>
.nav-title {
  color: var(--text-color);
  font-weight: medium;
  font-size: 1.5rem;
}
</style>
