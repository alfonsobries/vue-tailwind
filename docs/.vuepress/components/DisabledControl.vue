<template>
  <label class="flex items-center">
    <input 
      v-model="currentValue" 
      type="checkbox"
    >
    <span class="ml-2 text-xs uppercase font-bold text-gray-600">
      Disabled
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
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