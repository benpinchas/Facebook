<template>
  <input @change="imageChanged" type="file" name id />
</template>


<script>
import CloudinaryService from '../../services/CloudinaryService.js'
export default {
  methods: {
    async imageChanged(ev) {
        let imageUrl = await CloudinaryService.uploadImage(ev)
        console.log('image uploaded: ', imageUrl)
        this.$emit('setImageUrl', imageUrl)
    }
  }
};
</script>


<style scoped>
</style>



