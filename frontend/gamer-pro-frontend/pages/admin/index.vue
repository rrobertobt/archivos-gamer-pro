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
      title: "Reportes",
      icon: "mdi-file-chart",
      to: "/admin/reports",
      color: "gray-lighten-1",
    },
    {
      title: "Ver ventas",
      icon: "mdi-cash",
      to: "/admin/sales",
      color: "gray-lighten-2",
    }
  ];


definePageMeta({
  layout: 'admin',
})
</script>
<style lang="postcss" scoped>
</style>