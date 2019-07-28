<template>
<section class="pseudo">
  <div class="mobile-bar">
    <div class="main">
      <i class="fas fa-home" @click="$router.push('/')"></i>
      <i class="fas fa-user" @click="$router.push(`/user/${$store.getters.loggedInUser._id}`)"></i>
      <app-notification />
      <friendship-request />
      <app-inbox />
    </div>
  </div>

</section>
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
  .pseudo {
    min-height: 35px;
  }
  .mobile-bar {
    background-color: white;
  display: unset;
  z-index: 200;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px -1px 1px #e6e6e6;
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



