<template>
  <div class="notification-preview" :class="classObj" @click="readPost">
    <div class="profile-image-container-thumb">
      <img :src="notification.imgUrl" alt />
    </div>
    <div v-html="notification.txt"></div>
    {{notification.isSeen}}
  </div>
</template>


<script>
export default {
  props: ["notification"],
  computed: {
    classObj() {
      return {
        unseen: !this.notification.isSeen
      }
    }
  },
  methods: {
    readPost() {
      this.$router.push(`/post/${this.notification.postId}`)
    }
  },
  mounted() {
    if (!this.notification.isSeen) {
      setTimeout(() => {
        this.notification.isSeen = true
        this.$store.dispatch({type: 'updateNotification', notification: this.notification})
      }, 1000)
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
  transition: .5s;
}

.unread {
    background-color: #edf2fa;
}

.unseen {
  background-color: #fffce2;
}


</style>




