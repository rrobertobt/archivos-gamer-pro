<template>
  <div class="main-app">
    <NuxtLayout />
  </div>
</template>
<script setup></script>
<style lang="scss">
.main-app {
  padding: 2rem;
  min-height: 100vh;
}

*,
.v-application {
  [class*='text-'] {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  font-family: system-ui,
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  Oxygen,
  Ubuntu,
  Cantarell,
  'Open Sans',
  'Helvetica Neue',
  sans-serif
}

:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

@import '@/assets/styles/main.scss';
</style>
