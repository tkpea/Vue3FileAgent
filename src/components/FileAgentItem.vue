<template>
  <transition name="fade">
    <div class="file_agent_item" :style="{backgroundColor: color}" v-show="isShow">
      <header class="header">
        <span class="title">{{file.name.split(".")[0]}}</span>

        <CloseButton @remove="onRemove" size="1em"/>
      </header>
      <div class="item" v-if="thumbnailPath">
        <img :src="thumbnailPath" class="image"/>
      </div>
      <footer class="footer">
        <span class="type">{{file.name.split(".")[file.name.split(".").length - 1]}}</span>
        <span class="size">{{bytes}}</span>
      </footer>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from 'vue';
import CloseButton from "@/components/CloseButton.vue";
import {formatBytes} from "@/components/Math";

export default defineComponent({
  components: {CloseButton},
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    thumbnailPath:{
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#ccc"
    },
    isShow: {
      type: Boolean,
      default: true,
    }

  },
  setup(props, context) {
    const onRemove = () => {
      context.emit("remove")
    }
    const bytes = formatBytes(props.file.size)
    onMounted(() => {
      console.log(props.file)
    })

    return {
      onRemove,
      bytes

    }
  },
});



</script>
<style lang="scss" scoped>

.file_agent_item {
  position: relative;
  margin: 1px;
  transition: 0.1s;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1;
    height: 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;

    .title {
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      max-width: calc(100% - 1em);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;

    .type,.size {
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      padding: 2px 8px;
      margin-bottom: 4px;
      border-radius: 4px;
    }
  }
  .item {
    position: relative;
    overflow: hidden;
    width: 100%;

    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;

    }
  }

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>