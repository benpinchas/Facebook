<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="router" />
    <app-chat/>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader/AppHeader.vue";
import AppChat from './components/AppChat/AppChat.vue'
export default {
  components: {
    AppHeader,
    AppChat
  },
  created() {
    this.$store.dispatch({type:'socketListener'})
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
