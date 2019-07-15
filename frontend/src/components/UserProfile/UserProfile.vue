<template>
  <section class="user-profile" v-if="isShow">
    <div class="main" v-if="user">
      <div class="cover-img-container">
        <!-- <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/3Wf1AkaVBVk.gif" alt /> -->
        <img
          class="cover-img"
          src="https://.fhfa1-2.fna.fbcdn.net/v/t1.0-9/38403321_2119104501466283_2977405208012783616_n.jpg?_nc_cat=101&_nc_oc=AQkO9VO81aD3XeTOtWlEbzuGvtSTAPaQiDteH-D3eexYHVxi2dmXSW1FphEd_FpNlcU&_nc_ht=scontent.fhfa1-2.fna&oh=978dade3bc861f6c0d887ed57480a221&oe=5DBCC1E3"
          alt
        />
      </div>
      <div class="profile-img-container">
        <img class="profile-img" :src="user.url.profileImg" alt />

        <h1 class="username">{{user.username}}</h1>
      </div>
    </div>
  </section>
</template>



<script>
import UserService from "../../services/UserService.js";
export default {
  data() {
    return {
      user: null
    };
  },
  computed: {
    isShow() {
      return this.$route.params.userId;
    }
  },
  methods: {
    async loadUser() {
      let user = await UserService.getById(this.$route.params.userId);
      console.log(user);
      this.user = user;
      window.scrollTo(0, 0);
    }
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
  /* background-color: pink; */
}

.main {
  width: 960px;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: white;
  height: 355px;
}

.cover-img-container {
  min-height: 314px;
  background-color: #1c1e20;
}

.cover-img {
  height: 314px;
  object-fit: cover;
  width: 100%;
}

.profile-img-container {
  position: absolute;
  bottom: 10px;
  left: 22px;

  display: flex;
  align-items: center;
}

.profile-img {
  width: 170px;
  border-radius: 50%;
  border: 5px solid white;
  box-shadow: 0 0 2px #616161;
}

.username {
  color: #fff;
  text-rendering: optimizelegibility;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
  font-weight: 400;
  font-size: 27px;
  margin-left: 15px;
}
</style>







