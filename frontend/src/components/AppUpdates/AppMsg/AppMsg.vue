<template>
  <div  @click="toggleWindow">
    <i class="fab fa-facebook-messenger header-icon"></i>

    <updates-window v-if="isWindow">
         <span slot="top">Inbox</span>
         <span slot="content">
             <msg-preview v-for="inboxMsg in inboxMsgs" :inboxMsg="inboxMsg" :key="inboxMsg.msg.at" />
         </span>
    </updates-window>
  </div>
</template>


<script>
import UnseenCount from "../UnseenCount/UnseenCount.vue";
import UpdatesWindow from "../../util/UpdatesWindow.vue";
import MsgPreview from './MsgPreview.vue'
export default {
  components: {
    UpdatesWindow,
    MsgPreview
  },
  created() {
    this.$store.dispatch({ type: "loadInboxMsgs" });
  },
  data() {
    return {
      isWindow: false
    };
  },
  computed: {
      inboxMsgs() {
          return this.$store.getters.inboxMsgs
      }
  },
  methods: {
    toggleWindow() {
      this.isWindow = !this.isWindow;
      if (this.isWindow) this.$store.dispatch({ type: "loadInboxMsgs" });
    }
  },
  created() {
    this.$store.dispatch({ type: "loadInboxMsgs" });
    document.querySelector('body').addEventListener('mouseup', (ev) => {
      if (this.isWindow) setTimeout(() => {
        this.isWindow = false
      }, 50) 
    })
  },
};
</script>

<style scoped>
div {
  position: relative;
  cursor: pointer;
}
</style>







