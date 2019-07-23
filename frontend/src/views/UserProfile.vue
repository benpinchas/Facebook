<template>
  <section class="user-profile" v-if="user">
    <user-details class="user-details" :user="user" />
    
    <section class="flex">
       <app-post class="app-post"></app-post>
       <aside>
       <user-friends :friends="user.friends"/>
       <friend-suggest class="friend-suggest" />
    </aside>
    </section>

  </section>
</template>

<script>
import AppPost from "../components/AppPost/AppPost.vue"; //"../AppPost/AppPost.vue";
import FriendSuggest from "../components/FriendSuggest/FriendSuggest.vue";
import UserDetails from "../components/UserDetails/UserDetails.vue";
import UserFriends from "../components/UserDetails/UserFriends/UserFriends.vue";
import UserService from '../services/UserService.js'
export default {
  components: {
    AppPost,
    FriendSuggest,
    UserDetails,
    UserFriends
  },
  data() {
    return {
      user: null
    }
  },
  methods: {
    async loadUser() {
      if (this.$route.params.userId) {
        let user = await UserService.getById(this.$route.params.userId);
        this.user = user;
        window.scrollTo(0, 0);
      }
    },
  },
  created() {
      this.loadUser();
    },
    watch: {
      "$route.params.userId": async function() {
        this.loadUser();
      }
    }
};
</script>



<style scoped>
.user-profile {
  /* flex-grow: 4; */
  margin: 0 auto;
  width: 950px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.user-details {
  margin-bottom: 10px;
  /* width: 100%; */
}



.flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.app-post{
  flex-grow: 2;
  margin-right: 10px;
  /* width: 55%; */
}

aside {
  flex-grow: 1;
  max-width: 320px;
}

aside > * {
  margin-bottom: 10px;

}

@media (max-width: 670px) {
  aside {
    display: none;
  }
  main {
    margin-right: 0;
  }
}
</style>








