<template>
  <div class="mobile-bar">
    <div class="main">
      <i class="fas fa-home" @click="$router.push('/')"></i>
      <i class="fas fa-user" @click="$router.push(`/user/${$store.getters.loggedInUser._id}`)"></i>
      <app-notification />
      <friendship-request />
      <app-inbox />
    </div>
  </div>
</template>


<script>
import AppNotification from "../AppUpdates/AppNotification/AppNotification.vue";
import FriendshipRequest from "../AppUpdates/FriendRequest/FriendRequest.vue";
import AppInbox from "../AppUpdates/AppMsg/AppMsg.vue";
export default {
  components: {
    AppNotification,
    FriendshipRequest,
    AppInbox
  }
};
</script>



<style scoped>
.mobile-bar {
    display: none;
}
@media(max-width: 670px) {
  .mobile-bar {
    display: unset;
  background-color: #bfbfbf;
  z-index: 200;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.main {
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

}   


</style>



