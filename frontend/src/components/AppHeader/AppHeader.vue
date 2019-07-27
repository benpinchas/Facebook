<template>
  <header>
    <main v-if="loggedInUser">
      <div class="wrapper">
        <i class="fab fa-facebook-square logo" @click="$router.push('/')"></i>
        <app-search />
      </div>

      <div class="wrapper hide-mobile">
        <div class="link-container" @click="$router.push(`/user/${loggedInUser._id}`)">
          <img :src="loggedInUser.url.profileImg" />
          {{loggedInUser.username}}
        </div>
        <div class="sep"></div>
        <span class="link-container" @click="$router.push('/')">Home</span>
        <div class="sep"></div>
        <app-updates />
        <div class="sep"></div>
      </div>
      <app-register></app-register>
    </main>

    <main v-else>
      <img src="https://www.facebook.com/rsrc.php/v3/y4/r/gf6iHxsw8zm.png" alt class="literal-logo" />
      <app-register></app-register>
    </main>
  </header>
</template>


<script>
import AppRegister from "../AppRegister/AppRegister.vue";
import AppUpdates from "../AppUpdates/AppUpdates.vue";
import AppSearch from "../AppSearch/AppSearch.vue";
export default {
  components: {
    AppRegister,
    AppUpdates,
    AppSearch
  },
  computed: {
    loggedInUser() {
      console.log(this.$store.getters.loggedInUser);
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>


<style scoped>
header {
  background-color: #4267b2;
  border-bottom: 1px solid #29487d;
  color: #fff;
  min-height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 100;
}

main {
  width: 1000px;
  display: flex;
  max-width: 95%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.literal-logo {
  width: 120px;
  margin: 7px 0;
  font-size: 49px;
  font-weight: 500;
  margin: 16px 0;
}

.logo {
  font-size: 28px;
  cursor: pointer;
}

.wrapper {
  display: flex;
  align-items: center;
}
.wrapper > * {
  margin-right: 10px;
}
/* .profile-link-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

.link-container img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 6px;
  box-shadow: 0 0 1px #a5a5a5;
}
.link-container {
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  height: 31px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.link-container:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

@media (max-width: 670px) {
  header {
    min-height: 90px;
  }
  .hide-mobile {
    display: none;
  }
}
</style>

