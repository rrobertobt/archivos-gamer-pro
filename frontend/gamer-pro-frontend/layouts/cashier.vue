<template>
  <v-app theme="light">
    <v-app-bar>
      <v-app-bar-title class="mt-n1">
        <strong>Cajero </strong> - Gamer Pro Xela
      </v-app-bar-title>

      <h4 class="mr-4 d-flex align-center">
        <v-icon size="small" class="mr-1"> mdi-account </v-icon>
        {{ session?.name }}
        <span class="px-2 text-overline">
          {{ session?.id }}
        </span>
      </h4>
      <h4 class="mr-4 d-flex align-center">
        <v-icon size="small" class="mr-1"> mdi-cash-register </v-icon>
        <span class="font-weight-regular">Caja: </span>
        {{ session?.assigned_checkout }}
      </h4>
      <h4 class="mr-4 d-flex align-center">
        <v-icon size="small" class="mr-1"> mdi-store </v-icon>
        <span class="font-weight-regular">Sucursal: </span>
        {{ session?.branch.name }}
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
<script setup>
  import { useSessionStore } from "~/store/session";

  const { logout } = useSessionStore();
  const { session } = storeToRefs(useSessionStore())
</script>
<style lang="postcss" scoped></style>
