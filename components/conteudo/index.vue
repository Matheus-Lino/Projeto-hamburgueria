<template>
  <div>
    <message :ShowModal="ShowModal" @CloseModal="ShowModal = false" />
    <v-img
      id="burger"
      height="500"
      class="d-flex align-items-center justify-content-flex-start"
    ></v-img>
     
    <div class="text-center">
      <v-row>
        <v-col>
          <v-card-title id="title" class="font-weight-bold mt-10">Monte o seu Lanche</v-card-title>
          <v-card-title class="font-weight-bold">Nome do cliente:</v-card-title>
          <v-text-field
            v-model="nome"
            name="nome"
            width="390"
            class="mx-auto"
            label="Digite o seu nome"
            required
            variant="outlined" 
          ></v-text-field>

          <v-card-title class="font-weight-bold">Escolha o pão:</v-card-title>
          <v-select
            v-model="pao"
            :items="paes"
            width="390"
            class="mx-auto"
            label="Selecione o tipo de pão"
            variant="outlined"
          ></v-select>

          <!-- <v-btn @click="console.log(paes)"></v-btn> -->

           <v-card-title class="font-weight-bold">Escolha a carne:</v-card-title>
          <v-select
            v-model="carne"
            :items="carnes"
            width="390"
            class="mx-auto"
            label="Selecione o tipo de carne"
            variant="outlined"
          ></v-select>

          <v-card-title id="title2" class="font-weight-bold">Opcionais:</v-card-title>
          <v-select
            v-model="opcionaisdata"
           :items="opcionais"
            multiple
            width="390"
            class="mx-auto"
            label="Selecione os opcionais"
            variant="outlined"
            
          ></v-select> 
          <v-btn id="botao" class="pa-6 d-flex align-items-center mx-auto" @click="createdBurger">Finalizar pedido</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import ShowModal from '../message/index.vue'

const paes = ref([]);
const carnes = ref([]);
const opcionaisdata = ref([]);
const nome = ref('');
const pao = ref('');
const carne = ref('');
const opcionais = ref([]);
const msg = ref(null);
const ShowModal = ref(false);

//Função dos ingredientes exibido pela API
const getIngredientes = async () => {

  const req = await fetch("http://localhost:3001/ingredientes");
  const data = await req.json();

  // console.log("Dados recebidos da API:", data);

  for (let i = 0; i < data.paes.length; i++){
    paes.value.push(data.paes[i].tipo);
  }

  for (let i = 0; i < data.carnes.length; i++){
    carnes.value.push(data.carnes[i].tipo)
  }

  for (let i = 0; i < data.opcionais.length; i++){
    opcionais.value.push(data.opcionais[i].tipo)
  }
}

//Função do botão e pedidos
const createdBurger = async () => {
  const data = {
    nome: nome.value,
    carne: carne.value,
    pao: pao.value,
    opcionaisdata: Array.from(opcionaisdata.value),
    status: "Solicitado"
  };

  //Envia os pedidos ao banco de dados e recebe de volta um ID
  console.log(data)
  const dataJson = JSON.stringify(data)
  const req = await fetch("http://localhost:3001/burgers", {
    method: "POST",
    headers: {"content-Type": "application/json"},
    body: dataJson
  })
  if (req.ok) {
      const res = await req.json();
      console.log('Resposta do servidor:', res);
    } else {
      console.error('Erro ao criar burger:', req.status, req.statusText);
    }

    ShowModal.value = true;

    //Limpa os campos
    nome.value = ""
    carne.value = ""
    pao.value = ""
    opcionaisdata.value = []
}


onMounted(() => {
  getIngredientes();
});
</script>

<style scoped>
#burger {
  background-image: url('../../public/grilled-gourmet-cheeseburger-homemade-with-fresh-meat-tomato-onion-generated-by-artificial-intelligence.jpg');
  background-position: 0 -210px;
  background-size: cover;
}
#title {
  font-size: 42px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#botao {
  background-color: #FFEB3F;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#botao:hover {
  background-color: rgb(0, 0, 0);
  color: white;
}
</style>