<template>
  <div>
    <header class="g-user-snippet-container-small">
      <div class="g-profile-image-container-thumb-small">
        <img :src="(user.url)? user.url.profileImg : null" />
      </div>

      <div class="secondary-container">
        <div style="margin-bottom: 3px;" @click.prevent="readUser">
          <a href>{{user.username}}</a>
        </div>

        <div class="btns-container">
          <friendship-btn :user="user" class="friendship-btn" />
        </div>
      </div>
    </header>
  </div>
</template>


<script>
import FriendshipBtn from "../util/friendship-btn/friendship-btn.vue";
export default {
  props: ["user"],
  components: {
    FriendshipBtn
  },
  data() {
    return {};
  },
  methods: {
    readUser() {
      this.$router.push(`/user/${this.user._id}`);
    }
  }
};
</script>


<style scoped>
header {
}
.secondary-container {
  flex-grow: 1;
  flex-direction: column;

}


</style>







