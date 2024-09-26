<template>
  <div>
    <h1 class="pb-6">Qué deseas hacer?</h1>
    <v-row>
      <v-col
        v-for="item in homeItems"
        :key="item.title"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          variant="tonal"
          :to="item.to"
          class="text-center"
          :color="item.color ?? ''"
        >
          <v-card-text>
            <v-icon size="64">{{ item.icon }}</v-icon>
            <h3>{{ item.title }}</h3>
            <v-icon size="24" class="mt-4">mdi-chevron-right</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
  const homeItems = [
    {
      title: "Ingreso de productos",
      icon: "mdi-package-variant-closed",
      to: "/warehouse/entry",
      color: "yellow-darken-2",
    },
  ];

definePageMeta({
  layout: "warehouse",
});
</script>
<style lang="postcss" scoped>
</style>