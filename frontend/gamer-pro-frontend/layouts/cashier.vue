<template>
  <v-app theme="dark">
    <v-app-bar>
      <v-app-bar-title class="mt-n1">
        <strong>Cajero </strong> - Gamer Pro Xela
      </v-app-bar-title>

      <v-tooltip text="Cerrar sesión" location="bottom">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" @click="logout">
            <v-icon> mdi-logout-variant </v-icon>
          </v-btn>
          <span class="mr-4">
            {{ user?.profile?.first_name }} {{ user?.profile?.last_name }}
          </span>
        </template>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
  import { useSessionStore } from "~/store/session";

  const { logout } = useSessionStore();
</script>
<style lang="postcss" scoped></style>
