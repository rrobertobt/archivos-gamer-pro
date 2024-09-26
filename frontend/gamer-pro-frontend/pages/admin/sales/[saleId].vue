<template>
  <div>
    <h1 class="pb-6 d-flex align-center">
      <v-btn
        variant="text"
        icon="mdi-arrow-left"
        to="/admin/sales"
        color="gray-lighten-1"
        class="mr-2"
      />
      Detalle de venta
    </h1>

    <h3 class="pb-6">Información general</h3>
    <h4>
      <strong>Factura:</strong> {{ data?.id }}
    </h4>
    <h4>
      <strong>Fecha:</strong> {{ data?.date_sale }}
    </h4>
    <h4>
      <strong>Cliente:</strong> {{ data?.customer?.name ?? 'Consumidor final (C/F)' }}
    </h4>
    <h4>
      <strong>Sucursal:</strong> {{ data?.branch.name }}
    </h4>
    <h4>
      <strong>Cajero/a:</strong> {{ data?.employee.name }} en Caja <code>#{{ data?.employee.assigned_checkout }}</code>
    </h4>
    
    <v-row>
      <v-col cols="12">
        <v-data-table
          class="mt-6 rounded-lg"
          v-if="data"
          :headers="[
            { title: 'Producto', value: 'product.name' },
            { title: 'Cantidad', value: 'quantity' },
            { title: 'Precio unitario', value: 'unit_price' },
            { title: 'Total', value: 'total' },
          ]"
          :items="data.sale_details"
          :loading="status === 'loading'"
        >
        <template v-slot:item.total="{ item }">
          {{ item.quantity * item.unit_price }}
        </template>
        </v-data-table>
      </v-col>
    </v-row>


  </div>
</template>
<script setup>
const route = useRoute();
const saleId = route.params.saleId;

const { data, error, status, refresh } = await useAsyncData(() =>
    $api(`/sales/${saleId}`),
  );

  definePageMeta({
    layout: 'admin',
  })
</script>
<style lang="scss" scoped>
</style>