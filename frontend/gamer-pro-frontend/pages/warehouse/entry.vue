<template>
  <div>
    <h1 class="pb-6 d-flex align-center">
      <v-btn
        variant="text"
        icon="mdi-arrow-left"
        to="/cashier"
        color="yellow-darken-2"
        class="mr-2"
      />
      Entrada de productos
    </h1>
    <v-row>
      <v-col cols="3">
        <v-btn
          color="yellow-darken-2"
          @click="handleNewProductAction"
          prepend-icon="mdi-plus"
          class="mb-6"
          >Ingresar producto</v-btn
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
    </v-row>
    <v-data-table
      class="mt-6 rounded-lg"
      v-if="data"
      :headers="[
        { title: 'ID', value: 'id' },
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
          @click="handleEditItemAction(item)"
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
        title="Ingreso de producto"
      >
        <v-card-text>
          <v-form
            @submit.prevent="handleSubmitAction"
            class="d-flex flex-column ga-4"
          >
            <v-text-field
              v-model="dataToSend.name"
              :disabled="edit"
              label="Nombre del producto"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="dataToSend.code"
              :disabled="edit"
              label="Codigo"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="dataToSend.price"
              :disabled="edit"
              label="Precio"
              variant="outlined"
            ></v-text-field>
            <v-select
              v-model="dataToSend.category_id"
              :disabled="edit"
              :items="[
                { title: 'Juegos', value: 1 },
                { title: 'Consolas', value: 2 },
                { title: 'Accesorios', value: 3 },
                { title: 'Controles', value: 4 },
              ]"
              label="Categoria"
              variant="outlined"
            ></v-select>
            <v-text-field
              v-model="dataToSend.warehouse_aisle"
              :disabled="edit"
              label="Pasillo de bodega"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="dataToSend.warehouse_stock"
              label="Stock de bodega"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="dataToSend.new_warehouse_aisle"
              label="Nuevo pasillo de bodega"
              :disabled="!edit"
              variant="outlined"
            ></v-text-field>

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
  import { useSessionStore } from "~/store/session";
  import { SnackbarType, useSnackbarStore } from "~/store/snackbar";

  const loading = ref(false);
  const nameSearch = ref();
  const { session } = useSessionStore();
  const { data, error, status, refresh } = await useAsyncData(
    () =>
      $api(`/warehouse?branch_id=${session.branch.id}`, {
        params: {
          product_name: nameSearch.value || undefined,
        },
      }),
    {
      watch: [nameSearch],
    },
  );

  const dataToSend = ref({
    name: "",
    code: null,
    price: null,
    category_id: 0,
    warehouse_aisle: null,
    warehouse_stock: null,
    branch_id: session.branch.id,
    new_warehouse_aisle: null,
  });

  const edit = ref(false);
  const dialog = ref(false);

  const handleNewProductAction = () => {
    dialog.value = true;
    edit.value = false;
    dataToSend.value = {
      id: null,
      name: "",
      code: null,
      price: null,
      category_id: 0,
      warehouse_aisle: null,
      warehouse_stock: null,
      branch_id: session.branch.id,
      new_warehouse_aisle: null,
    };
  };
  const handleEditItemAction = (item) => {
    dataToSend.value.id = item.id;
    dataToSend.value.name = item.name;
    dataToSend.value.code = item.code;
    dataToSend.value.price = item.price;
    dataToSend.value.category_id = item.category_id;
    dataToSend.value.warehouse_aisle = item.warehouse_aisle;
    dataToSend.value.warehouse_stock = item.warehouse_stock;
    dataToSend.value.new_warehouse_aisle = item.new_warehouse_aisle;
    dialog.value = true;
    edit.value = true;
  };

  const handleSubmitAction = async () => {
    try {
      loading.value = true;
      const route = edit.value ? `/warehouse/${dataToSend.value.id}` : "/warehouse";
      await $api(route, {
        method: edit.value ? "PATCH" : "POST",
        body: dataToSend.value,
      });
      dialog.value = false;
      useSnackbarStore().showSnackbar({
        messageToShow: "Producto ingresado correctamente",
        typeOf: SnackbarType.SUCCESS,
        titleToShow: "Exito",
      });
      refresh();
    } catch (error) {
      useSnackbarStore().showSnackbar({
        messageToShow: error.data.message,
        typeOf: SnackbarType.ERROR,
        titleToShow: "Error",
      });
    } finally {
      loading.value = false;
    }
  };
  definePageMeta({
    layout: "warehouse",
  });
</script>
<style lang="postcss" scoped></style>
