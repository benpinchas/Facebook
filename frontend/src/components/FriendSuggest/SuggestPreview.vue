<template>
  <div>
    <header class="g-user-snippet-container-small">
      <div class="g-profile-image-container-thumb-small">
        <img :src="(suggest.url)? suggest.url.profileImg : null" />
      </div>

      <div class="info-container">
        <div style="margin-bottom: 3px;" @click.prevent="toUserProfile">
          <a href>{{suggest.username}}</a>
        </div>

        <div class="buttons-container">
          <button @click="addFriendship">
            <i class="fas fa-user-plus"></i> Add
          </button>
        </div>
      </div>
    </header>
  </div>
</template>


<script>
//TODO: change suggest to friendship
export default {
  props: ["suggest"],
  data() {
    return {};
  },
  methods: {
    addFriendship() {
      let friendship = {
        user1: {
          userId: this.$store.getters.loggedInUser._id,
          username: this.$store.getters.loggedInUser.username,
          profileImg: this.$store.getters.loggedInUser.url.profileImg
        },
        user2 : { 
          userId:  this.suggest._id,
          username: this.suggest.username,
          profileImg: this.suggest.url.profileImg
        },
        at: Date.now(),
        isApproved: false,
        isSeen: false,
        masg: [{ txt: "hello" }, { txt: "shalom" }]
      };
      console.log(friendship)
      this.$store.dispatch({ type: "addFriendship", friendship });
    },
    toUserProfile() {
      this.$router.push(`/user/${this.suggest._id}`);
    }
  }
};
</script>


<style scoped>
header {
}

button {
  background-color: #f5f6f7;
  border-color: #ccd0d5;
  color: #4b4f56;
  line-height: 20px;
  font-size: 14px;
}

button i {
  font-size: 11px;
}
</style>







