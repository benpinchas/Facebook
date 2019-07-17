<template>
    <div class="img-container">
        <img :src="content" >
    </div>
</template>

<script>
export default {
    props: ['content']    
}
</script>


<style scoped>
.img-container{
    width: 100%;
}

img {
    width: 100%;
}
</style>


