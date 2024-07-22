<template>
  <div class="text-center pa-4">
    <v-dialog
      id="dialog"
      v-model="props.ShowModal"
      width="auto"
    >
      <v-card
        id="card"
        max-width="400"
        prepend-icon="mdi-checkbox-marked-circle-outline"
        title="Pedido realizado com sucesso (:"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            @click="$emit('CloseModal')"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
   const props = defineProps({
        ShowModal: {
            type: Boolean,
            default: false
        },
    });

    const emits = defineEmits(['CloseModal'])

    const showDialog = ref(false);

//cria um intervalo de 1 segundo pra exibir e sumir o modal
watch(() => props.ShowModal, (newValue) => {
  if (newValue) {
    showDialog.value = true;
    setTimeout(() => {
      showDialog.value = false;
      emits('CloseModal');
    }, 1200);
  }
});

const closeModal = () => {
  showDialog.value = false;
  emits('CloseModal');
};
</script>

<style scoped>
#card {
  text-align: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 20px;
}
</style>
