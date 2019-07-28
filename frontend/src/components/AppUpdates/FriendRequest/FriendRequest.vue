<template>
  <div @click="toggleWindow" class="friendship-request">
    <i class="fas fa-user-friends header-icon" :class="classObj"></i>
    <unseen-count :unseen="unseen" />
    <updates-window v-if="isWindow">
      <span slot="top">Friend Requests</span>
      <span slot="content">
        <request-preview v-for="user in requestingUsers" :user="user" :key="user._id"></request-preview>
      </span>
    </updates-window>
  </div>
</template>



<script>
import unseenCount from "../UnseenCount/UnseenCount.vue";
import UpdatesWindow from "../../util/UpdatesWindow.vue";
import RequestPreview from "../../Friendship/RequestPreview.vue";
export default {
  components: {
    UpdatesWindow,
    unseenCount,
    RequestPreview
  },
  data() {
    return {
      isWindow: false
    };
  },
  computed: {
    unseen() {
      return this.$store.getters.requestingUsers.filter(req => !req.isSeen);
    },
    requestingUsers() {
      console.log("requestingUsers", this.$store.getters.requestingUsers);
      return this.$store.getters.requestingUsers;
    },
    classObj() {
      return {
        unseen: this.unseen.length //global class
      };
    }
  },
  methods: {
    toggleWindow() {
      this.isWindow = !this.isWindow;
    }
  },
  created() {
     document.querySelector('body').addEventListener('mousedown', () => {
      if (this.isWindow) setTimeout(() => {
        this.isWindow = false
      }, 500) 
    })
  }
};
</script>



<style scoped>
.friendship-request {
  position: relative;
}
</style>







