<template>
  <div
    class="room"
    :style="{ marginTop: $route.meta.noHeader ? '0px' : '60px' }"
  >
    <section class="video-content">
      <div class="video-content-header">
        <div class="video-content-header-avatar">
          <img :src="roomDetail.avatar" />
        </div>
        <div>
          <div class="video-content-header-title">{{ roomDetail.title }}</div>
          <div class="video-content-header-anchor">{{ roomDetail.name }}</div>
        </div>
      </div>
      <div class="video-content-main">
        <BarrageStream></BarrageStream>
        <video id="videoElement" width="100%" height="100%" controls></video>
      </div>
    </section>
    <section class="chat-content">
      <Barrage></Barrage>
    </section>
  </div>
</template>
<script>
import flvjs from "flv.js";
import { common } from "@/assets/js/common.js";
import Barrage from "./barrage.vue";
import BarrageStream from "./barrageStream.vue";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      roomDetail: {},
    };
  },
  components: {
    Barrage,
    BarrageStream,
  },
  computed: {
    ...mapState({
      barrageMsgList: (state) => state.barrage.barrageMsgList,
    }),
  },
  created() {},
  async mounted() {
    let urlData = this.$router.history.current.query;
    this.livingRoom = urlData.room;
    this.roomDetail = await this.$api.livingRoomApi.getRoomDetail({
      id: this.livingRoom,
    });
    this.$nextTick(() => {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: `${this.$baseEnv.livingUrl}/${this.livingRoom}.flv`,
        });
        this.flvPlayer.attachMediaElement(videoElement);
        try {
          this.flvPlayer.load();
          this.flvPlayer.play();
        } catch {
          console.log("error");
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.room {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 50vw;
  .video-content {
    box-sizing: border-box;
    height: 100%;
    width: calc(100vw - 360px - 40px);
    min-width: 300px;
    padding: 20px;
    background: #fff;
    position: relative;
    &-header {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      &-avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-title {
        font-size: 20px;
      }
      &-anchor {
        color: #999;
      }
    }
    &-main {
      position: relative;
      height: calc(100% - 60px);
    }
    video {
      object-fit: fill;
    }
  }
  .chat-content {
    width: 360px;
    height: 100%;
    background: #fff;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 20px 0;
  }
}
</style>