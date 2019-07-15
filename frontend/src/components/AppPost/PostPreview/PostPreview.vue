<template>
  <div class="post-preview floating-box">
    <main>
      <header>
        <div class="profile-image-container-thumb">
          <img
            :src="post.owner.profileImg"
            alt
          />
        </div>

        <div class="info-container" style="padding-top: 5px;">
          <div style="margin-bottom: 3px;">
            <a href @click.prevent="toUserProfile">{{post.owner.username}}</a>
          </div>

          <div class="time-container">
            40 min ago&nbsp;&#183;&nbsp;
            <i class="fas fa-globe-americas"></i>
          </div>
        </div>
      </header>

    <span v-html="post.txt" style="font-size:15px;"></span>
    </main>
    <!-- media-conatiner -->
    <span class="media-container" v-html="post.linkDetails"></span>
    <footer>
      <div class="stats-container">
        <p class="like-count">
          <span v-if="post.likedBy.length" >{{post.likedBy.length}} Likes</span>
        </p>
        <p class="comment-count" @click="toggleComments">
          <span v-if="post.comments.length">{{post.comments.length}} Comments</span>
        </p>
        <!-- <p class="share-count" style="margin-left: 11px;">
          <span>98 Shares</span>
        </p> -->
      </div>
      <interactions-btns @toggleLike="toggleLike" :likedBy="post.likedBy" @toggleComments="toggleComments"></interactions-btns>
    </footer>
    <post-comments v-if="showComments" @addComment="addComment" :comments="post.comments"></post-comments>
  </div>
</template>


<script>

import InteractionsBtns from "./InteractionsButtons.vue";
import PostComments from "./PostComment/PostComment.vue";

export default {
  props: ['post'],
  data() {
    return {
      showComments: false
    };
  },
  components: {
    InteractionsBtns,
    PostComments
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    toggleLike() {
      this.$store.dispatch({type: 'toggleLike', userId: this.$store.getters.loggedInUser._id, postId:this.post._id})
    },
    addComment(txt) {
      this.$store.dispatch( {type: 'addComment', comment:{txt, at:Date.now()}, postId: this.post._id})
    },
    toUserProfile() {
      this.$router.push(`/user/${this.post.owner.userId}`)
    }
  }
};
</script>



















<style scoped>
.iframe {
  width: 100%;
}

.post-preview {
  margin-bottom: 10px;
}
main {
  padding: 12px;
}

header {
  display: flex;
  padding-top: 5px;
  margin-bottom: 10px;
}

.profile-image-container-thumb {
  margin-right: 13px;
}

.profile-image-container-thumb img {
  width: 45px;
  height: 45px;
  border-radius: 30px;
  object-fit: cover;
}

.time-container {
  font-size: 12px;
  color: #616770;
}

a {
  color: #385898;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
}

footer {
  /* border-top: 1px solid #cecece; */
  padding: 5px 15px;
}

.stats-container {
  border-bottom: 1px solid lightgray;
  color: gray;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 7px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
}
.stats-container p {
  margin: 0;
}

.stats-container span {
  cursor: pointer;
}
.stats-container span:hover {
  text-decoration: underline;
}

.like-count {
  flex-grow: 1;
}
</style>







