<script lang="ts" setup>
const { data } = await useFetch('/api/libs');
</script>

<template>
  <Navbar />
  <div class="body">
    <TabView>
      <TabPanel v-for="lib in data?.libs" :key="lib.title" :header="lib.title">
        <Lib :lib="lib" />
      </TabPanel>
    </TabView>
  </div>
</template>

<style>
.body {
  padding: 1rem;
  background-color: var(--surface-a);
  margin-top: 2rem;
}

.p-tabview-nav {
  width: 100%;
}

.p-tabview-header {
  display: block;
  flex-grow: 1;
  text-align: center;
}

.p-tabview-title {
  width: 100%;
  text-align: center;
}
</style>
