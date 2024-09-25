<template>
  <v-snackbar v-model="show" vertical location="top center" rounded="lg" theme="dark">
    <div
      class="text-subtitle-1 pb-2 font-weight-bold d-flex align-center"
      :class="[colorSnackbar]"
    >
      <v-icon v-if="typeOf === SnackbarType.ERROR" class="mr-1">
        mdi-alert-octagon-outline
      </v-icon>
      <v-icon v-if="typeOf === SnackbarType.SUCCESS" class="mr-1">
        mdi-check-circle-outline
      </v-icon>
      <v-icon v-if="typeOf === SnackbarType.WARNING" class="mr-1">
        mdi-alert-outline
      </v-icon>
      <v-icon v-if="typeOf === SnackbarType.INFO" class="mr-1">
        mdi-information-outline
      </v-icon>
      {{ title }}
    </div>

    <p>{{ message }}</p>

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="show = false"> Cerrar </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup>
  import { SnackbarType, useSnackbarStore } from "~/store/snackbar";
  const { show, title, message, type: typeOf } = storeToRefs(useSnackbarStore());

  const colorSnackbar = computed(() => {
    return {
      [SnackbarType.ERROR]: "text-red-darken-3",
      [SnackbarType.SUCCESS]: "text-teal",
      [SnackbarType.WARNING]: "text-yellow",
      [SnackbarType.INFO]: "text-cyan",
    }[typeOf.value];
  });
</script>
<style lang="postcss" scoped></style>
