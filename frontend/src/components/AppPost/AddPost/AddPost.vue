<template>
  <div>
    <!-- <div class="overlay"></div> -->
    <div class="add-post floating-box" v-if="user">
      <header>Create Post</header>
      <main v-if="post.type !== 'gradient'">
        <div class="profile-image-container-thumb">
          <img :src="user.url.profileImg" alt />
        </div>
        <section style="flex-grow:1;">
          <div
            contenteditable
            class="input-container"
            :placeholder="placeholder"
            ref="contenteditable"
            @input="onInput"
          ></div>
        </section>

        <div class="realtive-wrapper">
          <content-preview :type="post.type" :content="post.content" :post="post" />

          <my-loader v-if="isLoading" />
        </div>
      </main>

      <div
        v-else
        class="gradient"
        :class="post.gradientClass"
        ref="contenteditable"
        contenteditable
        @input="onInput"
      ></div>

      <footer>
        <div class="main">
          <upload-image ref="imageInput" @setImageUrl="setImageUrl" style="display:none" />
          <div class="post-type-container">
            <div class="post-type" @click="clickImageInput">
              <img src="@/assets/image.png" alt />
              Photo
            </div>
          </div>

          <div class="gradient-container">
            <div @click="setGradient('purple')" class="purple"></div>
            <div @click="setGradient('party')" class="party-small"></div>
            <div @click="setGradient('poop')" class="poop-small"></div>
            <div @click="setGradient('fire')" class="fire-small"></div>
            <div @click="setGradient('smiley')" class="smiley-small"></div>
          </div>

          <button @click="addPost">
            <i class="fas fa-globe-americas"></i> Publish
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>


<script>
import PostService from "../../../services/PostService.js";
import ContentPreview from "../ContentPreview/ContentPreview.vue";
import UploadImage from "../../util/UploadImage.vue";
import MyLoader from "../../util/MyLoader.vue";
export default {
  components: {
    ContentPreview,
    UploadImage,
    MyLoader
  },
  data() {
    return {
      isLoading: false,
      post: {
        userId: this.$store.getters.loggedInUser._id, //TODO: in the backend with session.
        txt: "",
        type: "", //image, gradient, youtube, checkin, gradient
        content: "",
        gradientClass: "a",
        comments: [],
        likedBy: []
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
    placeholder() {
      return this.$store.getters.loggedInUser
        ? "What's on your mind, " + this.$store.getters.loggedInUser.username
        : null;
    }
  },
  methods: {
    addPost() {
      this.$store.dispatch({ type: "addPost", post: this.post });
    },
    async onInput() {
      this.post.txt = this.$refs.contenteditable.innerText;
      // if ( this.post.txt.length > 150 && this.post.type === 'gradient') this.post.type = ''

      // let linkDeatails = await PostService.getLinkDetails(
      //   this.$refs.contenteditable.innerText
      // );
      // this.post.linkDeatails = linkDeatails;
      // console.log(linkDeatails);
    },

    setGradient(gradientClass) {
      this.post.type = "gradient";
      this.post.gradientClass = gradientClass;
    },
    clickImageInput() {
      this.$refs.imageInput.$el.click();
    },
    async setImageUrl(prmImageUrl) {
      this.isLoading = true;
      try {
        this.post.type = "image";
        this.post.content = await prmImageUrl;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
      console.log(this.post.content);
    }
  }
};
</script>























<style scoped>
.gradient-container {
  padding: 0 10px;
  display: flex;
}
.gradient-container div {
  cursor: pointer;
  width: 20px;
  height: 19px;
  border-radius: 3px;
  margin-right: 5px;
}

.overlay {
  position: fixed;
  background-color: black;
  opacity: 0.6;
  z-index: 30;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.add-post {
  margin-bottom: 10px;
  /* height: 300px; */
  z-index: 220;
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
  margin-bottom: 0;
  color: #4b4f56;
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
}

main {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  flex-wrap: wrap;
  word-break: break-all;
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

footer div.main {
  border-top: 1px solid lightgray;
  padding: 12px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #4267b2;
  border-color: #29487d;
  color: white;
  font-weight: 400;
  font-size: 15px;
}

.post-type-container {
  flex-grow: 1;
}

.realtive-wrapper {
  width: 100%;
  min-height: 40px;
}

footer .post-type {
  cursor: pointer;
  background-color: #f2f3f5;
  border: none;
  border-radius: 13px;
  display: flex;
  width: 99px;
  align-items: center;
  padding: 6px 0;
  justify-content: center;
  font-size: 15px;
  color: #4b4b4b;
}

footer .post-type img {
  width: 23px;
  margin-right: 5px;
  height: 21px;
}

@media (max-width: 670px) {
  .add-post {
    max-width: 98%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>









