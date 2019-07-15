<template>
    <div class="comment-list">
        <comment-preview v-for="comment in comments" :comment="comment"></comment-preview>
    </div>
</template>


<script>
import CommentPreview from './CommentPreview.vue'
export default {
    props:['comments'],
    components: {
        CommentPreview,
    }
}
</script>



<style scoped>
    /* padding: 8px 10px; */
</style>

