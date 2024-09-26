<template>
  <v-app theme="dark">
    <v-app-bar>
      <v-app-bar-title class="mt-n1">
        <strong>Administrador </strong> - Gamer Pro Xela
      </v-app-bar-title>

      <h4 class="mr-4 d-flex align-center">
        <v-icon size="small" class="mr-1"> mdi-account </v-icon>
        {{ session.name }}
      </h4>
      <v-tooltip text="Cerrar sesión" location="bottom">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" @click="logout">
            <v-icon> mdi-logout-variant </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container class="v-container-page">
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup></script>
<style lang="postcss" scoped></style>
