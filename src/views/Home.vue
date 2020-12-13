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
import storage from "@/plugins/storage";
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
      storage.create(file, 'files')
    },
    /**
     * ファイル削除時のハンドラー
     * @param index
     */
    onRemove(file: File) {
      console.log(file)
      console.log("onRemove")
      storage.remove(file, 'files')
    }
  }
});
</script>
