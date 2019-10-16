<template>
  <div class>
    <div v-if="!user" class="app-register">
      <input type="text" placeholder="Email" v-model="credentials.email" :disabled="isLoading" />
      <input
        type="text"
        placeholder="Password"
        v-model="credentials.password"
        :disabled="isLoading"
      />
      <button @click="login">Log In</button>
      <button @click="signup">Sign Up</button>
    </div>
    <i v-else @click="logout" title="logout" class="fas fa-sign-out-alt header-icon"></i>
  </div>
</template>


<script>
export default {
  data() {
    return {
      credentials: {
        email: "demo@mail.com",
        password: "demo1234"
      },
      isLoading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    login() {
      this.$store.dispatch({ type: "login", credentials: this.credentials });

      this.isLoading = true;

      this.credentials = {
        email: "Connecting..",
        password: "Connecting.."
      };
    },
    signup() {
      this.credentials.username = prompt("username is?");
      this.credentials.url = {};
      this.credentials.url.profileImg = `https://api.adorable.io/avatars/212/${this.credentials.username}.png`; //'https://i.ibb.co/xfzVHYJ/no-img.jpg'
      this.credentials.joinedAt = Date.now();
      this.$store.dispatch({ type: "signup", credentials: this.credentials });
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
    }
  }
};
</script>

<style scoped>
.app-register {
  display: inline-flex;
  height: 22px;
  width: 450px;
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

@media (max-width: 670px) {
  .app-register {
    background-color: #e9ebee;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 45px;
    width: 100vw;
    height: 150px;
    padding: 50px 10px;
  }
}
</style>




