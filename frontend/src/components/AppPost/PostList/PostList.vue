<template>
    <div class="post-list">
        <post-preview v-for="post in posts"  :key="post._id" :post="post">{{post._id}}</post-preview>
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
            return this.$store.getters.posts
        }
    },
    methods: {
        async loadPosts() {
            //TODO: implement loader (the async await is for the loader)
            let {userId} = this.$route.params
            await this.$store.dispatch({type: 'loadPosts', filterBy: {userId}})
        }
    },
    created() {
       this.loadPosts()
    },
    watch: {
        "$route.params.userId"() {
             this.loadPosts()
        }
    }
}
</script>


<style scoped>
.post-list{ 
    
}
</style>








