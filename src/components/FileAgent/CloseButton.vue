<link rel="stylesheet" href="../../assets/mediaquery.scss">
<template>

  <button
      class="close-button"
      ref="closeButtonRef"
  >

    <span class="close-icon" :style="{backgroundColor: color, fontSize: size}"> </span>
  </button>
</template>
<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  props: {
    color: {
      type: String,
      default: "#fff"
    },
    size: {
      type: String,
      default: "0.85em"
    }
  },
  setup(props, context) {
    const closeButtonRef = ref<HTMLButtonElement>();
    onMounted(() => {
      closeButtonRef.value?.addEventListener('click', (event) => {
        context.emit("remove")
        event.stopImmediatePropagation()
      })
    })
    return {
      closeButtonRef
    }
  }

})
</script>
<style lang="scss" scoped>
.close-button {

  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;
}
.close-icon {
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  width: 1em;
  height: 0.1em;
  border-radius: 0.1em;
  position: relative;
  transform: rotate(45deg);
}
.close-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  transform: rotate(90deg);
}
</style>