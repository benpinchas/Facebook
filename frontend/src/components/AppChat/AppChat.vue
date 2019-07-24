<template>
  <div class="app-chat">
    <div class="top" @click="toggleList">
      <span>Chat ({{users.length}})</span>
      <i class="far fa-edit" style="font-size:16px;"></i>
    </div>
    <contact-list v-if="isShowList" :users="users" />
  </div>
</template>


<script>
import ContactList from "./ContactList.vue";
export default {
  components: {
    ContactList
  },
  data() {
    return {
      isShowList: false
    };
  },
  computed: {
    users() {
      return this.$store.getters.approvedUsers;
    }
  },
  methods: {
    toggleList() {
      this.isShowList = !this.isShowList;
    }
  }
};
</script>



<style scoped>
.app-chat {
  position: fixed;
  bottom: 0;
  right: 5%;
  color: rgb(50, 50, 50);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  width: 260px;
}

.top {
  cursor: pointer;
  background-color: #f5f6f7;

  height: 37px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  font-size: 14px;
  font-weight: 600;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px;
}
</style>







