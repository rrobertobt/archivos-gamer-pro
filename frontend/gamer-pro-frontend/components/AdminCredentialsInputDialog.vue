<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      min-width="400"
      max-width="500"
      prepend-icon="mdi-account-key"
      title="Verificar credenciales de administrador"
      >      
      <v-card-text>
        <v-btn icon="mdi-key" size="sm" @click="()=>{adminCredentials.username = 'superadmin1'; adminCredentials.password = 'superadmin1_password'}"/>
        <p class="text-caption mb-4 text-medium-emphasis">
          Para realizar esta acción, necesitas permisos de administrador. Solicita que un administrador ingrese sus credenciales.
        </p>
        <v-form
          @submit.prevent="handleVerify"
          ref="form"
          class="d-flex flex-column ga-4"
        >
          <v-text-field
            v-model="adminCredentials.username"
            label="Nombre de usuario"
            :rules="[(v) => !!v || 'Este campo es requerido']"
            required
          ></v-text-field>
          <v-text-field
            v-model="adminCredentials.password"
            label="Contraseña"
            :rules="[(v) => !!v || 'Este campo es requerido']"
            required
            type="password"
          ></v-text-field>
          <v-row>
            <v-col cols="6"
              ><v-btn
                block
                class="ms-auto"
                text="Cancelar"
                @click="{dialog = false; emit('cancel')}"
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
                append-icon="mdi-check"
              >
                Verificar
              </v-btn></v-col
            >
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
  import { useSessionStore } from "~/store/session";

  const adminCredentials = reactive({
    username: "",
    password: "",
  });

  const { checkAdminCredentials } = useSessionStore();
  const { loading } = storeToRefs(useSessionStore());
  const dialog = defineModel({
    type: Boolean,
    default: false,
  });

  const emit = defineEmits(["success", "error", "cancel"]);

  const handleVerify = async () => {
    const response = await checkAdminCredentials(adminCredentials.username, adminCredentials.password);
    if (!response.error) {
      emit("success");
    } else {
      emit("error", response.error);
    }
  };

  watch(dialog, async (value) => {
    if (value) {
      await nextTick();
      adminCredentials.username = "";
      adminCredentials.password = "";
    }
  });
</script>
<style lang="scss" scoped></style>
