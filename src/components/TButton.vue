<template>
  <button
    :id="id"
    :value="value"
    :autofocus="autofocus"
    :disabled="disabled"
    :name="name"
    :class="currentClass"
    @blur="onBlur"
    @focus="onFocus"
  >
    <slot />
  </button>
</template>

<script>
import handleClasses from '../mixins/handleClasses.js'
import commonAttributes from '../mixins/commonAttributes.js'
import { TButtonTheme } from '../themes/default.js'

const {
  defaultClass,
  defaultStatusClass,
  errorStatusClass,
  successStatusClass,
  disabledClass,
} = TButtonTheme

export default {
  name: 'TButton',
  
  mixins: [commonAttributes, handleClasses],

  props: {
    value: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'button'
    },
    status: {
      type: [Boolean, String],
      default: undefined
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
    disabledClass: {
      type: [String, Object, Array],
      default: disabledClass
    },
  },

  methods: {
    onBlur (e) {
      this.$emit('blur', e)
    },

    onFocus (e) {
      this.$emit('focus', e)
    },

    blur () {
      this.$refs.select.blur()
    },

    focus () {
      this.$refs.select.focus()
    },
  },
}
</script>
