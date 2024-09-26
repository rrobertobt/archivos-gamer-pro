<template>
  <div>
    
    <h1 class="pb-6 d-flex align-center">
      <v-btn
        variant="text"
        icon="mdi-arrow-left"
        to="/cashier"
        color="red-lighten-1"
        class="mr-2"
      />
      Traslados hacia estanterías
    </h1>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="nameSearch"
          append-inner-icon="mdi-magnify"
          label="Buscar por nombre"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      class="mt-6 rounded-lg"
      v-if="data"
      :headers="[
        {title: 'ID', value: 'id'},
        { title: 'Nombre', value: 'name' },
        { title: 'Codigo', value: 'code' },
        { title: 'Stock bodega', value: 'stock[0].warehouse_stock' },
        { title: 'Stock estantería', value: 'stock[0].store_stock' },
        { title: 'Pasillo boodega', value: 'stock[0].warehouse_aisle' },
        { title: 'Pasillos estantería', value: 'stock[0].store_aisle' },
      
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
    <v-dialog v-model="dialog" width="auto">
      <v-card
      min-width="400"
      prepend-icon="mdi-transfer"
      title="Trasladar producto a estantería"
    >
    <v-card-text>
      <v-form
        @submit.prevent="handleSaveAction"
        
        class="d-flex flex-column ga-4"
      >
      <VNumberInput
              v-model="dataToSend.stock_to_move"
              controlVariant="stacked"
              label="Cantidad"
              class="mb-n6"
              :min="1"
              variant="outlined"
            ></VNumberInput>
        <v-row>
          <v-col cols="6"
            ><v-btn
              block
              text="Cancelar"
              @click="dialog = false"
              color="error"
            ></v-btn
          ></v-col>
          <v-col cols="6"
            ><v-btn
              block
              color="primary"
              type="submit"
              append-icon="mdi-check"

            >
              Guardar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
  import { VNumberInput } from "vuetify/labs/components";
  import { useSessionStore } from "~/store/session";
import { SnackbarType, useSnackbarStore } from "~/store/snackbar";

  const loading = ref(false);
  const nameSearch = ref();
  const { session } = useSessionStore();
  const { data, error, status, refresh } = await useAsyncData(
    () =>
      $api(`/inventory?branch_id=${session.branch.id}`, {
        params: {
          product_name: nameSearch.value || undefined,
        },
      }),
    {
      watch: [nameSearch],
    },
  );

  const dataToSend = ref({
    branch_id: session.branch.id,
    product_id: null,
    stock_to_move: null,
  });

  const handleEditCustomerAction = (item) => {
    dataToSend.value.product_id = item.id;
    dialog.value = true;
  };

  const handleSaveAction = async () => {
    try {
      loading.value = true;
      await $api("/inventory",{
        method: "PATCH",
        body: dataToSend.value,
      });
      dialog.value = false;
      refresh();
    } catch (error) {
      useSnackbarStore().showSnackbar({
        messageToShow: error.data.message,
        typeOf: SnackbarType.ERROR,
        titleToShow: "Error",
      })
    } finally {
      loading.value = false;
    }

  };

  const dialog = ref(false);
  definePageMeta({
    layout: "inventory",
  });
</script>
<style lang="scss" scoped></style>
