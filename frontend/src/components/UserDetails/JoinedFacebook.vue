<template>
    <div class="floating-box root-el">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Facebook_logo_36x36.svg" alt="" class="logo">
        <h2>Joined Facebook</h2>
        <span class="date" v-if="time">{{ time | fDate }}</span>
        <span class="date" v-else>July 11, 2019</span>
    </div>
</template>


<script>
export default {
    props: ['time'],
}
</script>


<style scoped>
.root-el {
    min-height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
img.logo {
    width: 38px;
    height: 38px;
}
.date {
    color: dimgrey;
}

</style>
