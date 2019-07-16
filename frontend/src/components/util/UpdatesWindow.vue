<template>
  <div class="updates-window floating-box">
    <div class="top">
      <slot name="top"> </slot>
    </div>
    <div class="content-container">
      <slot
        name="content"
      >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum corrupti neque recusandae beatae optio, libero saepe nam voluptatem! Saepe laboriosam optio nihil consequuntur distinctio quo quia, eius tempore fuga porro.</slot>
    </div>
  </div>
</template>


<script>
export default {};
</script>


<style scoped>
.updates-window {
  color: black;
  background-color: white;
  position: absolute;
  width: 430px;
  max-width: 100vw;
  right: -10px;
  top: 36px;
  height: 550px;
  z-index: 10;
  box-shadow: 0 0 3px #bfbfbf;
}

.top {
  color: #333;
  font-size: 12px;
  font-weight: 600;
  border-bottom: 1px solid #cacaca;
  padding: 8px 15px;
}

.content-container {
  overflow-y: scroll;
  height: 94%;
}
</style>








