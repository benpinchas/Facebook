<template>
  <section class="home-page">
    <aside class="left"></aside>

    <main>
      <router-view class="router" />
      <friend-suggest class="friend-suggest" />
    </main>

    <aside>
      <!-- <friend-suggest class="friend-suggest" /> -->
    </aside>
  </section>
</template>

<script>
import AppPost from "../components/AppPost/AppPost.vue"; //"../AppPost/AppPost.vue";
import FriendSuggest from "../components/FriendSuggest/FriendSuggest.vue";
export default {
  components: {
    AppPost,
    FriendSuggest
  }
};
</script>



<style scoped>
main {
  /* flex-grow: 4; */
  margin: 0 auto;
  width: 950px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: end;
}
main .router {
  flex-grow: 2;
  margin-right: 10px;
  max-width: 592px;
}
main .friend-suggest {
  flex-grow: 1;
  width: 185px;
  /* max-width: 300px; */
}

aside {
  flex-grow: 1;
  /* background-color: lightgray; */
}

aside .friend-suggest {
  max-width: 340px;
}

@media (max-width: 670px) {
  aside {
    display: none;
  }
  main .router {
    margin-right: 0;
  }
}
</style>








