<template>
  <div class="comment-preview">
    <div class="profile-image-container-thumb">
      <img
        src="https://scontent.fhfa1-1.fna.fbcdn.net/v/t31.0-8/463613_10151673598294797_1655224835_o.jpg?_nc_cat=1&_nc_oc=AQmcwT_rFbHZlCXbY2nTkCYsOnBNm7thnWD4p17GvzbfboWkftf_ssooLZYV3rjtgck&_nc_ht=scontent.fhfa1-1.fna&oh=8c6913ec09eb73d52c72bc3f6cf20016&oe=5DBD9C31"
        alt
      />
    </div>

    <div>
      <div class="comment-container">
        <div class="name-container" style="margin-bottom: 3px;">
          <a href>Puki Ben David</a>
        </div>
        <div style="padding-top: 2px;padding-bottom: 6px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>

        <like-count/>
      </div>
      <div class="actions-container">
        <a>Like</a> &nbsp;&#183;&nbsp; 40m
      </div>
    </div>
  </div>
</template>


<script>
import LikeCount from './LikeCount.vue'
export default {
    components: {
        LikeCount,
    }
};
</script>


<style scoped>
.actions-container {
  padding: 2px 13px;
  font-size: 12.5px;
  color: #606770;
}

.actions-container a {
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
  border-radius: 16px;
  font-size: 14px;
  padding: 10px 13px;
}

.name-container a {
  color: #385898;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}
</style>








