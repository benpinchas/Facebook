<template>
  <div>
    <chat-window v-for="(chat, idx) in chats" :chat="chat" :idx="idx" :key="chat._id" />
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
      console.log(this.$store.getters.chatsForDesktop)
      return this.$store.getters.chatsForDesktop
    }
  }
};
</script>


<style scoped>
</style>


