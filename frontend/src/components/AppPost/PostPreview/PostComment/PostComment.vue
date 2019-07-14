<template>
    <div class="post-comment">
        <add-comment @addComment="addComment"></add-comment>
        <comment-list :comments="comments"></comment-list>
    </div>
</template>


<script>
import AddComment from './AddComment.vue'
import CommentList from './CommentList.vue'
export default {
    props:['comments'],
    components: {
        AddComment,
        CommentList
    },
    methods: {
        addComment(txt) {
            this.$emit('addComment', txt)
        }   
    }
}
</script>


<style scoped>
.post-comment {
    border-top: 1px solid #d0d0d0;
    padding: 15px;
    /* display: none; */
}


</style>






