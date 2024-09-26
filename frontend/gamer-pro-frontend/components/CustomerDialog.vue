<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      min-width="400"
      :prepend-icon="edit ? 'mdi-pencil' : 'mdi-account-plus'"
      :title="edit ? 'Editar cliente' : 'Nuevo cliente'"
    >
      <v-card-text>
        <v-form
          @submit.prevent="handleCreateCustomer"
          ref="form"
          class="d-flex flex-column ga-4"
        >
          <v-text-field
            v-model="customerData.name"
            label="Nombre"
            :rules="[(v) => !!v || 'Este campo es requerido']"
            required
          ></v-text-field>
          <v-text-field
            v-model="customerData.nit"
            label="NIT"
            :rules="[(v) => !!v || 'Este campo es requerido']"
            required
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="customerData.phone"
            label="Teléfono"
            :rules="[(v) => !!v || 'Este campo es requerido']"
            required
          ></v-text-field>
          <v-row>
            <v-col cols="6"
              ><v-btn
                block
                class="ms-auto"
                text="Cancelar"
                @click="dialog = false"
                :disabled="loading"
                color="error"
              ></v-btn
            ></v-col>
            <v-col cols="6"
              ><v-btn
                block
                color="primary"
                type="submit"
                :loading="loading"
                :append-icon="edit ? 'mdi-pencil' : 'mdi-plus'"
              >
                {{ edit ? "Guardar" : "Crear" }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
  import { useCustomerStore } from "~/store/customer";

  const props = defineProps({
    edit: Boolean,
    clearOnOpen: {
      type: Boolean,
      default: true,
    },
  });

  const { createCustomer,updateCustomer } = useCustomerStore();
  const { loading } = storeToRefs(useCustomerStore());

  const form = ref();

  const dialog = defineModel({
    type: Boolean,
    default: false,
  });

  const customerData = defineModel("customerData", {
    type: Object,
    default: () => ({
      name: "",
      nit: "",
      phone: "",
    }),
  });
  watch(dialog, async (value) => {
    if (value && !props.edit && props.clearOnOpen) {
      await nextTick();
      form.value.reset();
    }
  });

  const emit = defineEmits(["created"]);
  const handleCreateCustomer = async () => {
    const { valid } = await form.value.validate();

    if (!valid) return;

    const result = props.edit
      ? await updateCustomer(customerData.value.id, customerData.value)
      : await createCustomer(customerData.value);

    !result.error ? (dialog.value = false) : null;
    emit("created", result.response.nit);
  };
</script>
<style lang="scss" scoped></style>
