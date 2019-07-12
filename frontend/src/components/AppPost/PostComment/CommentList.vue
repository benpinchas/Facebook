<template>
    <div class="comment-list">
        <comment-preview v-for="n in 4"></comment-preview>
    </div>
</template>


<script>
import CommentPreview from './CommentPreview.vue'
export default {
    components: {
        CommentPreview,
    }
}
</script>



<style scoped>
    /* padding: 8px 10px; */
</style>

