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
        No status
      </span>
    </label>
    <label class="flex items-center">
      <input 
        v-model="currentValue" 
        :value="true"
        type="radio"
      >
      <span class="ml-2">
        Success
      </span>
    </label>
    <label class="flex items-center">
      <input 
        v-model="currentValue" 
        :value="false"
        type="radio"
      >
      <span class="ml-2">
        Error
      </span>
    </label>
  </p>
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