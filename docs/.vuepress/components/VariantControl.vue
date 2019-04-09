<template>
  <p class="mt-2">
    <span class="text-xs uppercase font-bold text-grey-dark">
      <slot>Field variant:</slot>
    </span>
    <label 
      v-for="variant in options" 
      :key="variant.value" 
      class="flex items-center"
    >
      <input 
        v-model="currentValue" 
        :value="variant.value"
        type="radio"
      >
      <span 
        class="ml-2" 
        v-text="variant.text" />
    </label>
  </p>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    },
    options: {
      type: Array,
      required: true
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