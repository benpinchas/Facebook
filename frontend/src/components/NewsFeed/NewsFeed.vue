<template>
    <section class="news-feed">
        <aside>
            aside
        </aside>
        <main>
            <app-post></app-post>
        </main>

        <aside>
            
        </aside>
    </section>
</template>


<script>
// import UserDetails from 
import AppPost from '../AppPost/AppPost.vue'
// import friendsList from
export default {
    components: {
        AppPost,
    }
}
</script>


<style scoped>
.news-feed {
    display: flex;
}
main {
    flex-grow: 4;
    max-width: 550px;
}
aside {
    flex-grow: 1;
    /* background-color: lightgray; */
}
</style>
