<template>
  <section class="content-preview" v-if="type ">
    <component :is="component" :content="content" :post="post"  ></component>
  </section>
</template>

<script>
import ImagePreview from "./ImagePreview.vue";
import GradientPreview from './GradientPreview.vue'
export default {
  props: ['type', 'content', 'post'],
  components: {
    ImagePreview,
    GradientPreview
  },
  computed: {
    component() {
      return this.type + "-preview";
    }
  }
};
</script>


<style scoped>
.content-preview {
  width: 100%;
  margin: 0 auto;
  /* box-shadow: 0 0 1px #d5d5d5; */
}
.desc {
  color: #4c4c4c;
  font-size: 14px;
}
.media-container {
  margin-top: 10px;
}
</style>






