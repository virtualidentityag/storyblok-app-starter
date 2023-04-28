<template>
  <div class="card max-w-sm p-6 mr-auto mt-8 ms-auto">
    <h1 class="font-bold">
      Count: {{ count }}
    </h1>
    <SbButton
      class="button mt-8"
      label="Increment Count"
      variant="primary"
      tooltip-position="bottom"
      @click="increment"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExampleComponent',
  props: {
    startCountAt: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      count: this.$props.startCountAt
    }
  },
  methods: {
    increment (): void {
      this.count++
    }
  }
})
</script>

<style scoped lang="scss">
  .card {
    border: 2px solid $primary;
    border-radius: 5%;
  }
</style>
