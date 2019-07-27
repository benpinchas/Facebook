<template>
  <div class="contact-preview" @click="loadChatWith">
    <div class="profile-image-container-thumb">
      <img :src="user.url.profileImg" alt />
      {{user.username}}
    </div>

    <div>

    <span class="dot" :class="classObj"></span>
      <!-- <button class="confirm" @click="confirmFriendship">Confirm</button>
      <button class="delete">Delete</button>-->
    </div>
  </div>
</template>
<script>
import { mkdir } from 'fs';
export default {
  props: ["user"],
  computed: {
    classObj() {
      return {
        active: this.$store.getters.activeUsers.find(userId => userId === this.user._id)
      } 
    }
  },
  methods: {
    loadChatWith() {
      this.$store.dispatch({type: 'loadChatWith', userId: this.user._id})
    }
  }
};
</script>


<style scoped>
.contact-preview {
  cursor: pointer;
  height: 46px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  font-size: 13px;
  color: rgb(29, 33, 41);
  border-bottom: 1px solid #e0e0e0;
  justify-content: space-between;
}

.contact-preview:hover {
    background-color: rgb(250, 250, 250);
}

.profile-image-container-thumb {
  display: flex;
  align-items: center;
}

.profile-image-container-thumb img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  object-fit: cover;
  border: 1px solid lightgray;
}



</style>




