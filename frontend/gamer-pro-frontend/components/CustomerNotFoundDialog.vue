<template>
  <v-dialog v-model="model" max-width="400">
    <v-card title="Cliente no encontrado">
      <v-card-text>
        <p>El cliente con el NIT buscado no se encuentra registrado.</p>
        <p>¿Deseas crear un nuevo cliente con este NIT?</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="indigo-lighten-1" @click="()=>{emit('accept'); model = false}"
          >Crear cliente</v-btn
        >
        <v-btn color="indigo-lighten-1"
        @click="model = false; emit('cancel')"
        >Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
  const model = defineModel({
    type: Boolean,
    default: false,
  });

  const emit = defineEmits(["accept", "cancel"]);
</script>
<style lang="scss" scoped></style>
