<template>
  <input
    v-model="currentValue"
    :id="id"
    :type="type"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :disabled="disabled"
    :max="max"
    :maxlength="maxlength"
    :min="min"
    :minlength="minlength"
    :multiple="multiple"
    :name="name"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :required="required"
    :size="size"
    :value="value"
    :class="classes"
    @blur="onBlur"
    @focus="onFocus"
  >
</template>

<script>
import htmlInputAttributes from '../mixins/htmlInputAttributes.js'
import htmlInputMethods from '../mixins/htmlInputMethods.js'

export default {
  mixins: [htmlInputAttributes, htmlInputMethods],
  name: 'TTextField',
  props: {
    classes: {
      type: [String, Object, Array],
      default: 'border p-3'
    }
  },
  data () {
    return {
      currentValue: this.value,
      valueWhenFocus: null
    }
  },
  methods: {
    onBlur (e) {
      this.$emit('blur', e)
      if (this.currentValue !== this.valueWhenFocus) {
        this.$emit('change', this.currentValue)
      }
    },
    onFocus (e) {
      this.$emit('focus', e)
      this.valueWhenFocus = this.currentValue
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
