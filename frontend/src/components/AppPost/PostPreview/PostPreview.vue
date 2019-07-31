<template>
  <div class="post-preview floating-box" v-if="user && post">
    <main>
      <header>
        <div class="profile-image-container-thumb">
          <img :src="user.url.profileImg" alt />
        </div>

        <div class="info-container" style="padding-top: 3px;">
          <div style="margin-bottom: 5px;">
            <a href @click.prevent="toUserProfile">{{user.username | fUsername}}</a>
            <span v-if="post.userId !== post.user2Id">
              &nbsp;&#9656;&nbsp;
              <a @click.prevent="$router.push(`/user/${post.user2Id}`)"
              >{{post.user2.username | fUsername}}</a>
            </span>
          </div>

          <div class="time-container system-color">
            <span class="time" @click="$router.push(`/post/${post._id}`)">{{post.at | timeAgo}}</span>
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
      <div class="stats-container system-color">
        <p class="like-count">
          <span v-if="post.reactions.length">
            <img class="react-img" v-for="reactType in reactionsType" :src="reactImg(reactType)" alt />
            {{post.reactions.length}}
          </span>
        </p>

        <p class="comment-count" @click="toggleComments">
          <span v-if="post.comments.length">{{post.comments.length}} Comments</span>
        </p>
      </div>
      <interactions-btns
        :reactType="reactType"
        @removeReact="removeReact"
        @saveReact="saveReact"
        :isLiked="isLiked"
        @toggleComments="toggleComments"
      ></interactions-btns>
    </footer>
    <post-comments v-if="showComments" @addComment="addComment" :comments="post.comments"></post-comments>
  </div>
</template>


<script>
import InteractionsBtns from "./InteractionsButtons.vue";
import PostComments from "./PostComment/PostComment.vue";
import ContentPreview from "../ContentPreview/ContentPreview.vue";
import { setInterval } from "timers";
export default {
  props: ["post"],
  components: {
    InteractionsBtns,
    PostComments,
    ContentPreview
  },
  data() {
    return {
      showComments: false
    };
  },
  computed: {
    user() {
      return this.post.user;
    },
    reactionsType() {
      return  new Set(this.post.reactions.map(react => react.reactType))
    },
    reactType() {
      let react = this.post.reactions.find(
        react => react.userId === this.$store.getters.loggedInUser._id
      );
      return react ? react.reactType : null;
    },
    isLiked() {
      return this.$store.getters.loggedInUser
        ? this.post.reactions.find(
            like => like.userId === this.$store.getters.loggedInUser._id
          )
        : false; //this.$store.getters.loggedInUser? this.post.likedBy.find(by => by.userId === this.$store.getters.loggedInUser._id): false
    }
  },
  methods: {
    reactImg(reactType) {
      return {
        wow: `https://i.ibb.co/xHHMqQc/react-wow.png`,
        sad: "https://i.ibb.co/nL1qs2N/react-sad.png",
        haha: "https://i.ibb.co/pWzb4Hx/react-haha.png",
        like: "https://i.ibb.co/txFPK4n/react-like.png",
        love: "https://i.ibb.co/mh7ZnmJ/react-love.png",
        angry: "https://i.ibb.co/KhXqzbf/react-angry.png"
      }[reactType];
    },
    toggleComments() {
      this.showComments = !this.showComments;
    },
    toggleLike() {
      this.$store.dispatch({
        type: "toggleLike",
        userId: this.$store.getters.loggedInUser._id,
        postId: this.post._id
      });
    },
    saveReact(reactType) {
      this.$store.dispatch({
        type: "saveReact",
        postId: this.post._id,
        react: { reactType, userId: this.$store.getters.loggedInUser._id }
      });
    },
    removeReact() {
      let loggedInUserId = this.$store.getters.loggedInUser._id
      let postId = this.post._id
      this.$store.dispatch({type: 'removeReact', postId, loggedInUserId})
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
      this.$store.dispatch({ type: "saveComment", comment });
    },
    toUserProfile() {
      this.$router.push(`/user/${this.post.user._id}`);
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
  /* color: #787c81; */
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
  /* color: gray; */
      min-height: 24px;
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
  height: 20px;
  margin-left:-5px;
  margin-right: 5px;
}

.react-img {

}
</style>







