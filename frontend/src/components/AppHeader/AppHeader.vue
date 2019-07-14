<template>
  <header>
    <main v-if="loggedInUser">
      <div class="wrapper">
        <i class="fab fa-facebook-square logo"></i>
        <app-search />
      </div>

      <div class="wrapper">
        <div class="sep"></div>
        <app-updates/>
        <div class="sep"></div>
        <app-register></app-register>
      </div>
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
}

.wrapper {
    display: flex;
    align-items: center;
}
.wrapper > * {
    margin-right: 10px;
}

.sep {
    background-color: rgba(0, 0, 0, .2);
    width: 1px;
    height: 19px;
}


@media (max-width: 670px) {
  header {
    min-height: 90px;
  }
}
</style>

