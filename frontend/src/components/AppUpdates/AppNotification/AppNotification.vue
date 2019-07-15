<template>
    <div class="" @click="toggleWindow" >
        <i class="fas fa-bell header-icon" :class="classObj"></i>
         <updates-count :unSeen="unSeen" />
        
         <updates-window v-if="isWindow"> 
            <span slot="content">
                <notification-preview v-for="notification in notifications" :notification="notification"></notification-preview>
            </span>
         </updates-window>
    </div>
</template>



<script>
import UpdatesCount from '../UpdatesCount/UpdatesCount.vue'
import UpdatesWindow from '../../util/UpdatesWindow.vue'
import NotificationPreview from './NotificationPreview.vue'
export default {
    components: {
        UpdatesCount,
        UpdatesWindow,
        NotificationPreview
    },
    data() {
        return {
            isWindow: false,
        }
    },
    computed: {
        notifications() {
            return this.$store.getters.notifications
        },
        unSeen() {
            return this.$store.getters.notifications.filter(notification => !notification.isSeen)
        },
        classObj() {
            return {
                unSeen: this.unSeen.length
            }
        }
    },
    methods: {
        toggleWindow() {
            this.isWindow = !this.isWindow
            this.$store.dispatch({type: 'setAllSeen'})
        }
    },
    created() {
        this.$store.dispatch({type: 'loadNotifications'})
    }

}
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




