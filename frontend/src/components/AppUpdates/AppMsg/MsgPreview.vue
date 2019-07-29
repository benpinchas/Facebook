<template>
  <div class="msg-preview" @click="openChatWith">
    <div class="profile-image-container-thumb">
      <img :src="inboxMsg.user.url.profileImg" alt />
    </div>
    <div class="secondary">
      <div class="username">{{inboxMsg.user.username}}</div>
      <div class="txt">
        <i class="fas fa-share" v-if="isOutcome"></i>
        {{inboxMsg.msg.txt | txtSnippet}}
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["inboxMsg"],
  computed: {
    classObj() {
      return {};
    },
    isOutcome() {
      return this.inboxMsg.msg.userId === this.$store.getters.loggedInUser._id;
    }
  },
  methods: {
    openChatWith() {
      this.$store.dispatch({
        type: "loadChatWith",
        userId: this.inboxMsg.user._id
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.msg-preview {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  font-size: 13px;
  color: rgb(29, 33, 41);
  border-bottom: 1px solid #e0e0e0;
  transition: 0.5s;
}

.secondary {
  flex-grow: 1;
  font-size: 14px;
}

.secondary .username {
  font-weight: 600;
  margin-bottom: 6px;
}

.secondary .txt {
  overflow: hidden;
}

.txt i {
  font-size: 12px;
  color: #a1a1a1;
  margin-right: 3px;
  transform: scaleX(-1)
}

.unread {
  background-color: #edf2fa;
}

.unseen {
  background-color: #fffce2;
}
</style>




