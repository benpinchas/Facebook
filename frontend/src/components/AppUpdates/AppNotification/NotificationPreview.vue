<template>
  <div class="notification-preview">
    <div class="profile-image-container-thumb">
      <img src="https://i.ibb.co/xfzVHYJ/no-img.jpg" alt />
    </div>
    <div>Lorem ipsum dolor consequatur vero ea eos omnis totam illum modi praesentium, voluptatum ipsum? Voluptas, optio? A?</div>
  </div>
</template>


<script>
export default {
  props: ["notification"]
};
</script>

<style scoped>
.notification-preview {
  height: 60px;
  display: flex;
  padding: 0px 15px;
  padding-top: 10px;
  font-size: 13px;
  color: rgb(29, 33, 41);
  border-bottom: 1px solid #e0e0e0;

  background-color: #edf2fa;
}
.unread {
    background-color: #edf2fa;
}

</style>




