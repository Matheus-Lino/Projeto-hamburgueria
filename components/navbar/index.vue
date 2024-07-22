<template>
  <div>
    <v-navigation-drawer v-model="isDrawerOpen" color="black" width="200">
      <v-list>
        <v-list-item @click="page('home')">
          <v-list-item-content>
            <v-row align="center">
              <v-col cols="auto">
                <v-icon icon="mdi-home" color="yellow"></v-icon>
              </v-col>
              <v-col>
                <v-list-item-title color="yellow">Inicio</v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="page('pedidos')">
          <v-list-item-content>
            <v-row align="center">
              <v-col cols="auto">
                <v-icon icon="mdi-hamburger" color="yellow"></v-icon>
              </v-col>
              <v-col>
                <v-list-item-title color="yellow">Pedidos</v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="page('cancelados')">
          <v-list-item-content>
            <v-row align="center">
              <v-col cols="auto">
                <v-icon icon="mdi-cancel" color="yellow"></v-icon>
              </v-col>
              <v-col>
                <v-list-item-title @click="page('cancelados')" color="yellow">Cancelados</v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar height="80" class="d-flex justify-content-space-between align-items-center bg-black">
      <v-app-bar-nav-icon variant="text" @click.stop="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>

      <v-row class="d-flex align-center">
        <div class="d-flex align-center ml-10">
          <v-img src="../../public/logo.png" height="60" style="width: 45px !important; flex: auto !important;"></v-img>
          <h1 style="margin-left: 10px;">Make you burger</h1>
        </div>

        <v-col>
          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="auto">
          <v-btn id="botao" @click="page('home')">Inicio</v-btn>
          <v-btn id="botao" @click="page('pedidos')">Pedidos</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const isDrawerOpen = ref(false);
  const menu = ref([]);

  const page = (route) => {
    if (route === 'home') {
      router.push('/Home');
    } else if (route === 'pedidos') {
      router.push('/Pedidos');
    } else {
      router.push('/Cancelados')
    }
  };
</script>
