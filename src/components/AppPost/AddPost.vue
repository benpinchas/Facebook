<template>
  <div class="add-post floating-box">
    <header>Create Post</header>
    <main>
      <div class="profile-image-container-thumb">
        <img
          src="https://scontent.fhfa1-1.fna.fbcdn.net/v/t31.0-8/463613_10151673598294797_1655224835_o.jpg?_nc_cat=1&_nc_oc=AQmcwT_rFbHZlCXbY2nTkCYsOnBNm7thnWD4p17GvzbfboWkftf_ssooLZYV3rjtgck&_nc_ht=scontent.fhfa1-1.fna&oh=8c6913ec09eb73d52c72bc3f6cf20016&oe=5DBD9C31"
          alt
        />
      </div>

      <div class="input-container">
        <textarea name id cols="30" rows="10"></textarea>
      </div>
    </main>

    <footer></footer>
  </div>
</template>


<script>
export default {};
</script>


<style scoped>
.add-post {
  margin-bottom: 10px;
  margin-top: 10px;

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
  align-items: center;
  padding: 12px;
}
.input-container {
  flex-grow: 1;
}

textarea {
     width: 96%;
    height: 87px;
    /* min-height: 80px; */
    /* border: 1px solid black; */
    resize: none;
    border: none;
}
</style>









