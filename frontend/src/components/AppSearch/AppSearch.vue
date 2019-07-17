<template>
  <div class="search-container">
    <input @input="onInput" type="text" placeholder="Search" v-model="filterBy.txt" />
    <div class="result-list" @click="clearInput">
      <user-preview v-for="user in users" :user="user" v-if="filterBy.txt" />
    </div>
  </div>
</template>


<script>
import UserService from "../../services/UserService.js";
import UserPreview from "./UserPreview";
export default {
  components: {
    UserPreview
  },
  data() {
    return {
      filterBy: {
        txt: "",
        limit: 5
      },
      users: []
    };
  },
  methods: {
    async onInput() {
      console.log(this.filterBy.txt);
      let users = await UserService.query(this.filterBy);
      console.log("users:", users);
      this.users = users;
    },
    clearInput() {
      this.filterBy.txt = ""
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

@media (max-width: 670px) {
  input {
    width: 300px;
  }
}
</style>








