<template>
  <v-btn text="mostrar datos de prueba" @click="showTestData = !showTestData" />
  <div class="testdata" v-if="showTestData">
    <v-btn size="small" @click="setTestData('cashier1')">Cajero1</v-btn>
    <v-btn size="small" @click="setTestData('cashier2')">Cajero2</v-btn>
    <v-btn size="small" @click="setTestData('cashier3')">Cajero3</v-btn>
    <v-btn size="small" @click="setTestData('admin')">Administrador</v-btn>
    <v-btn size="small" @click="setTestData('warehouse1')">Almacén1</v-btn>
    <v-btn size="small" @click="setTestData('warehouse2')">Almacén2</v-btn>
    <v-btn size="small" @click="setTestData('warehouse3')">Almacén3</v-btn>
    <v-btn size="small" @click="setTestData('inventory1')">Inventario1</v-btn>
    <v-btn size="small" @click="setTestData('inventory2')">Inventario2</v-btn>
    <v-btn size="small" @click="setTestData('inventory3')">Inventario3</v-btn>
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

  const showTestData = ref(false);

  const setTestData = (role) => {
    switch (role) {
      case "admin":
        username.value = "superadmin1";
        password.value = "superadmin1_password";
        break;
      case "cashier1":
        username.value = "Guadalupe.CavazosMendez10";
        password.value = "Guadalupe.CavazosMendez10_password";
        break;
      case "cashier2":
        username.value = "Marta.LlamasZamora";
        password.value = "Marta.LlamasZamora_password";
        break;
      case "cashier3":
        username.value = "LuisMiguel.PichardoZelaya";
        password.value = "LuisMiguel.PichardoZelaya_password";
        break;
      case "warehouse1":
        username.value = "Dorotea.DuranGuerra45";
        password.value = "Dorotea.DuranGuerra45_password";
        break;
      case "warehouse2":
        username.value = "Reina_FloresAlonso";
        password.value = "Reina_FloresAlonso_password";
        break;
      case "warehouse3":
        username.value = "MariadelCarmen.QuezadaBueno";
        password.value = "MariadelCarmen.QuezadaBueno_password";
        break;
      case "inventory1":
        username.value = "Sancho_VegaLugo62";
        password.value = "Sancho_VegaLugo62_password";
        break;
      case "inventory2":
        username.value = "Horacio.ArteagaTello";
        password.value = "Horacio.ArteagaTello_password";
        break;
      case "inventory3":
        username.value = "Gregorio_EspinozaMendoza";
        password.value = "Gregorio_EspinozaMendoza_password";
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
