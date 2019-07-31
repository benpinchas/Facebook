<template>
  <div class="interactions-btns">
    <button class="like-btn-wrapper">
      <div class="pseudo" hidden>
        <div class="reactions-container">
          <img src="@/assets/reactions/react-like.png" @click="saveReact('like')" />
          <img src="@/assets/reactions/react-love.png" @click="saveReact('love')" />
          <img src="@/assets/reactions/react-haha.png" @click="saveReact('haha')" />
          <img src="@/assets/reactions/react-wow.png" @click="saveReact('wow')" />
          <img src="@/assets/reactions/react-angry.png" @click="saveReact('angry')" />
        </div>
      </div>
      <button class="like-btn" :class="likeBtnClass" @click="toggleReact('like')">
        <img :src="reactImg" v-if="reactType" />
        <i class="far fa-thumbs-up" v-else></i>
        {{reactTxt | fUsername}}
      </button>
    </button>
    <button @click="toggleComments">
      <i class="far fa-comment"></i> Comment
    </button>
    <button>
      <i class="fas fa-share"></i> Share
    </button>
  </div>
</template>

<script>
import { setInterval } from "timers";
export default {
  props: ["reactType"],
  computed: {
    reactImg() {
      return (
        {
          wow: `https://i.ibb.co/xHHMqQc/react-wow.png`,
          sad: "https://i.ibb.co/nL1qs2N/react-sad.png",
          haha: "https://i.ibb.co/pWzb4Hx/react-haha.png",
          like: "https://i.ibb.co/txFPK4n/react-like.png",
          love: "https://i.ibb.co/mh7ZnmJ/react-love.png",
          angry: "https://i.ibb.co/KhXqzbf/react-angry.png"
        }[this.reactType] || ""
      );
    },
    reactTxt() {
      return this.reactType || "Like";
    },
    likeBtnClass() {
      return {
        [this.reactType]: true
      };
    }
  },
  methods: {
    toggleLike() {
      this.$emit("toggleLike");
    },
    toggleReact(reactType) {
      if (this.reactType) {
        this.$emit("removeReact")
      } else {
          this.$emit("saveReact", reactType)
      }
    },
    toggleComments() {
      this.$emit("toggleComments");
    },
    saveReact(reactType) {
      this.$emit("saveReact", reactType);
    }
  }
};
</script>








<style scoped>
.interactions-btns {
  position: relative;
}
button.like-btn {
  position: relative;
}
.like-btn-wrapper:hover .pseudo {
  display: block;
}
.pseudo {
  position: absolute;
  left: -30px;
  top: -80px;
  margin: 15px;
  padding: 10px;
  z-index: 100;
  background-color: transparent;
}
.reactions-container {
  background-color: white;
  border-radius: 19px;
  padding: 5px;
  width: max-content;
  z-index: 20;
  box-shadow: 0px -1px 2px #d4d4d4;
  padding: 3px 0px;
}

.reactions-container:hover {
  display: block;
  transition: 1s;
}

.reactions-container img {
  width: 40px;
  height: 40px;
  /* margin-right: 5px; */
  margin: 0 5px;
}
.reactions-container img:hover {
  transform: scale(1.35);
  transition: 0.25s;
}

.interactions-btns {
  display: flex;
  justify-content: space-between;
}

button {
  background-color: transparent;
  border: none;
  align-items: center;
  color: #606770;
  display: flex;
  flex: 1 0;
  font-weight: 500;
  font-size: 14px;
  height: 32px;
  justify-content: center;
  line-height: 14px;
  padding: 0 2px;
  position: relative;
  text-decoration: none;
  transition: 400ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
}

button > img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.liked {
  color: rgb(32, 120, 244);
  font-weight: 600;
}
.liked i {
  font-weight: 600;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  text-decoration: none;
  opacity: 1 !important;
}

i {
  font-size: 16px;
  margin-right: 5px;
}
.love {
  color: rgb(243, 62, 88);
}
.haha,
.wow,
.sad {
  color: rgb(247, 177, 37);
}
.like {
  color: rgb(32, 120, 244);
}
.angry {
  color: rgb(233, 113, 15);
}
</style>






