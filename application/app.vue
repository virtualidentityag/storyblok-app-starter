<template>
  <ClientOnly>
    <pre class="text-3xl m-auto">
      {{ $data.user }}
    </pre>
    <ExampleComponent :start-count-at="2" />
  </ClientOnly>
</template>

<script lang="ts">
import ExampleComponent from './components/example/Component.vue'
export default {
  name: 'AppRoot',
  components: {
    ExampleComponent
  },
  data () {
    return {
      user: {}
    }
  },
  async mounted () {
    const { $storyblok } = useNuxtApp()
    this.$data.user = await $storyblok.getUserInfo()
  }
}
</script>
