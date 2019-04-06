<template>
  <input
    :id="id"
    v-model="currentValue"
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
    :class="currentClass"
    @blur="onBlur"
    @focus="onFocus"
    @keyup="$emit('keyup', $event)"
    @keydown="$emit('keydown', $event)"
  >
</template>

<script>
import commonAttributes from '../mixins/commonAttributes.js'
import htmlInputMethods from '../mixins/htmlInputMethods.js'
import { TTextFieldTheme } from '../themes/default.js'

const {
  defaultClass,
  defaultStatusClass,
  errorStatusClass,
  successStatusClass,
} = TTextFieldTheme

export default {
  name: 'TTextField',

  mixins: [commonAttributes, htmlInputMethods],

  props: {
    value: {
      type: [String, Number],
      default: null
    },
    autocomplete: {
      type: String,
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    maxlength: {
      type: [String, Number],
      default: null
    },
    min: {
      type: [String, Number],
      default: null
    },
    minlength: {
      type: [String, Number],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    defaultClass: {
      type: [String, Object, Array],
      default: defaultClass
    },
    defaultStatusClass: {
      type: [String, Object, Array],
      default: defaultStatusClass
    },
    errorStatusClass: {
      type: [String, Object, Array],
      default: errorStatusClass
    },
    successStatusClass: {
      type: [String, Object, Array],
      default: successStatusClass
    },
  },

  data () {
    return {
      currentValue: this.value,
      valueWhenFocus: null
    }
  },

  computed: {
    currentClass () {
      let classes = [this.defaultClass]

      return classes
    }
  },
  watch: {
    value (value) {
      this.currentValue = value
    },

    currentValue (currentValue) {
      this.$emit('input', currentValue)
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
}
</script>
