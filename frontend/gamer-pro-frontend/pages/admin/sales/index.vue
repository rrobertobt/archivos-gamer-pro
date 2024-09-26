<template>
  <div>
    <h1 class="pb-6 d-flex align-center">
      <v-btn
        variant="text"
        icon="mdi-arrow-left"
        to="/admin"
        color="gray-lighten-1"
        class="mr-2"
      />
      Ventas realizadas
    </h1>
  </div>
  <v-row>
    <v-col cols="12">
      <v-data-table
        class="mt-6 rounded-lg"
        v-if="data"
        :headers="[
          { title: 'Factura', value: 'sale_id' },
          { title: 'Fecha', value: 'date_sale' },
          { title: 'Cliente', value: 'customer_name' },
          { title: 'Cajero', value: 'employee_name' },
          { title: 'Total', value: 'total_sale_value' },
          { title: 'Acciones', value: 'actions' },
        ]"
        :items="data"
        :loading="status === 'loading'"
      >
    <template v-slot:item.actions="{ item }">
      <v-btn
        color="primary"
        variant="tonal"
        size="small"
        text
        :to="`/admin/sales/${item.sale_id}`"
      >
        Ver detalles
      </v-btn>
    </template>
    <template v-slot:item.customer_name="{ item }">
      {{ item.customer_name || 'Consumidor final (C/F)' }}
    </template>
    </v-data-table>
    </v-col>
  </v-row>
</template>
<script setup>
const { data, error, status, refresh } = await useAsyncData(() =>
    $api("/sales"),
  );

  definePageMeta({
    layout: 'admin',
  })
</script>
<style lang="scss" scoped>
</style>