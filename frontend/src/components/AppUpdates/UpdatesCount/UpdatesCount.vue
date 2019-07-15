<template>
  <span v-if="unSeen.length">{{unSeen.length}}</span>
</template>


<script>
export default {
  props: ['unSeen']
};
</script>


<style scoped>
span {
    background-color: #fa3e3e;
    border-radius: 2px;
    color: #fff;
    padding: 1px 3px;
    font-size: 11px;
    position: absolute;
    top: -25%;
    left: 68%;

  /* background-clip: padding-box;
  display: inline-block;
  font-family: "helvetica neue", Helvetica, Arial, sans-serif;
  font-size: 10px;
  -webkit-font-smoothing: subpixel-antialiased;
  line-height: 1.3;
  min-height: 13px; */
  /* top: -18%;
  position: absolute;
  font-size: 10px;
  background-color: #f35538;
  border-radius: 2px;
  border-radius: 2px;
  font-weight: 200;
  right: 1%;
  padding: 0 1px;
  padding-bottom: 1px; */
}
</style>

