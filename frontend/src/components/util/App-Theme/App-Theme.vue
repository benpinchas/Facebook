<template>
    <img :src="imgSrc" alt="" @click="toggleTheme">
</template>



<script>
export default {
    data() {
        return {
            isDark: false,
        }
    },
    methods: {
        toggleTheme() {
            document.querySelector('body').classList.toggle('dark')
            this.isDark = !this.isDark
        },
    },
    computed: {
        imgSrc() {
            return (this.isDark)? 
            'https://svgshare.com/i/EF4.svg' : 'https://svgshare.com/i/EH9.svg'
        }
    }
}
</script>


<style scoped>
img {
    cursor: pointer;
    position: fixed;
    width: 50px;
    height: 50px;
    top: 100px;
    right: 20px;
    z-index: 100;
}
</style>






