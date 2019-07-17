<template>
  <section>
    <div class="gradient gradient-preview" :class="post.gradientClass" ref="contenteditable">{{post.txt}}</div>
  </section>
</template>


<script>
export default {
  props: ["post"],
  methods: {
    setContent() {
      this.$parent.$emit(
        "setGradientTxt",
        this.$refs.contenteditable.innerText
      );
    }
  }
};
</script>




<style scoped>



</style>








