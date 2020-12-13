<template>
  <div class="home">
    <section class="my-5 mx-5">
      <FileAgent
          v-model:files="files"
          @onRemove="onRemove"
          @onAdd="onAdd"
      />
      <pre>
      {{files}}
    </pre>
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import FileAgent from "@/components/FileAgent/FileAgent.vue"; // @ is an alias to /src
import storage from "@/plugins/storage";
import store from "@/store"

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
      const directory = store.state.user.uid || "visitor"
      storage.create(file, directory)
    },
    /**
     * ファイル削除時のハンドラー
     * @param index
     */
    onRemove(file: File) {
      const directory = store.state.user.uid || "visitor"
      storage.remove(file, directory)
    }
  }
});
</script>
