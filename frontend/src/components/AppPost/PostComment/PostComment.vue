<template>
    <div class="post-comment">
        <add-comment></add-comment>
        <comment-list></comment-list>
    </div>
</template>


<script>
import AddComment from './AddComment.vue'
import CommentList from './CommentList.vue'
export default {
    components: {
        AddComment,
        CommentList
    }
}
</script>


<style scoped>
.post-comment {
    border-top: 1px solid #d0d0d0;
    padding: 15px;
}


</style>






