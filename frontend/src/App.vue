<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="router" />
    <app-chat />
    <!-- <app-theme/> -->
    <mobile-bar />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader/AppHeader.vue";
import AppChat from "./components/AppChat/AppChat.vue";
import AppTheme from "./components/util/App-Theme/App-Theme.vue";
import MobileBar from "./components/MobileBar/MobileBar.vue";
import socket from "./services/SocketService.js";
export default {
  components: {
    AppHeader,
    AppChat,
    AppTheme,
    MobileBar
  },
  mounted() {
    if (this.$store.getters.loggedInUser) {
      this.$store.dispatch({ type: "listenSocketEvents" });
      socket.emit("user active", this.$store.getters.loggedInUser._id);
    }
  },
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
