<template>
  <section class="link-preview" v-if="linkDeatails">
    <div v-if="linkDeatails.iframe">
      <div class="media-container" v-html="linkDeatails.iframe"></div>
    </div>

    <div v-else>
      <p class="desc">{{linkDeatails.description}}</p>
      <img :src="linkDeatails.image" alt />
    </div>
  </section>
</template>

<script>
export default {
  props: ["linkDeatails"]
};
</script>


<style scoped>
.link-preview {
  border-top: 1px solid #eeeeee;
}

.desc {
  color: #4c4c4c;
  font-size: 14px;
}
.media-container {
  margin-top: 10px;
}

</style>






