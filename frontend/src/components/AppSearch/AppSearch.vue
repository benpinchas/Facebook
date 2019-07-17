<template>
  <div class="search-container">
    <div style="position:relative">
      <input @input="onInput" type="text" placeholder="Search" v-model="filterBy.txt" />
      <my-loader class="loader" v-if="isLoading" />
    </div>
    <div class="result-list" @click="clearInput">
      <user-preview v-for="user in users" :user="user" v-if="filterBy.txt" />
    </div>
  </div>
</template>


<script>
import UserService from "../../services/UserService.js";
import UserPreview from "./UserPreview";
import MyLoader from "../util/MyLoader.vue";
import { setTimeout } from 'timers';
export default {
  components: {
    UserPreview,
    MyLoader
  },
  data() {
    return {
      filterBy: {
        txt: "",
        limit: 5
      },
      users: [],
      isLoading: false,
    };
  },
  methods: {
    async onInput() {
      this.isLoading = true
      let users = await UserService.query(this.filterBy);
      this.users = users;
      setTimeout(() => {
        this.isLoading = false
      }, 700)  
    },
    clearInput() {
      this.filterBy.txt = "";
    }
  }
};
</script>




<style scoped>
.search-container {
  position: relative;
}

input {
  font-size: 14px;
  padding: 3px;
  padding-left: 10px;
  font-weight: 300;
  outline: none;
  border: none;
  border-radius: 1px;
  width: 380px;
}

.result-list {
  position: absolute;
  background-color: white;
  width: 100%;
  top: 110%;
  z-index: 10;
}

.loader {
  top: calc(50% - 18px / 2);
  left: 91%;
  width: 18px;
  height: 18px;
}

@media (max-width: 670px) {
  input {
    width: 300px;
  }
}
</style>








