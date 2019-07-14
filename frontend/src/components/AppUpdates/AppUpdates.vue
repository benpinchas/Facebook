<template>
    <div class="app-updates">
        <friend-request/>
        <app-msg/>
        <app-notification/>
    </div>
</template>


<script>
import AppMsg from './AppMsg/AppMsg.vue'
import AppNotification from './AppNotification/AppNotification.vue'
import FriendRequest from './FriendRequest/FriendRequest.vue'

export default {
    components: {
        AppMsg,
        AppNotification,
        FriendRequest
    }
}
</script>



<style scoped>

    .app-updates {
        width: 100px;

        display: flex;
        justify-content: space-between;
    }
</style>







