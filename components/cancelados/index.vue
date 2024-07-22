<template>
  <div id="burger-table">
    <v-card-title
      class="font-weight-bold text-center mt-16 pt-15"
      style="font-size: 42px"
    >
      Pedidos Cancelados
    </v-card-title>
    <v-table theme="dark">
      <thead>
        <tr>
          <th>#:</th>
          <th class="text-left font-weight-bold">Cliente:</th>
          <th class="text-left font-weight-bold">Pão:</th>
          <th class="text-left font-weight-bold">Carne:</th>
          <th class="text-left font-weight-bold">Opcionais:</th>
          <th class="text-left font-weight-bold">Status:</th>
          <th class="text-left font-weight-bold">Ações:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="burger in burgers" :key="burger.id">
          <td class="text-left">{{ burger.id }}</td>
          <td class="text-left">{{ burger.nome }}</td>
          <td class="text-left">{{ burger.pao }}</td>
          <td class="text-left">{{ burger.carne }}</td>
          <td class="text-left">
            <div class="opcionais-columns">
              <div
                v-for="opcional in burger.opcionaisdata"
                :key="opcional"
                class="opcional-item"
              >
                {{ opcional }}
              </div>
            </div>
          </td>
          <td class="text-left">Cancelado</td>
          <td class="text-left">
            <div>
              <v-btn id="botao" @click="deleteCancelados(burger.id)">
                <v-icon size="25" icon="mdi-delete-outline"></v-icon>
                <p style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Excluir</p>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';

const props = defineProps({
  Cancelado: {
    type: Boolean,
    default: false,
  },
});


const burgers = ref(null);

const getPedidosCancelados = async () => {
  const req = await fetch("http://localhost:3001/cancelados");
  const data = await req.json();
  burgers.value = data;
};

const deleteCancelados = async (id) => {
  const req = await fetch(`http://localhost:3001/cancelados/${id}`, {
    method: "DELETE",
  });
  const res = await req.json();
  getPedidosCancelados()
};

onMounted(() => {
  getPedidosCancelados()
});
</script>

<style scoped>
#burger-table-heading {
  border-bottom: 3px solid #333;
  justify-content: space-between;
}

#burger-table {
  width: 1200px;
  margin: auto;
}

.opcionais-columns {
  display: flex;
  flex-direction: column; /* Colunas em coluna */
}

.opcional-item {
  margin: 2px 0; /* Espaçamento entre os opcionais */
}

#botao {
  border: none;
  background-color: #FFEB3F;
  color:black;
}

#botao:hover {
  background-color: aliceblue;
  color: black;
}
</style>