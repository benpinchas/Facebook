<template>
  <div class>
    <side-box>
      <span slot="headline">People You May Know</span>
      <span slot="main">
        <suggest-preview v-for="suggest in suggests" :suggest="suggest" />
      </span>
    </side-box>
  </div>
</template>


<script>
//cmpc
import SideBox from "../util/SideBox.vue";
import SuggestPreview from "./SuggestPreview.vue";

export default {
  components: {
    SideBox,
    SuggestPreview
  },
  computed: {
    suggests() {
      return this.$store.getters.suggests
    }
  },
  async created() {
    this.$store.dispatch({type: 'loadSuggests'})
  }
};
</script>

<style>
.root-el {
  padding: 10px;
}
header {
  margin-bottom: 10px;
}
</style>








