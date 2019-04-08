<template>
  <p class="mt-2">
    <span class="text-xs uppercase font-bold text-grey-dark">
      <slot>Field status:</slot>
    </span>
    <label class="flex items-center">
      <input 
        v-model="currentValue" 
        :value="undefined"
        type="radio"
      >
      <span class="ml-2">
        Default size
      </span>
    </label>
    <label class="flex items-center">
      <input 
        v-model="currentValue" 
        :value="'sm'"
        type="radio"
      >
      <span class="ml-2">
        Small
      </span>
    </label>
    <label class="flex items-center">
      <input 
        v-model="currentValue" 
        :value="'lg'"
        type="radio"
      >
      <span class="ml-2">
        Large
      </span>
    </label>
  </p>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    }
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  watch: {
    currentValue(currentValue) {
      this.$emit('input', currentValue)
    },
    value(value) {
      this.currentValue = value
    }
  }
}
</script>