<template>
  <input
    v-model="currentValue"
    :id="id"
    :type="type"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :disabled="disabled"
    :max="max"
    :min="min"
    :multiple="multiple"
    :name="name"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :required="required"
    :size="size"
    :value="value"
    :class="classes"
  >
</template>

<script>
import inputAttributes from '../mixins/inputAttributes.js'

export default {
  mixins: [inputAttributes],
  name: 'TTextField',
  props: {
    classes: {
      type: [String, Object, Array],
      default: 'border p-3'
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
