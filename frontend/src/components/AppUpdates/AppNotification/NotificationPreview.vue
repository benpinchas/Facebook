<template>
  <div class="notification-preview" @click="readPost">
    <div class="profile-image-container-thumb">
      <img :src="notification.imgUrl" alt />
    </div>
    <div v-html="notification.txt"></div>
  </div>
</template>


<script>
export default {
  props: ["notification"],
  methods: {
    readPost() {
      this.$router.push(`/post/${this.notification.postId}`)
    }
  }
};
</script>

<style scoped>
.notification-preview {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  font-size: 13px;
  color: rgb(29, 33, 41);
  border-bottom: 1px solid #e0e0e0;

  background-color: #edf2fa;
}
.unread {
    background-color: #edf2fa;
}


</style>




