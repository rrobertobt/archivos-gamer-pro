<template>
  <div>
    <h1 class="pb-6 d-flex align-center">
      <v-btn
        variant="text"
        icon="mdi-arrow-left"
        to="/cashier"
        color="orange-lighten-1"
        class="mr-2"
      />
      Clientes
    </h1>
    <v-row>
      <v-col cols="2">
        <v-btn
          color="orange"
          prepend-icon="mdi-account-plus"
          @click="
            {
              showCustomerDialog = true;
              editCustomer = false;
            }
          "
          >Nuevo cliente</v-btn
        >
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="nameSearch"
          append-inner-icon="mdi-magnify"
          label="Buscar por nombre"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="nitSearch"
          type="number"
          append-inner-icon="mdi-magnify"
          label="Buscar por NIT"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      class="mt-6 rounded-lg"
      v-if="data"
      :headers="[
        { title: 'Nombre', value: 'name' },
        { title: 'NIT', value: 'nit' },
        { title: 'Teléfono', value: 'phone' },
        { title: 'Acciones', value: 'actions', sortable: false },
      ]"
      :items="data"
      :loading="status === 'loading'"
    >
      <template #item.actions="{ item }">
        <v-btn
          prepend-icon="mdi-pencil"
          @click="handleEditCustomerAction(item)"
          variant="text"
          density="comfortable"
          text="Editar"
        />
      </template>
    </v-data-table>
    <CustomerDialog
      v-model="showCustomerDialog"
      @created="refresh"
      :edit="editCustomer"
      v-model:customerData="customerData"
    />
    <AdminCredentialsInputDialog
      v-model="showAdminCredsDialog"
      @success="
        () => {
          showAdminCredsDialog = false;
          showCustomerDialog = true;
        }
      "
      @cancel="abortEditCustomerAction"
    />
  </div>
</template>
<script setup>
  import AdminCredentialsInputDialog from "~/components/AdminCredentialsInputDialog.vue";
  import CustomerDialog from "~/components/CustomerDialog.vue";

  const nameSearch = ref();
  const nitSearch = ref();
  const { data, error, status, refresh } = useAsyncData(
    () =>
      $api("/customers", {
        params: {
          name: nameSearch.value || undefined,
          nit: nitSearch.value || undefined,
        },
      }),
    {
      watch: [nameSearch, nitSearch],
    },
  );

  const showAdminCredsDialog = ref(false);
  const showCustomerDialog = ref(false);
  const editCustomer = ref(false);
  const customerData = ref({
    name: "",
    nit: "",
    phone: "",
  });

  const abortEditCustomerAction = () => {
    customerData.value = {
      name: "",
      nit: "",
      phone: "",
    };
  };

  const handleEditCustomerAction = (customer) => {
    editCustomer.value = true;
    showAdminCredsDialog.value = true;
    customerData.value = { ...customer };
  };
  
  definePageMeta({
    layout: "cashier",
  });
</script>
<style lang="postcss" scoped></style>
