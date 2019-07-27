<template>
  <span class="app-chat">
    <contact-cmp class="contact-cmp" />
    <chat-window v-for="(chat, idx) in chats" :chat="chat" :idx="idx" :key="chat._id" />
  </span>
</template>


<script>
import ContactCmp from "./ContactCmp/ContactCmp.vue";
import ChatList from "./ChatList.vue";
import ChatWindow from './ChatWindow/ChatWindow.vue'
export default {
  components: {
    ContactCmp,
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
.app-chat {
  position: fixed;
  bottom: 0;
  right: 7%;
  color: rgb(50, 50, 50);
  height: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.app-chat > *  {
  margin-right: 15px;
}

.contact-cmp {
  order: 1;
}
</style>







