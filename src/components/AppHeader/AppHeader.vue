<template>
  <header>
    <main v-if="true">
      <img src="https://www.facebook.com/rsrc.php/v3/y4/r/gf6iHxsw8zm.png" alt="" class="literal-logo">
      <app-register></app-register>
    </main>

    <main v-else>
      <i class="fab fa-facebook-square logo"></i>
    </main>
  </header>
</template>


<script>
import AppRegister from "../AppRegister/AppRegister.vue";
export default {
  components: {
    AppRegister
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
}

.literal-logo {
  width: 120px;
  margin: 7px 0;
      font-size: 49px;
    font-weight: 500;
    margin: 16px 0;
}

.logo {
  font-size: 30px;
}
</style>

