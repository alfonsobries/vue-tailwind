<template>
  <input
    :type="type"
    v-model="currentValue"
    :disabled="disabled"
    :id="id"
    :name="name"
  >
</template>

<script>
export default {
  name: 'TTextField',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
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
