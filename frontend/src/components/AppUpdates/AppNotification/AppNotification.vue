<template>
    <div class="" @click="toggleWindow" >
        <i class="fas fa-bell header-icon"></i>
        <updates-count/>
         <updates-window v-if="isWindow"> 
            <span slot="content">
                <notification-preview v-for="n in 20"></notification-preview>
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
    methods: {
        toggleWindow() {
            this.isWindow = !this.isWindow
        }
    }

}
</script>



<style scoped>
div {
    position: relative;
    cursor: pointer;
}
i {
    color: white;
}
i:hover {
    color: white;
}
</style>




