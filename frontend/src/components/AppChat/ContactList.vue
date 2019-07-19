<template>
  <div class="friendship-list">
    <contact-preview
      v-for="user in users"
      :user="user"
      :key="user._id"
    />
  </div>
</template>

<script>
import ContactPreview from "./ContactPreview.vue";
export default {
  props: ['users'],
  components: {
    ContactPreview
  },
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



