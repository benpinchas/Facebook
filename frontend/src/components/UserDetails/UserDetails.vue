<template>
  <section class="user-profile" v-if="isShow">
    <div class="main" v-if="user">
      <div
        class="cover-img-container"
        v-bind:style="{ 'background-image': 'url('+user.url.coverImg+')' }"
      >
        <my-loader v-if="isLoadCoverImg" />
        <!-- {{friendshipStatus}} -->

        <upload-image
          v-if="canEdit"
          @setImageUrl="setCoverImage"
          class="custom-file-input cover-img-input"
        />
      </div>
      <div class="profile-img-container">
        <div style="position:relative;">
          <img class="profile-img" :src="user.url.profileImg" alt />
          <upload-image
            v-if="canEdit"
            @setImageUrl="setProfileImage"
            class="custom-file-input profile-img-input"
          />
          <my-loader v-if="isLoadProfileImg" />
        </div>

        <h1 class="username">{{user.username | fUsername}}</h1>
      </div>
      <div class="btns-container">
        
        <!-- <button class="profile-btn">
          <i class="fas fa-check"></i> Friends
        </button> -->
        
        <friendship-button :user="user"></friendship-button>

        
        <button>
          <i class="fab fa-facebook-messenger"></i> Message
        </button>
      </div>
    </div>


        <!-- <pre class="dev" style="color:white" >
           {{user}}
        </pre> -->
  </section>
</template>



<script>
import UserService from "../../services/UserService.js";
import UploadImage from "../util/UploadImage.vue";
import MyLoader from "../util/MyLoader.vue";
import FriendshipButton from '../util/friendship-btn/friendship-btn.vue'
export default {
  components: {
    UploadImage,
    MyLoader,
    FriendshipButton
  },
  props: ['user'],
  data() {
    return {
      isLoadProfileImg: false,
      isLoadCoverImg: false
    };
  },
  computed: {
    isShow() {
      return this.$route.params.userId;
    },
    friendshipStatus() {
      let friendship = this.$store.getters.friendships.find(friendship => {
        return (
          friendship.user1.userId === this.user._id ||
          friendship.user2.userId === this.user._id
        );
      });
      if (!friendship) return "not friends";
      else if (friendship.isApproved) return "approved";
      else if (friendship.user2.userId === this.user._id) return "Sent";
      else return "You need to confirm";
    },
    canEdit() {
      return this.$store.getters.loggedInUser
        ? this.user._id === this.$store.getters.loggedInUser._id
        : false;
    }
  },
  methods: {
    async setProfileImage(prmImageUrl) {
      this.isLoadProfileImg = true;
      let prevImageUrl = this.user.url.profileImg;
      try {
        let imageUrl = await prmImageUrl;
        this.user.url.profileImg = imageUrl;
        await this.$store.dispatch({ type: "saveUser", user: this.user });
      } catch (err) {
        this.user.url.profileImg = prevImageUrl;
      } finally {
        this.isLoadProfileImg = false;
      }
    },
    async setCoverImage(prmImageUrl) {
      this.isLoadCoverImg = true;
      let prevImageUrl = this.user.url.coverImg;
      try {
        let imageUrl = await prmImageUrl;
        this.user.url.coverImg = imageUrl;
        await this.$store.dispatch({ type: "saveUser", user: this.user });
        console.log('user saved')
      } catch (err) {
        this.user.url.coverImg = prevImageUrl;
      } finally {
        this.isLoadCoverImg = false;
      }
    }
  },
};
</script>





<style scoped>
.user-profile {
  /* background-color: pink; */
  max-width: 100%;
}

.cover-img-container {
  min-height: 314px;
  position: relative;
  /* background-color: #1c1e20; */
  background-size: cover;
  background-position-y: center;
  opacity: 0.93;
}

.main {
  width: 950px;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: white;
  height: 355px;
}

.cover-img-container {
  min-height: 314px;
  background-color: #1c1e20;
}

.cover-img {
  height: 314px;
  object-fit: cover;
  width: 100%;
}

.profile-img-container {
  position: absolute;
  bottom: 10px;
  left: 22px;
  display: flex;
  align-items: center;
}

.profile-img {
  width: 172px;
  height: 170px;
  border-radius: 50%;
  border: 5px solid white;
  box-shadow: 0 0 2px #616161;
}

.username {
  color: #fff;
  text-rendering: optimizelegibility;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
  font-weight: 400;
  font-size: 27px;
  margin-left: 15px;
}

.btns-container {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  padding-right: 28px;
}

.btns-container button {
  background-color: #f5f6f7;
  border-color: #ccd0d5;
  color: #4b4f56;
  font-size: 13px;
  font-weight: 500;
  margin-left: 5px;
  padding: 4px 11px;
}

.btns-container button i {
  margin-right: 5px;
}

.custom-file-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  display: inline-block;
  /* background: linear-gradient(top, #f9f9f9, #e3e3e3); */
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  /* text-shadow: 1px 1px #fff; */
  font-weight: 700;
  color: white;
  font-size: 10pt;
}

.custom-file-input:active::before {
  /* background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9); */
}

.cover-img-input::before {
  content: "Set Cover Image";
  background-color: #000000bd;
  border-radius: 2px;
  position: absolute;
  top: 5px;
  left: 5px;
}

.profile-img-input {
  position: absolute;
  bottom: 20px;
  left: 17%;
  opacity: 0;
}
.profile-img-input:hover {
  opacity: 1;
}

.profile-img-input::before {
  content: "Set Profile Image";
  background-color: rgba(0, 0, 0, 0.418);
  font-size: 12px;
}

/* .profile-img-input {
  position: absolute;
  bottom: -40px;
  left: 2%;
  width: 170px;
}
.profile-img-input::before {
  background-color: black;
  border-radius: 2px;
  height: 100px;
  width: 220px;
  padding-left: 24px;
} */
</style>







