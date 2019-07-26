

<template>
  <div class="chat-window" v-if="chat">
    <audio
      id="play"
      src="https://vocaroo.com/media_command.php?media=s0vMxmjrTZYM&command=download_mp3"
    ></audio>

    <div class="top">
      <div class="main">
        Tal Maoz <i class="fas fa-times system-color"></i>
      </div>
      
    </div>

    <div ref="msgList" class="msg-list">
      <msg-preview v-for="msg in msgs" :msg="msg" :key="msg.at"></msg-preview>
    </div>

    <!-- <div class="send-msg-container"> -->
    <form @submit.prevent="sendMsg" class="send-msg-container">
      <input ref="txtInput" type="text" placeholder="Type a message..." v-model="txt" autofocus />
      <i class="fas fa-arrow-circle-up send-icon" :class="classObj"></i>
    </form>
    <!-- </div> -->
  </div>
</template>



<script>
import MsgPreview from "./MsgPreview.vue";
export default {
  props: ["chat", "idx"],
  data() {
    return {
      txt: ''
    }
  },
  computed: {
    msgs() {
      return this.chat.msgs;
    },
    classObj() {
      return {
        disable: !this.txt
      };
    }
  },
  methods: {
    sendMsg() {
      if (!this.txt) return;
      let msg = this.createMsg()
      this.$store.dispatch({
        type: "addMsg",
        msg,
        chatId: this.chat._id,
        toUserId: (this.chat.user1Id === this.$store.getters.loggedInUser._id)? this.chat.user2Id : this.chat.user1Id
      });
      this.txt = "";
      this.$refs.txtInput.focus();
    },
    createMsg() {
      return {
        txt: this.txt,
        userId: this.$store.getters.loggedInUser._id,
        at: Date.now()
      };
    }
  },
  watch: {
    msgs() {
      document.getElementById("play").play();
      setTimeout(() => {
        this.$refs.msgList.scrollTop = this.$refs.msgList.scrollHeight;
      }, 100);
    }
  },
  components: {
    MsgPreview
  }
};
</script>



<style scoped>
.chat-window {
  position: fixed;
  background-color: white;
  left: 30%;
  bottom: 0;
  width: 285px;
  height: 363px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 3px #cecece;
}

.top {
  min-height: 43px;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  border-radius: 8px 8px 0 0;
}

.top .main {
  width: 90%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.msg-list {
  overflow-y: scroll;
  flex-grow: 1;
}

.send-msg-container {
  min-height: 45px;
  border-top: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.send-msg-container input {
  width: 80%;
  /* height: 90%; */
  font-size: 13px;
  font-weight: 400;
  border: none;
  border-radius: 17px;
  outline: none;
  margin-left: 3px;
  padding: 4px 6px;
}

.send-icon {
  font-weight: 900;
  color: dodgerblue;
  font-size: 21px;
  margin-right: 10px;
}
.send-icon.disable {
  color: #b5b5b5;
}

@media (max-width: 670px) {
  .chat-window {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 93%;
    border-radius: 0;
  }
}
</style>












