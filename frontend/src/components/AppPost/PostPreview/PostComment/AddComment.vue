<template>
  <div class="add-comment" v-if="loggedInUser">
    <div class="profile-image-container-thumb">
      <img :src="loggedInUser.url.profileImg" alt />
    </div>
    <div class="realtive"></div>
    <div
      ref="contenteditable"
      class="comment-container dark-set-1 "
      placeholder="Write a comment..."
      contenteditable
    ></div>
    <button @click="addComment">
      <i class="far fa-paper-plane"></i>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  mounted() {
    this.$refs.contenteditable.focus();
  },
  methods: {
    addComment() {
      this.$emit("addComment", this.$refs.contenteditable.innerText);
      this.$refs.contenteditable.innerText = ''
    }
  }
};
</script>


<style scoped>
.add-comment {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.profile-image-container-thumb {
  margin-right: 10px;
}

.profile-image-container-thumb img {
  width: 34px;
  height: 34px;
}

.comment-container {
  background-color: #f2f3f5;
  border: 1px solid #ccd0d5;
  padding: 7px 12px;
  border-radius: 16px;
  /* display: flex; */
  /* justify-content: flex-end; */
  font-size: 13px;
  cursor: text;
  flex-grow: 1;
}

[contenteditable="true"] {
  outline: none;
  word-break: break-all;
}

[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  color: gray;
}

/* BTN */
/*
    position: absolute;
    left: 672px;
    background-color: transparent;
    border: none;
    border-radius: 0px;
    font-size: 11px;
    padding: 7px;
    border-left: 1px solid #d9d9d9;

*/
</style>












