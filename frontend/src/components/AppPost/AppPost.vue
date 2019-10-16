<template>
  <section class="app-post">
    <CreatorMsg></CreatorMsg>
    <add-post></add-post>
    <post-list></post-list>
  </section>
</template>

<script>
import AddPost from "./AddPost/AddPost.vue";
import PostList from "./PostList/PostList.vue";
import CreatorMsg from '../CreatorMsg/CreatorMsg.vue'
export default {
  components: {
    AddPost,
    PostList,
    CreatorMsg
  }
};
</script>

<style scoped>
</style>













