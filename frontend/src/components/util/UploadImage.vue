<template>
  <input @change="imageChanged" type="file" name id />
</template>


<script>
import CloudinaryService from '../../services/CloudinaryService.js'
export default {
  methods: {
     imageChanged(ev) {
       console.log(ev)
        let prmImageUrl = CloudinaryService.uploadImage(ev)
        this.$emit('setImageUrl', prmImageUrl)
    }
  }
};
</script>


<style scoped>
</style>



