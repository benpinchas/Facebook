<template>
    <div class="post-list">
        <post-preview v-for="n in 4"></post-preview>
    </div>
</template>

<script>
import PostPreview from './PostPreview.vue'
export default {
    components: {
        PostPreview
    }
}
</script>


<style scoped>
.post-list{ 
    
}
</style>








