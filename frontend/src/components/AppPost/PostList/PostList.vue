<template>
    <div class="post-list">
        <post-preview v-for="n in 4"></post-preview>
    </div>
</template>

<script>
import PostPreview from '../PostPreview/PostPreview.vue'
export default {
    components: {
        PostPreview
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








