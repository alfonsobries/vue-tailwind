<template>
  <input type="text" v-model="currentValue">
</template>

<script>
export default {
  name: 'TTextField',
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (value) {
      this.currentValue = value
    },
    currentValue (currentValue) {
      this.$emit('input', currentValue)
    }
  }
}
</script>
