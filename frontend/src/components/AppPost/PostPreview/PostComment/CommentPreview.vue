<template>
  <div class="comment-preview">
    <div class="profile-image-container-thumb">
      <img :src="comment.owner.profileImg" alt />
    </div>
    <div>
      <div class="comment-container dark-set-1">
        <div class="name-container" style="margin-bottom: 3px;">
          <a class="username-color" href @click.prevent="readUser">{{comment.owner.username | fUsername}}</a>
        </div>
        <div style="padding:2px;">{{comment.txt}}</div>

        <like-count v-if="likesCount" :likesCount="likesCount" />
      </div>
      <div class="actions-container">
        <a @click="toggleLike" :class="likeClassObj">Like</a> &nbsp;&#183;&nbsp; {{comment.at | timeAgo}}
      </div>
    </div>
  </div>
</template>


<script>
import LikeCount from "./LikeCount.vue";
export default {
  props: ["comment"],
  components: {
    LikeCount
  },
  computed: {
    likesCount() {
      return this.comment.likedBy.length;
    },
    likeClassObj() {
      return {
        liked: this.comment.likedBy.find(like => like.userId === this.$store.getters.loggedInUser._id)
      };
    }
  },
  methods: {
    readUser() {
      this.$router.push(`/user/${this.comment.owner.userId}`);
    },
    toggleLike() {
      let comment = { ...this.comment };
      let likeIdx = comment.likedBy.findIndex(
        like => like.userId === this.$store.getters.loggedInUser._id
      );
      if (likeIdx >= 0) {
        comment.likedBy.splice(likeIdx, 1);
      } else {
        comment.likedBy.push({
          userId: this.$store.getters.loggedInUser._id,
          username: this.$store.getters.loggedInUser.username
        });
      }
      this.$store.dispatch({ type: "saveComment", comment });
    }
  }
};
</script>


<style scoped>
.actions-container {
  padding: 2px 13px;
  font-size: 12.5px;
  color: #606770;
}

 a {
  color: #385898;
}

.comment-preview {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  max-width: 90%;
}

.profile-image-container-thumb {
  margin-right: 10px;
}

.profile-image-container-thumb img {
  width: 34px;
  height: 34px;
}

.comment-container {
  position: relative;
  background-color: #f2f3f5;
  padding: 7px 12px;
  border-radius: 13px;
  font-size: 14px;
  padding: 8px 10px;
  min-width: 170px;
}

.name-container a {
  /* color: #385898; */
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
}

a.liked {
  color: rgb(32, 120, 244);
  font-weight: 600;
}
</style>








