<template>
  <div>
    <chat-window v-for="chat in chats" :chat="chat" :key="chat._id" />
  </div>
</template>


<script>
import ChatWindow from "./ChatWindow/ChatWindow.vue";

export default {
  components: {
    ChatWindow
  },
  computed: {
    chats() {
      return this.$store.getters.chats
    }
  }
};
</script>


<style scoped>
</style>


