<template>
  <div @click="readUser" class="user-preview" :style="{ 'background-image': 'url(' + user.url.profileImg + ')' }">
    <div class="overlay">
      <span class="username">{{user.username | fUsername}}</span>
    </div>
  </div>
</template>



<script>
export default {
  props: ["user"],
  methods: {
      readUser() {
          this.$router.push(`/user/${this.user._id}`)
      }
  }
};
</script>


<style scoped>
.user-preview {
  cursor: pointer;
  position: relative;
  background-color: white;
  display: inline;
  background-size: cover;
  width: 95px;
  height: 95px;
  margin-bottom: 5px;
}
.overlay {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 13px;
  color: white;
  width: 100%;
  height: 100%;
  background-color: ;
  background-image: linear-gradient(transparent, transparent, rgba(46, 46, 46, 0.301));
  display: flex;
  align-items: flex-end;
}
.username {
  padding: 5px;
}
</style>




