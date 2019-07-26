<template>
  <div class @click="toggleWindow">
    <i class="fas fa-bell header-icon" :class="classObj"></i>
    <unseen-count :unseen="unseen" />

    <updates-window v-if="isWindow">
      <span slot="top">Notificatios</span>
      <span slot="content">
        <notification-preview v-for="notification in notifications" :notification="notification" :key="notification._id"></notification-preview>
      </span>
    </updates-window>
  </div>
</template>



<script>
import UnseenCount from "../UnseenCount/UnseenCount.vue";
import UpdatesWindow from "../../util/UpdatesWindow.vue";
import NotificationPreview from "./NotificationPreview.vue";
import { setTimeout } from "timers";
export default {
  components: {
    UnseenCount,
    UpdatesWindow,
    NotificationPreview
  },
  data() {
    return {
      isWindow: false
    };
  },
  computed: {
    notifications() {
      return this.$store.getters.notifications;
    },
    unseen() {
      return this.$store.getters.unSeenNotifications;
    },
    classObj() {
      return {
        unseen: this.unseen.length //global class
      };
    }
  },
  methods: {
    toggleWindow() {
      this.isWindow = !this.isWindow;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadNotifications" });
  },
};
</script>



<style scoped>
div {
  position: relative;
  cursor: pointer;
}
i {
  /* color: white; */
}
i:hover {
  /* color: white; */
}
</style>




