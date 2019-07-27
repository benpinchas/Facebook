<template>
  <div class="contact-cmp">
    <div class="top" @click="toggleList">
      <div class="main">
        <span>Chat ({{users.length}})</span>
        <i class="far fa-edit" style="font-size:16px;"></i>
      </div>
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
.contact-cmp {
  width: 280px;
  box-shadow: 0 0 3px #cecece;
  background-color: white;
  border-radius: 8px 8px 0 0;
}
/* .top {
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
} */

.top {
  cursor: pointer;
  min-height: 43px;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  border-radius: 8px 8px 0 0;
}
.top:hover {
  background-color: #f5f5f5;
}
.top .main {
  width: 90%;
  margin: 0 auto;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 670px) {
  .top {
    display: none;
  }
}
</style>
