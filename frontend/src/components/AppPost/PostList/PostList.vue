<template>
    <div class="post-list">
        <post-preview v-for="post in posts" :post="post"></post-preview>
    </div>
</template>

<script>
import PostPreview from '../PostPreview/PostPreview.vue'
export default {
    components: {
        PostPreview
    },
    computed: {
        posts() {
            console.log(this.$store.getters.posts)
            return this.$store.getters.posts
        }
    },
    created() {
        this.$store.dispatch({type: 'loadPosts'})
    }
}
</script>


<style scoped>
.post-list{ 
    
}
</style>








