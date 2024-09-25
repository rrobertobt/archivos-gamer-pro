<template>
  <div class="screen-fill-center">
    <v-row justify="center">
      <v-col cols="3">
        <v-card class="pa-4">
          <v-card-title>
            <h2 class="mb-8">
              Inicio de sesión
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
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
                type="password"
                prepend-icon="mdi-lock"
                required
              ></v-text-field>
              <v-btn
                variant="tonal"
                block
                append-icon="mdi-login"
                class="mt-6"
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
const username = ref('');
const password = ref('');

const login = () => {
  console.log('Login', username.value, password.value);
};
</script>
<style lang="postcss" scoped>
</style>