

<template>
  <div>
    <p class="msg-preview income"  :class="classObj">{{msg.txt}}</p>
  </div>
</template>

<script>
export default {
  props: ["msg"],
  computed: {
    classObj() {
      return {
        outcome: this.msg.userId === this.$store.getters.loggedInUser._id,
      };
    }
  }
};
</script>


<style scoped>
@keyframes mymove {
  to {
    transform: scale(1);
  }
}

.msg-preview {
  width: 55%;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  word-break: break-all;
  transform: scale(0);
  animation: mymove 0.3s;
  animation-fill-mode: forwards;  
  font-size: 13px;
}
.income {
  background-color: rgb(233, 233, 233);
  float: left;
  transform-origin: bottom left;
}

.outcome {
  background-color: dodgerblue;
  color: white;
  float: right;
  transform-origin: bottom right;
}


</style>









