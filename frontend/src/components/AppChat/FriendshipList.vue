<template>
  <div class="friendship-list">
    <friendship-preview
      v-for="friendship in friendships"
      :friendship="friendship"
      :key="friendship._id"
    />
  </div>
</template>

<script>
import FriendshipPreview from "./FriendshipPreview.vue";
export default {
  components: {
    FriendshipPreview
  },
  computed: {
    friendships() {
      return this.$store.getters.approvedFriendships;
    }
  }
};
</script>




<style scoped>
.friendship-list {
  word-break: break-all;
  background-color: white;
  width: 100%;
  min-height: 450px;
  max-height: 700px;
  overflow-y: scroll;
}
</style>



