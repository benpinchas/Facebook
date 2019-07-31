<template>
  <div>
    <post-preview :post="post"  v-if="post"/>
  </div>
</template>


<script>
import PostService from "../services/PostService.js";
import PostPreview from "../components/AppPost/PostPreview/PostPreview.vue";
export default {
  components: {
    PostPreview
  },
  data() {
    return {
      post: {}
    };
  },
  methods: {
    async loadPost() {
      let { postId } = this.$route.params;
      let post = await this.$store.dispatch({type: 'getById', postId})
      this.post = post;
    }
  },
  created() {
    this.loadPost()
  },
  watch: {
    "$route.params" () {
      this.loadPost()
    }
  }
};
</script>


<style scoped>
</style>
