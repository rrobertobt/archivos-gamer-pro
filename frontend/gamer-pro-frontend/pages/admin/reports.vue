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
      Ver reportes
    </h1>
    <v-select
      v-model="selected"
      variant="outlined"
      :items="[
        { title: 'Top Ventas', value: 'topSales' },
        { title: 'Top Productos', value: 'topArticles' },
        { title: 'Top Clientes', value: 'topCustomers' },
        { title: 'Top Sucursales', value: 'topBranches' },
      ]"
      label="Selecciona un tipo de reporte"
    ></v-select>
    <template v-if="selected === 'topSales'">
      <v-data-table
        class="mt-6 rounded-lg"
        v-if="data.topSales"
        :headers="[
          { title: 'Fecha', value: 'date_sale' },
          { title: 'Cliente', value: 'customer_name' },
          { title: 'Total', value: 'total_sale' },
        ]"
        :items="data.topSales"
        :loading="status === 'loading'"
      ></v-data-table>
    </template>
    <template v-else-if="selected === 'topArticles'">
      <v-data-table
        class="mt-6 rounded-lg"
        v-if="data.topArticles"
        :headers="[
          { title: 'Producto', value: 'product_name' },
          { title: 'Cantidad', value: 'total_quantity_sold' },
        ]"
        :items="data.topArticles"
        :loading="status === 'loading'"
      ></v-data-table>
    </template>

    <template v-else-if="selected === 'topCustomers'">
      <v-data-table
        class="mt-6 rounded-lg"
        v-if="data.topCustomers"
        :headers="[
          { title: 'Cliente', value: 'customer_name' },
          { title: 'Total', value: 'total_spent' },
        ]"
        :items="data.topCustomers"
        :loading="status === 'loading'"
      ></v-data-table>
    </template>

    <template v-else-if="selected === 'topBranches'">
      <v-data-table
        class="mt-6 rounded-lg"
        v-if="data.topBranches"
        :headers="[
          { title: 'Sucursal', value: 'branch_name' },
          { title: 'Total', value: 'total_income' },
        ]"
        :items="data.topBranches"
        :loading="status === 'loading'"
      ></v-data-table>
    </template>

  </div>
</template>
<script setup>
  const { data, error, status, refresh } = await useAsyncData(() =>
    $api("/reports"),
  );

  const selected = ref(null);


  definePageMeta({
    layout: "admin",
  });
</script>
<style lang="scss" scoped></style>
