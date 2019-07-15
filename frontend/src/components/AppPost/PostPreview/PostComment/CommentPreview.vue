<template>
  <div class="comment-preview">
    <div class="profile-image-container-thumb">
      <img
        :src="comment.owner.profileImg"
        alt
      />
    </div>

    <div>
      <div class="comment-container">
        <div class="name-container" style="margin-bottom: 3px;">
          <a href @click.prevent="readUser">{{comment.owner.username}}</a>
        </div>
        <div style="padding-top: 2px;padding-bottom: 6px;">{{comment.txt}}</div>

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
    props: ['comment'],
    components: {
        LikeCount,
    },
    methods: {
      readUser() {
        this.$router.push(`/user/${this.comment.owner.userId}`)
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
    border-radius: 13px;
    font-size: 14px;
    padding: 8px 10px;
    min-width: 111px;

}

.name-container a {
  color: #385898;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}
</style>








