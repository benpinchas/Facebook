<template>
  <div class="app-register dev">
    <input type="text" placeholder="Email" />
    <input type="text" placeholder="Password" />
    <button>Log In</button>
    <button>Sign Up</button>
  </div>
</template>


<script>
export default {};
</script>

<style scoped>
.app-register {
  display: inline-flex;
  height: 22px;
  width: 400px;
  justify-content: space-between;
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
</style>




