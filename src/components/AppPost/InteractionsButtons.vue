<template>
  <div class="interactions-btns">
    <button><i class="far fa-thumbs-up"></i> Like</button>
    <button> <i class="far fa-comment"></i> Comment</button>
    <button><i class="fas fa-share"></i> Share</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.interactions-btns {
  display: flex;
  justify-content: space-between;
}

button {
  background-color: transparent;
  border: none;
  align-items: center;
  color: #606770;
  display: flex;
  flex: 1 0;
  font-weight: 600;
  font-size: 13px;
  height: 32px;
  justify-content: center;
  line-height: 14px;
  padding: 0 2px;
  position: relative;
  text-decoration: none;
  transition: 400ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  text-decoration: none;
}

i {
    font-size: 16px;
    margin-right: 5px;
}
</style>






