<template>
  <div class="">
    <div v-if="!user" class="app-register">
      <input type="text" placeholder="Email" v-model="credentials.email" />
      <input type="text" placeholder="Password" v-model="credentials.password" />
      <button @click="login">Log In</button>
      <button @click="signup">Sign Up</button>
    </div>
    
    <i v-else @click="logout" title="logout" class="fas fa-sign-out-alt header-icon" ></i>
  </div>
</template>


<script>
export default {
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  computed:{
    user() {
      return this.$store.getters.loggedInUser
    }
  },
  methods: {
    login() {
      this.$store.dispatch({ type: "login", credentials: this.credentials });

      this.credentials = {
        email: "",
        password: ""
      };
    },
    signup() {
      this.credentials.username = prompt("username is?");
      this.credentials.url = {} 
      this.credentials.url.profileImg = 'https://i.ibb.co/xfzVHYJ/no-img.jpg'
      this.$store.dispatch({ type: "signup", credentials: this.credentials });
    },
    logout() {
      this.$store.dispatch({type: 'logout'})
    }
  }
};
</script>

<style scoped>
.app-register {
  display: inline-flex;
  height: 22px;
  width: 400px;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #4267b2;
  border-color: #29487d;
  color: white;
  font-weight: 500;
}

button:hover {
  background-color: transparent;
}

input {
  border: 1px solid #ccd0d5;
  border-radius: 0;
  margin: 0;
  padding: 3px;
}

i {
  cursor: pointer;
  color: white;
}

i:hover { 
  color: rgba(255, 255, 255, 0.829);
}
</style>




