<template>
  <div class="home">

    <FileAgent
        v-model:files="files"
        @onRemove="onRemove"
        @onAdd="onAdd"
    />
    <pre>
      {{files}}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import FileAgent from "@/components/FileAgent.vue"; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    FileAgent,
    HelloWorld,
  },
  data(){
    return {
      files: []
    }
  },
  mounted() {

  },
  methods: {
    /**
     * ファイル追加時のハンドラー
     * @param file
     */
    onAdd(file: File) {
      console.log("onAdd")
    },
    /**
     * ファイル削除時のハンドラー
     * @param index
     */
    onRemove(index: number) {
      console.log("onRemove")
    }
  }
});
</script>
