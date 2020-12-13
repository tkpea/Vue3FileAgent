<template>
<div class="file_agent" :class="{'is-drag': state.isDrag}"  :ref="refs.dropZone">
  <div class="file_agent--wrapper">
    <input class="file_agent--file_input" :ref="refs.input" type="file" :multiple="multiple"/>
    <figure class="file_agent--file_items">

      <FileAgentItem
          v-for="(item, index) in state.pickFiles"
          :key="`file-thumbnail${index}`"
          :file="item.file"
          :thumbnailPath="item.thumbnailPath"
          class="file_agent--file_item file_agent--cell"
          @remove="removeItem(index)"
          :isShow="item.isShow"
      >
      </FileAgentItem>
      <div class="file_agent--cell file_agent--upload">
        <button class="button">
          ファイルを選択
        </button>
      </div>
    </figure>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import FileAgentItem from "@/components/FileAgentItem.vue";
import {readImage} from "@/components/FileAgentService";



interface PickFile {
  thumbnailPath?: string
  file: File
  isShow: boolean
}
interface State {
  isDrag: boolean
  pickFiles: PickFile[]
}
type Props = {
  multiple: boolean
}
export default defineComponent({
  components: {FileAgentItem},
  props: {
    multiple: {
      type: true,
      default: true,
    },
    create: {
      type: Function,
      default: () => {}
    },
    remove: {
      type: Function,
      default: () => {}
    }
  },
  setup: function (props, {emit}) {

    const state = reactive<State>({
      isDrag: false,
      pickFiles: [],
    })
    const refs = {
      input: ref<HTMLInputElement>(),
      dropZone: ref<HTMLInputElement>()
    }

    onMounted( () => {

      refs.input.value?.addEventListener("change",  (event: Event) => {
        const files = (<HTMLInputElement>event.target).files
        if (!files) return
        pushItems(files)
      })
      refs.dropZone.value?.addEventListener("click", (event) => {
        event.stopPropagation()
        refs.input.value?.click()
      })
      refs.dropZone.value?.addEventListener("dragover", (event) => {
        state.isDrag = true
        event.preventDefault()
      })

      refs.dropZone.value?.addEventListener("dragleave", () => {
        state.isDrag = false
      })
      refs.dropZone.value?.addEventListener("drop",  (event) => {
        event.preventDefault()

        const files = event.dataTransfer?.files;
        if (!files) return
        pushItems(files)
      })
      refs.dropZone.value?.addEventListener("dropeffect", (event) => {
        event.preventDefault()
      })
    })


    const pushItems = async (files: FileList) => {
      for (let i = 0; i < files.length; i++) {
        const pickFile: PickFile = {
          file: files[i],
          isShow: true
        }
        if(files[i].type.match("image")) {
          pickFile.thumbnailPath = await readImage(files[i]) as string
        }
        state.pickFiles.push(pickFile)
        emit("onAdd", pickFile.file)
      }
      emit("update:files", state.pickFiles.map((v) => {return v.file}))

    }
    const removeItem = (index: any) => {
      state.pickFiles[index].isShow = false
      window.setTimeout(() => {
        const file = state.pickFiles[index].file
        state.pickFiles.splice(index, 1)
        emit("update:files", state.pickFiles.map((v) => {return v.file}))
        emit("onRemove", file)
      }, 500)
    }
    return {
      refs,
      state,
      removeItem,
    }
  },
});


</script>
<style lang="scss" scoped>
@import './../assets/mediaquery';

.file_agent {
  border: 2px dashed #aaa;
  padding: 2px;
  cursor: pointer;

  .file_agent--file_input {
    display: none;
  }

  &.is-drag {
    border: 2px dashed #ccc;
  }
  .file_agent--file_items {
    margin: 0;
    padding: 0;
    display: grid;

    @include mq-down(sm) {
      grid-template-columns: repeat(2, 50%);
    }
    @include mq-up(sm) {
      grid-template-columns: repeat(3, 33.3333%);
    }
    @include mq-up() {
      grid-template-columns: repeat(4, 25%);
    }

    @include mq-up(lg) {
      grid-template-columns: repeat(5, 20%);
    }
    @include mq-up(xl) {
      grid-template-columns: repeat(6, 16.666666%);
    }
    .file_agent--upload {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f1f1f1;
      position: relative;
      overflow: hidden;
      width: 100%;

      &:before {
        content: "";
        display: block;
        padding-top: 100%;
      }
      .button {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
}

</style>