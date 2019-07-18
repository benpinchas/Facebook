<template>
  <div @click="toggleWindow" class="friendship-request">
    <i class="fas fa-user-friends header-icon" :class="classObj"></i>
    <unseen-count :unseen="unseen" />
    <updates-window v-if="isWindow">
      <span slot="top">Friend Requests</span>
      <span slot="content">
       <request-preview v-for="friendship in friendshipRequests" :friendship="friendship"></request-preview>
      </span>
    </updates-window>
  </div>
</template>



<script>
import unseenCount from "../UnseenCount/UnseenCount.vue";
import UpdatesWindow from "../../util/UpdatesWindow.vue";
import RequestPreview from '../../Friendship/RequestPreview.vue'
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
      return this.$store.getters.unseenFriendshipRequests
    },
    friendshipRequests() {
      console.log(this.$store.getters.friendshipRequests)
      return  this.$store.getters.friendshipRequests
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
    this.$store.dispatch({ type: "loadFriendships" });
  }
};
</script>



<style scoped>
.friendship-request {
  position: relative;
}
</style>







