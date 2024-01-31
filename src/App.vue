<template>
  <v-app id="inspire" class="pt-15">
    <Header />
    <HomeView />
  </v-app>
</template>

<script setup>
import Header from './views/Header.vue'
import HomeView from './views/HomeView.vue'
</script>

<style>
* {
  font-family: 'Roboto', sans-serif;
}
#inspire {
  width: 1224px;
  margin: 0 auto;
}
</style>
