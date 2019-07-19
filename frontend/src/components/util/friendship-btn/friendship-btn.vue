<template>
  <div>
    <button v-if="type === 'add'" @click="addFriendship">
      <i class="fas fa-user-plus"></i> Add Friend
    </button>

    <button v-if="type === 'approved'" disabled>
      <i class="fas fa-check"></i> Friends
    </button>

    <button v-if="type === 'confirm'" @click="approveFriendship">
      <i class="fas fa-user-plus"></i> Confirm
    </button>

    <button v-if="type === 'sent'" disabled>
      <i class="fas fa-share"></i> Friend Request Sent
    </button>
  </div>
</template>


<script>
export default {
  props: ["user"],
  data() {
    return {};
  },
  computed: {
    type() {
      if (this.user._id === this.$store.getters.loggedInUser._id) return null;
      if (!this.user.friendship) return "add";
      if (this.user.friendship.isApproved) return "approved";
      if (this.user.friendship.user1Id === this.user._id) return "confirm";
      return "sent";
    }
  },
  methods: {
    addFriendship() {
      let friendship = {
        user1Id: this.$store.getters.loggedInUser._id,
        user2Id: this.user._id,
        at: Date.now(),
        isApproved: false,
        isSeen: false,
        masg: [{ txt: "hello" }, { txt: "shalom" }]
      };
      this.$store.dispatch({ type: "saveFriendship", friendship });
      console.log("OK");
    },
    approveFriendship() {
      let friendship = { ...user.friendship };
      friendship.isApproved = true;
      this.$store.dispatch({ type: "saveFriendship", friendship });
    },

  }
};
</script>


<style scoped>
button {
  background-color: #f5f6f7;
  border-color: #ccd0d5;
  color: #4b4f56;
  font-size: 13px;
  font-weight: 500;
  margin-left: 5px;
  padding: 4px 11px;
}
</style>


