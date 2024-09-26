<template>
  <div>
    <h1 class="pb-6 d-flex align-center">
      <v-btn
        variant="text"
        icon="mdi-close"
        @click="handleGoHome"
        color="indigo-lighten-1"
        class="mr-2"
      />Venta
    </h1>
    <v-row>
      <v-col cols="12">
        <v-btn
          size="large"
          prepend-icon="mdi-check"
          text="Finalizar venta"
          color="green-lighten-1"
          @click="processSale"
          :disabled="saleProducts.length === 0"
        />
      </v-col>
    </v-row>
    <v-checkbox label="Consumidor Final (C/F)?" v-model="asCf" />
    <v-form @submit.prevent="handleCustomerSearch">
      <v-row>
        <v-col cols="3">
          <v-text-field
            focused
            :disabled="asCf"
            v-model="nitToSearch"
            label="NIT del cliente"
            type="number"
            messages="Ingresa el NIT del cliente y presiona ENTER para buscarlo o crear uno nuevo"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            readonly
            :disabled="asCf"
            label="Nombre del cliente"
            :model-value="currentCustomer?.name"
          />
        </v-col>
        <v-col cols="3">
          <v-btn
            color="indigo-lighten-1"
            type="submit"
            :loading="loading"
            prepend-icon="mdi-magnify"
            :disabled="asCf"
            >Buscar cliente</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="8">
        <v-data-table
          :headers="[
            { title: 'Código', value: 'code' },
            { title: 'Nombre', value: 'name' },
            { title: 'Cantidad', value: 'amount' },
            { title: 'Precio', value: 'price' },
            { title: 'Total', value: 'total' },
            { title: 'Acciones', value: 'actions', sortable: false },
          ]"
          :items="saleProducts"
        >
          <template #item.actions="{ item }">
            <v-btn
              icon="mdi-delete"
              variant="text"
              color="red-lighten-1"
              @click="handleDeleteProduct(item.id)"
            />
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="4">
        <h3>Agregado de productos</h3>
        <p class="text-caption">
          Si se agrega un producto con el mismo código, se actualizará la
          cantidad.
        </p>
        <v-row>
          <v-col cols="12">
            <v-switch
              class="mb-n10"
              direction="horizontal"
              inset
              :disabled="!currentCustomer"
              v-model="productSearchType"
              :label="productSearchType ? 'Por código' : 'Por nombre'"
              color="indigo-lighten-1"
            />
          </v-col>
          <v-col cols="12">
            <VNumberInput
              v-model="amount"
              controlVariant="stacked"
              label="Cantidad"
              :disabled="!selectedProductId || !currentCustomer"
              class="mb-n6"
              :min="1"
              variant="outlined"
            ></VNumberInput>
          </v-col>
          <v-col cols="10">
            <v-autocomplete
              no-filter
              v-model="selectedProductId"
              :item-title="(item) => item.name"
              :item-value="(item) => item.id"
              :items="products"
              label="Buscar producto"
              :loading="loadingProducts"
              :clearable="true"
              :disabled="!currentCustomer"
              @input="
                ($event) => {
                  getProduct({ value: $event.target.value });
                }
              "
            />
          </v-col>
          <v-col cols="2">
            <v-btn
              color="indigo-darken-1"
              icon="mdi-cart-plus"
              @click="handleAddProduct(selectedProductId, amount)"
              :disabled="!selectedProductId || !currentCustomer"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <CustomerNotFoundDialog
      v-model="notFoundDialogShow"
      @accept="customerDialogShow = true"
    />
    <CustomerDialog
      v-model="customerDialogShow"
      v-model:customerData="customerData"
      :clear-on-open="false"
      @created="
        ($event) => {
          nitToSearch = $event;
          handleCustomerSearch();
        }
      "
    />
  </div>
</template>
<script setup>
  import { VNumberInput } from "vuetify/labs/components";
  import CustomerDialog from "~/components/CustomerDialog.vue";
  import { useSaleStore } from "~/store/sale";

  //Stores
  const {
    getCustomerByNit,
    getProduct,
    handleAddProduct,
    handleDeleteProduct,
    processSale,
  } = useSaleStore();
  const {
    loading,
    asCf,
    currentCustomer,
    productSearchType,
    products,
    saleProducts,
    loadingProducts,
  } = storeToRefs(useSaleStore());

  const handleGoHome = () => {
    if (
      confirm(
        "¿Estás seguro de que deseas salir de la venta? Se perderán los datos no guardados.",
      )
    ) {
      navigateTo("/cashier");
    }
  };

  // Searches

  const selectedProductId = ref();
  const amount = ref(1);

  const nitToSearch = ref();

  const handleCustomerSearch = async () => {
    const customerResponse = await getCustomerByNit(nitToSearch.value);
    if (customerResponse.error) {
      notFoundDialogShow.value = true;
      customerData.value.nit = nitToSearch.value;
    }
  };

  //Customer dialog
  const customerData = ref({
    name: "",
    nit: "",
    phone: "",
  });

  // Dialogs handling
  const notFoundDialogShow = ref(false);
  const customerDialogShow = ref(false);
  definePageMeta({
    layout: "cashier",
  });
</script>
<style lang="scss" scoped></style>
