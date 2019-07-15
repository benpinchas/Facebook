<template>
  <div class="add-post floating-box" v-if="user">
    <header>Create Post</header>
    <main>
      <div class="profile-image-container-thumb">
        <img
          :src="user.url.profileImg"
          alt
        />
      </div>

      <section style="flex-grow:1;">
        <div
          contenteditable
          class="input-container"
          :placeholder="placeholder"
          ref="contenteditable"
          @input="onInput"
        ></div>

        <link-preview :linkDeatails="post.linkDeatails" />
      </section>

    </main>

    <footer>
      <div>
        <button @click="addPost">
          <i class="fas fa-globe-americas"></i> Publish
        </button>
      </div>
    </footer>
  </div>
</template>


<script>
import PostService from '../../../services/PostService.js'
import linkPreview from '../LinkPreview/LinkPreview.vue'
export default {
  components: {
    linkPreview,
  },
  data() {
    return {
      post: {
        txt: "",
        linkDeatails: null,
        creator: {
          username: '',
          imgSrc: '',
          profileImg: ''
        },
        comments: [],
        likedBy: [],
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    placeholder() {
      return this.$store.getters.loggedInUser? 'What\'s on your mind, ' + this.$store.getters.loggedInUser.username : 'login first'
    }
  },
  methods: {
     addPost() {
      this.post.creator.userId = this.$store.getters.loggedInUser._id
      this.post.creator.username = this.$store.getters.loggedInUser.username
      this.post.creator.profileImg = this.$store.getters.loggedInUser.url.profileImg

      this.$store.dispatch({ type: "addPost", post: this.post});
    },
    async onInput() {
      this.post.txt = this.$refs.contenteditable.innerText;
      let linkDeatails = await PostService.getLinkDetails(this.post.txt);
      this.post.linkDeatails = linkDeatails
      // console.log(linkDeatails);
    },
  }
};
</script>























<style scoped>
.add-post {
  margin-bottom: 10px;
  /* height: 300px; */

  display: flex;
  flex-direction: column;
}

header {
  padding: 8px 10px;
  background-color: #f5f6f7;
  border-bottom: 1px solid #dddfe2;
  border-radius: 2px 2px 0 0;
  font-weight: bold;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  color: #4b4f56;
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
}

main {
  display: flex;
  align-items: flex-start;
  padding: 12px;
}
.input-container {
  flex-grow: 1;
  padding: 10px 5px;
}

[contenteditable="true"] {
  outline: none;
  word-break: break-all;
}

[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  color: gray;
  font-size: 14px;
}

footer {
  padding: 0px 15px;
}

footer div {
  border-top: 1px solid lightgray;
  padding: 12px 0;

  display: flex;
  justify-content: flex-end;
}

button {
  background-color: #4267b2;
  border-color: #29487d;
  color: white;
  font-weight: 400;
  font-size: 15px;
}

@media (max-width: 670px) {
  .add-post {
    max-width: 98%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>









