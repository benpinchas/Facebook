

<template>
  <div class="chat-cmp">

    <audio
      id="play"
      src="https://vocaroo.com/media_command.php?media=s0vMxmjrTZYM&command=download_mp3"
    ></audio>
    <div ref="msgList" class="msg-list">
      <msg-preview v-for="msg in msgs" :msg="msg"></msg-preview>
    </div>

    <!-- <div class="send-msg-container"> -->
    <form @submit.prevent="sendMsg" class="send-msg-container">
      <input ref="txtInput" type="text" v-model="msg.txt" autofocus />
      <i class="fas fa-arrow-circle-up send-icon" :class="classObj"></i>
    </form>
    <!-- </div> -->
  </div>
</template>



<script>
import MsgPreview from "./MsgPreview.vue";

export default {
  props: ['chat'],
  data() {
    return {
      msg: { userId: this.$store.getters.loggedInUser._id, txt :''}
    };
  },
  computed: {
    msgs() {
      return [{txt: 'dscwe'}]
    },
    classObj() {
      return {
        disable: !this.msg.txt
      }
    }
  },
  methods: {
    sendMsg() {
      if (!this.msg.txt) return
      this.$store.commit({ type: "add msg", msg: this.msg });
      this.msg.txt = ''
      this.$refs.txtInput.focus();
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
.chat-cmp {
  position: fixed;
  background-color: #dedede;
  left: 30%;
  bottom: 0;
  width: 285px;
  height: 370px;
}

.msg-list {
  overflow-y: scroll;
  height: 85%;
  padding-bottom: 10px;
}

.send-msg-container {
  height: 15%;
  border-top: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.send-msg-container input {
  width: 80%;
  /* height: 90%; */
  font-size: 19px;
  font-weight: 300;
  border: 1px solid gray;
  border-radius: 17px;
  outline: none;
  margin-left: 3px;
  padding: 4px 6px;
}

.send-icon {
  font-weight: 900;
  color: dodgerblue;
  font-size: 28px;
  margin-right: 6px;
}
.send-icon.disable {
  color: #b5b5b5;
}

</style>












