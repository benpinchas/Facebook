<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="router" />
    <app-chat/>
    <app-theme/>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader/AppHeader.vue";
import AppChat from './components/AppChat/AppChat.vue'
import AppTheme from './components/util/App-Theme/App-Theme.vue'
export default {
  components: {
    AppHeader,
    AppChat,
    AppTheme
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
