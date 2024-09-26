<template>
  <div class="testdata">
    <v-btn size="small" @click="setTestData('cashier')">Cajero</v-btn>
    <v-btn size="small" @click="setTestData('admin')">Administrador</v-btn>
    <v-btn size="small" @click="setTestData('warehouse')">Almacén</v-btn>
    <v-btn size="small" @click="setTestData('inventory')">Inventario</v-btn>
  </div>
  <div class="screen-fill-center">
    <v-row justify="center">
      <v-col cols="3">
        <v-card class="pa-4">
          <v-card-title>
            <h2 class="mb-8">Inicio de sesión</h2>
          </v-card-title>
          <v-card-text>
            <v-form
              @submit.prevent="login(username, password)"
              :disabled="loading"
            >
              <v-text-field
                v-model="username"
                label="Nombre de usuario"
                type="username"
                prepend-icon="mdi-account"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                required
                append-icon="mdi-eye"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-btn
                variant="tonal"
                block
                append-icon="mdi-login"
                class="mt-6"
                :loading
                type="submit"
              >
                Ingresar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
  import { useSessionStore } from "~/store/session";

  const { login } = useSessionStore();
  const { loading } = storeToRefs(useSessionStore());
  const username = ref("");
  const password = ref("");
  const showPassword = ref(false);

  const setTestData = (role) => {
    switch (role) {
      case "cashier":
        username.value = "Guadalupe.CavazosMendez10";
        password.value = "Guadalupe.CavazosMendez10_password";
        break;
      case "admin":
        username.value = "superadmin1";
        password.value = "superadmin1_password";
        break;
      case "warehouse":
        username.value = "Dorotea.DuranGuerra45";
        password.value = "Dorotea.DuranGuerra45_password";
        break;
      case "inventory":
        username.value = "Isabela_FriasCazares91";
        password.value = "Isabela_FriasCazares91_password";
        break;
    }
  };
</script>
<style lang="postcss" scoped>
  .testdata {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
</style>
