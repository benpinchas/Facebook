<template>
  <side-box>
    <span slot="headline">Friends  &#183; {{friends.length}}</span>
    <div slot="main" class="user-list">
      <user-preview v-for="friend in friends" :user="friend" />
    </div>
  </side-box>
</template>


<script>
import SideBox from "../../util/SideBox.vue";
import UserPreview from "../UserFriends/UserPreview.vue";
export default {
  components: {
    SideBox,
    UserPreview
  },
  props: ["friends"]
};
</script>

<style scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 300px;
}
</style>


