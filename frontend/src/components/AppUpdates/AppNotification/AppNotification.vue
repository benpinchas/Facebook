<template>
    <div>
        <i class="fas fa-bell header-icon"></i>
        <updates-count/>
    </div>
</template>



<script>
import UpdatesCount from '../UpdatesCount/UpdatesCount.vue'
export default {
    components: {
        UpdatesCount
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




