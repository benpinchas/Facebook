

<template>
  <div class="chat-window">
    <audio
      id="play"
      src="https://vocaroo.com/media_command.php?media=s1dwvulZpRw1&command=download_mp3"
    ></audio>

    <div class="top" @click="toggleWindow">
      <div class="main">
        <div class="user-info-container">
          <img :src="chat.user.url.profileImg" alt />
          <span class="dot active" v-if="isActive"></span>
          {{chat.user.username}}
        </div>

        <i class="fas fa-times system-color"></i>
      </div>
    </div>

    <div v-if="isWindow" class="content">
      <div ref="msgList" class="msg-list">
        <msg-preview v-for="msg in msgs" :msg="msg" :key="msg.at"></msg-preview>
      </div>

      <form @submit.prevent="sendMsg" class="send-msg-container">
        <input ref="txtInput" type="text" placeholder="Type a message..." v-model="txt" autofocus />
        <i class="fas fa-arrow-circle-up send-icon" :class="classObj"></i>
      </form>
    </div>
  </div>
</template>



<script>
import MsgPreview from "./MsgPreview.vue";
export default {
  props: ["chat"],
  data() {
    return {
      txt: "",
      isWindow: true
    };
  },
  computed: {
    msgs() {
      return this.chat.msgs;
    },
    classObj() {
      return {
        disable: !this.txt
      };
    },
    isActive() {
      return this.$store.getters.activeUsers.find(
        userId => userId === this.chat.user._id
      );
    }
  },
  methods: {
    sendMsg() {
      if (!this.txt) return;
      let msg = this.createMsg();
      this.$store.dispatch({
        type: "addMsg",
        msg,
        chatId: this.chat._id,
        toUserId:
          this.chat.user1Id === this.$store.getters.loggedInUser._id
            ? this.chat.user2Id
            : this.chat.user1Id
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
    },
    toggleWindow() {
      this.isWindow = !this.isWindow;
      if (this.isWindow) this.scrollToTop()
    },
    scrollToTop() {
      setTimeout(() => {
        this.$refs.msgList.scrollTop = this.$refs.msgList.scrollHeight;
      }, 100);
    }
  },
  mounted() {
    this.scrollToTop()
  },
  watch: {
    msgs() {
      console.log(this.msgs[this.msgs.length-1].userId)
      if (this.msgs[this.msgs.length-1].userId !== this.$store.getters.loggedInUser._id) {
        document.getElementById("play").play();
      } 
      this.scrollToTop()
    }
  },
  components: {
    MsgPreview
  }
};
</script>



<style scoped>
.chat-window {
  background-color: white;
  width: 285px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 3px #cecece;
}

.top {
  cursor: pointer;
  min-height: 43px;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  border-radius: 8px 8px 0 0;
}
.top:hover {
  background-color: #f5f5f5;
}
.top .main {
  width: 90%;
  margin: 0 auto;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info-container {
  display: flex;
  align-items: center;
  position: relative;
}

.user-info-container img {
  border-radius: 50%;
  width: 26px;
  height: 26px;
  margin-right: 7px;
}

.user-info-container .dot {
  position: absolute;
  height: 7px;
  width: 7px;
  left: 15px;
  bottom: 0px;
  border: 2px solid white;
}

.content {
  height: 320px;
  display: flex;
  flex-direction: column;
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












