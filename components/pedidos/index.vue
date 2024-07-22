<template>
  <div id="burger-table">
    <cancelar :ShowModal="ShowModal" @CloseModal="ShowModal = false" />
    <v-card-title
      class="font-weight-bold text-center mt-16 pt-15"
      style="font-size: 42px"
    >
      Gerenciar pedidos
    </v-card-title>
    <v-table theme="dark">
      <thead>
        <tr>
          <th>#:</th>
          <th class="text-left font-weight-bold">Cliente:</th>
          <th class="text-left font-weight-bold">Pão:</th>
          <th class="text-left font-weight-bold">Carne:</th>
          <th class="text-left font-weight-bold">Opcionais:</th>
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
          <td class="text-left">
            <div class="d-flex align-center mt-3">
              <v-select
                color="yellow"
                label="Status"
                :items="status"
                v-model="burger.status"
                @change="updatedBurger($event, burger.id)"
                variant="outlined"
              ></v-select>
              <v-btn
                id="botao"
                size="large"
                class="ml-5 mb-6"
                @click="cancelados(burger)"
                >Cancelar</v-btn
              >
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

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
  background-color: #FFEB3F;
  color:black;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#botao:hover {
  background-color: aliceblue;
  color: black;
}
</style>

<script setup>
import { ref, onMounted, watch } from "vue";

const burgers = ref(null);
const status = ref([]);
const ShowModal = ref(false);

const cancelados = async (burger) => {
  console.log(burger);

  const data = {
    nome: burger.nome,
    carne: burger.carne,
    pao: burger.pao,
    opcionaisdata: Array.from(burger.opcionaisdata),
  };

  const dataJson = JSON.stringify(data);
  const req = await fetch("http://localhost:3001/cancelados", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: dataJson,
  });

  if (req.ok) {
    const res = await req.json();
    // console.log('Resposta do servidor:', res);

    deleteBurger(burger.id);
  } else {
    console.error("Erro ao criar burger:", req.status, req.statusText);
  }
};

//Pedidos
const getPedidos = async () => {
  const req = await fetch("http://localhost:3001/burgers");
  const data = await req.json();
  burgers.value = data;
  getStatus();
};

//Cancelados

//Status
const getStatus = async () => {
  const req = await fetch("http://localhost:3001/status");
  const data = await req.json();
  // console.log(data);

  for (let i = 0; i < data.length; i++) {
    status.value.push(data[i].tipo);
  }
};

//Função para deletar os pedidos
const deleteBurger = async (id) => {
  const req = await fetch(`http://localhost:3001/burgers/${id}`, {
    method: "DELETE",
  });
  ShowModal.value = true;
  const res = await req.json();
  getPedidos();
};

const updatedBurger = async (event, id) => {
  try {
    // Obter o novo status do elemento que disparou o evento
    const newStatus = event.target.value;

    // Montar o objeto com os dados que serão enviados na requisição PATCH
    const dataJson = JSON.stringify({ status: newStatus });

    // Enviar a requisição PATCH para atualizar o status do pedido
    const req = await fetch(`http://localhost:3001/burgers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    });

    // Verificar se a requisição foi bem-sucedida
    if (!req.ok) {
      throw new Error(`HTTP error! Status: ${req.status}`);
    }

    // Processar a resposta da requisição
    const res = await req.json();
    console.log(res);

    // Atualizar a lista de pedidos após a atualização
    getPedidos();
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    // Tratar o erro de forma apropriada, conforme necessário para o seu aplicativo
  }
};

//Montar tela
onMounted(() => {
  getPedidos();
});
</script>
