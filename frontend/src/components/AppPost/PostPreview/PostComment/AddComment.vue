<template>
  <div class="add-comment">
    <div class="profile-image-container-thumb">
      <img
        src="https://scontent.fhfa1-1.fna.fbcdn.net/v/t31.0-8/463613_10151673598294797_1655224835_o.jpg?_nc_cat=1&_nc_oc=AQmcwT_rFbHZlCXbY2nTkCYsOnBNm7thnWD4p17GvzbfboWkftf_ssooLZYV3rjtgck&_nc_ht=scontent.fhfa1-1.fna&oh=8c6913ec09eb73d52c72bc3f6cf20016&oe=5DBD9C31"
        alt
      />
    </div>

    <div ref="contenteditable" class="comment-container" placeholder="Write a comment..." contenteditable></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.contenteditable.focus()
  }
};
</script>


<style scoped>
.add-comment {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.profile-image-container-thumb {
  margin-right: 10px;
}

.profile-image-container-thumb img {
  width: 34px;
  height: 34px;
}

.comment-container {
  background-color: #f2f3f5;
  border: 1px solid #ccd0d5;
  padding: 7px 12px;
  border-radius: 16px;
  /* display: flex; */
  /* justify-content: flex-end; */
  font-size: 13px;
  cursor: text;
  flex-grow: 1;
}

[contenteditable="true"] {
  outline: none;
  word-break: break-all;
}

[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  color: gray;
}
</style>












