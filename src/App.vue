<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="router" />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader/AppHeader.vue";

export default {
  components: {
    AppHeader
  }
};
</script>


<style>
#app {
  font-family: sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.router {
  flex-grow: 1;
}
</style>
