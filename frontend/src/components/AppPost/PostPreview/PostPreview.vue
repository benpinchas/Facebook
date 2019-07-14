<template>
  <div class="post-preview floating-box">
    <main>
      <header>
        <div class="profile-image-container-thumb">
          <img
            src="https://scontent.fhfa1-1.fna.fbcdn.net/v/t31.0-8/463613_10151673598294797_1655224835_o.jpg?_nc_cat=1&_nc_oc=AQmcwT_rFbHZlCXbY2nTkCYsOnBNm7thnWD4p17GvzbfboWkftf_ssooLZYV3rjtgck&_nc_ht=scontent.fhfa1-1.fna&oh=8c6913ec09eb73d52c72bc3f6cf20016&oe=5DBD9C31"
            alt
          />
        </div>

        <div class="info-container" style="padding-top: 5px;">
          <div style="margin-bottom: 3px;">
            <a href>Puki Ben David</a>
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
    <span class="media-container" v-html="post.video"></span>

    <footer>
      <div class="stats-container">
        <p class="like-count">
          <span>90 Likes</span>
        </p>
        <p class="comment-count">
          <span>56 Comments</span>
        </p>
        <p class="share-count" style="margin-left: 11px;">
          <span>12 Shares</span>
        </p>
      </div>
      <interactions-btns @toggleComments="toggleComments"></interactions-btns>
    </footer>
    <post-comments v-if="showComments"></post-comments>
  </div>
</template>


<script>
import InteractionsBtns from "./InteractionsButtons.vue";
import PostComments from "./PostComment/PostComment.vue";

let post = {
  txt: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
  media: `<img style="width:100%;" src="http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/weather/pagePropertiesImage/bangkok-weather.jpg">`,
  video: `<iframe width="100%" height="280px" style="border:none"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>`
};

export default {
  data() {
    return {
      post: post,
      showComments: false
    };
  },
  components: {
    InteractionsBtns,
    PostComments
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments
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







