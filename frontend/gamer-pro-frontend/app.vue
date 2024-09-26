<template>
  <div class="main-app">
    <NuxtLayout />
  </div>
  <AppSnackbar />
</template>
<script setup>
import AppSnackbar from './components/AppSnackbar.vue';
</script>
<style lang="scss">
.main-app {
  // padding-top: 2rem;
  min-height: 100vh;
}

.v-container-page {
  padding-top: 2rem !important;
}

*,
.v-application {
  [class*='text-'] {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  // font-family: system-ui,
  // -apple-system,
  // BlinkMacSystemFont,
  // 'Segoe UI',
  // Roboto,
  // Oxygen,
  // Ubuntu,
  // Cantarell,
  // 'Open Sans',
  // 'Helvetica Neue',
  // sans-serif
}

:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: rgb(18, 18, 18)
}

@import '@/assets/styles/main.scss';
</style>
