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
  
  mixins: [commonAttributes],

  props: {
    value: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'button'
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

  computed: {
    currentClass () {
      let classes = [this.defaultClass]

      if (this.disabled) {
        classes.push(this.disabledClass)
      } else {
        classes.push(this.defaultStatusClass)
      }

      return classes
    }
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
