<template>
  <span class="like-count">
    <div class="img-container">
      <img src="@/assets/like.png" alt />
    </div>
    <span class="count">{{likesCount}}</span>
  </span>
</template>



<script>
export default {
  props: ['likesCount']
};
</script>


<style scoped>
.like-count {
  background-color: white;
  border-radius: 14px;
  position: absolute;
  right: -1%;
  box-shadow: 0 0 2px #c5c5c5;

  display: flex;

  padding: 2px 7px 0px 2px;
  white-space: nowrap;
}

.img-container img {
  width: 23px;
  height: 18px;
  margin-right: 2px;
}

.count {
  padding-top: 2px;
  font-size: 12px;
  color: #777d88;
}
</style>

