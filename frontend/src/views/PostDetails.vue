<template>
  <div class="post-preview floating-box" v-if="post">
    <main>
      <header>
        <div class="profile-image-container-thumb">
          <img :src="user.url.profileImg" alt />
        </div>

        <div class="info-container" style="padding-top: 3px;">
          <div style="margin-bottom: 5px;">
            <a href @click.prevent="toUserProfile">{{user.username}}</a>
            <span v-if="post.userId !== post.user2Id">
              &nbsp;&#9656;&nbsp;
              <a href @click.prevent="$router.push(`/user/${post.user2Id}`)">{{post.user2.username | fUsername}}</a>
             </span>
          </div>

          <div class="time-container">
            <span class="time" @click="$router.push(`/post/${post._id}`)">40 min ago</span>
            &#183;
            <i class="fas fa-globe-americas"></i>
          </div>
        </div>
      </header>

      <div
        v-html="post.txt"
        style="font-size:15px; margin-bottom:12px;"
        v-if="post.type !== 'gradient'"
      ></div>
    </main>
    <!-- media-conatiner -->

    <content-preview :type="post.type" :content="post.content" :post="post" />

    <footer>
      <div class="stats-container">
        <p class="like-count">
           <span v-if="post.likedBy.length"> <img src="@/assets/like.png" alt=""> {{post.likedBy.length}}</span>
        </p>
        <p class="comment-count" @click="toggleComments">
          <span v-if="post.comments.length">{{post.comments.length}} Comments</span>
        </p>
        <!-- <p class="share-count" style="margin-left: 11px;">
          <span>98 Shares</span>
        </p>-->
      </div>
      <interactions-btns
        @toggleLike="toggleLike"
        :isLiked="isLiked"
        @toggleComments="toggleComments"
      ></interactions-btns>
    </footer>
    <post-comments v-if="showComments" @addComment="addComment" :comments="post.comments"></post-comments>
  </div>
</template>


<script>
import PostService from "../services/PostService.js";
import InteractionsBtns from "../components/AppPost/PostPreview/InteractionsButtons.vue";
import PostComments from "../components/AppPost/PostPreview/PostComment/PostComment.vue";
import ContentPreview from "../components/AppPost/ContentPreview/ContentPreview.vue";
import { setInterval } from "timers";
export default {
  components: {
    InteractionsBtns,
    PostComments,
    ContentPreview
  },
  data() {
    return {
      showComments: true,
      post: null
    };
  },
  computed: {
    user() {
      return this.post.user;
    },
    isLiked() {
      return this.$store.getters.loggedInUser
        ? this.post.likedBy.find(
            like => like.userId === this.$store.getters.loggedInUser._id
          )
        : false; //this.$store.getters.loggedInUser? this.post.likedBy.find(by => by.userId === this.$store.getters.loggedInUser._id): false
    }
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    toggleLike() {
      let likeIdx = this.post.likedBy.findIndex(
        like => like.userId === this.$store.getters.loggedInUser._id
      );
      if (likeIdx === -1) {
        this.post.likedBy.unshift({
          userId: this.$store.getters.loggedInUser._id,
          username: this.$store.getters.loggedInUser.username
        });
      } else {
        this.post.likedBy.splice(likeIdx, 1);
      }
      this.$store.dispatch({
        type: "toggleLike",
        userId: this.$store.getters.loggedInUser._id,
        postId: this.post._id
      });
    },
    addComment(txt) {
      let comment = {
        at: Date.now(),
        _id: Math.random() + "",
        postId: this.post._id,
        txt,
        owner: {
          userId: this.$store.getters.loggedInUser._id,
          username: this.$store.getters.loggedInUser.username,
          profileImg: this.$store.getters.loggedInUser.url.profileImg
        },
        likedBy: []
      };
      this.post.comments.push(comment);
      this.$store.dispatch({ type: "saveComment", comment });
    },
    toUserProfile() {
      this.$router.push(`/user/${this.post.user._id}`);
    },
    async loadPost() {
      let { postId } = this.$route.params;
      let post = await PostService.getById(postId);
      this.post = post;
    }
  },
  created() {
    this.loadPost();
  },
  watch: {
      "$route.params.postId"() {
          this.loadPost()
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
  padding-bottom: 0;
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
  color: #787c81;
}

.time {
  cursor: pointer;
}
.time:hover {
  text-decoration: underline;
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

.like-count span {
  display: flex;
  align-items: center;
}

.like-count img {
  height: 18px;
}
</style>







