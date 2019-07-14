<template>
  <div @click="toggleWindow" class="friend-request">
    <i class="fas fa-user-friends header-icon"></i>
    <updates-window v-if="isWindow">
      <span slot="content">
        efwefwefew
      </span>
    </updates-window>
  </div>
</template>



<script>
import UpdatesWindow from "../../util/UpdatesWindow.vue";
export default {
  components: {
    UpdatesWindow
  },
  data() {
    return {
      isWindow: false
    };
  },
  methods: {
    toggleWindow() {
      this.isWindow = !this.isWindow;
    }
  }
};
</script>



<style scoped>
.friend-request {
    position: relative;
}
</style>







