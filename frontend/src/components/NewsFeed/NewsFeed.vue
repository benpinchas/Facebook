<template>
  <section class="news-feed">
    <user-profile class="user-profile" />
    <aside class="left">aside</aside>
    <main>
      <app-post></app-post>
    </main>

    <aside class="right">
      <friend-suggest class="friend-suggest" />
    </aside>
  </section>
</template>


<script>
// import UserDetails from
import AppPost from "../AppPost/AppPost.vue";
import FriendSuggest from "../FriendSuggest/FriendSuggest.vue";
import UserProfile from '../UserProfile/UserProfile.vue'

// import friendsList from
export default {
  components: {
    AppPost,
    FriendSuggest,
    UserProfile
  }
};
</script>


<style scoped>
.news-feed {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
}

.user-profile {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
}

main {
  flex-grow: 4;
  max-width: 550px;
}
aside {
  flex-grow: 1;
  /* background-color: lightgray; */
}

aside.right {
  flex-grow: 2;
  padding: 0 10px;
}

aside .friend-suggest {
  max-width: 340px;
}

@media (max-width: 670px) {
  aside {
    display: none;
  }
}
</style>
