<template>
  <div class @click="toggleWindow">
    <audio
      id="notificationSound"
      src="https://vocaroo.com/media_command.php?media=s0vVbhgcma0r&command=download_mp3"
    ></audio>

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
    document.querySelector('body').addEventListener('mouseup', (ev) => {
      if (this.isWindow) setTimeout(() => {
        this.isWindow = false
      }, 50) 
    })
  },
   watch: {
    "unseen.length"() {
      if (this.unseen.length) {
        console.log('qwdqw')
         document.getElementById('notificationSound').play();
      }
    }
  }
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




