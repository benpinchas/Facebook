<template>
  <section class="news-feed">
    <user-profile class="user-profile" />

    <aside class="left">aside</aside>

    <main>
      <app-post class="app-post"></app-post>
      <friend-suggest class="friend-suggest" />
    </main>

    <aside>
      <!-- <friend-suggest class="friend-suggest" /> -->
    </aside>
  </section>
</template>


<script>
// import UserDetails from
import AppPost from "../AppPost/AppPost.vue";
import FriendSuggest from "../FriendSuggest/FriendSuggest.vue";
import UserProfile from "../UserProfile/UserProfile.vue";

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
  width: 100%; /*so flex-wrap would kick-in*/
  margin: 0 auto;
  margin-bottom: 10px;
  padding-left: 38px;/* TODO: avoid this padding-left*/
}

/* TODO SASS */
main {
  /* flex-grow: 4; */
  margin: 0 auto;
  width: 950px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
}
main .app-post {
  flex-grow: 2;
  margin-right: 10px;
}
main .friend-suggest {
  flex-grow: 1;
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
}
</style>
