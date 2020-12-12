<template>
  <div class="home">

    <FileAgent v-model:files="files"/>
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

  }
});
</script>
