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
  ><slot />
  </button>
</template>

<script>
import commonAttributes from '../mixins/commonAttributes.js'
import { TButtonTheme } from '../themes/default.js'

const {
  defaultClass,
  primaryClass,
  secondaryClass,
  tertiaryClass,
  successClass,
  dangerClass,
  warningClass,
  disabledClass,
  defaultSizeClass,
  largeSizeClass,
  smallSizeClass,
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
    size: {
      type: String,
      default: undefined,
      validator: function (value) {
        return value === undefined || ['lg', 'sm'].indexOf(value) !== -1
      }
    },
    variant: {
      type: String,
      default: undefined,
      validator: function (value) {
        return value === undefined || ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'].indexOf(value) !== -1
      }
    },
    defaultClass: {
      type: [String, Object, Array],
      default: defaultClass
    },
    primaryClass: {
      type: [String, Object, Array],
      default: primaryClass
    },
    secondaryClass: {
      type: [String, Object, Array],
      default: secondaryClass
    },
    tertiaryClass: {
      type: [String, Object, Array],
      default: tertiaryClass
    },
    successClass: {
      type: [String, Object, Array],
      default: successClass
    },
    dangerClass: {
      type: [String, Object, Array],
      default: dangerClass
    },
    warningClass: {
      type: [String, Object, Array],
      default: warningClass
    },
    disabledClass: {
      type: [String, Object, Array],
      default: disabledClass
    },
    defaultSizeClass: {
      type: [String, Object, Array],
      default: defaultSizeClass
    },
    largeSizeClass: {
      type: [String, Object, Array],
      default: largeSizeClass
    },
    smallSizeClass: {
      type: [String, Object, Array],
      default: smallSizeClass
    },
  },

  computed: {
    currentClass () {
      let classes = []

      switch(this.variant) {
        case 'primary':
          classes.push(this.primaryClass)
          break;
        case 'secondary':
          classes.push(this.secondaryClass)
          break;
        case 'tertiary':
          classes.push(this.tertiaryClass)
          break;
        case 'danger':
          classes.push(this.dangerClass)
          break;
        case 'warning':
          classes.push(this.warningClass)
          break;
        case 'success':
          classes.push(this.successClass)
          break;
        default:
          classes.push(this.defaultClass)
      }

      if (this.size === undefined) {
        classes.push(this.defaultSizeClass)
      } else if (this.size === 'sm') {
        classes.push(this.smallSizeClass)
      } else if (this.size === 'lg') {
        classes.push(this.largeSizeClass)
      }

      if (this.disabled) {
        classes.push(this.disabledClass)
      }

      return classes
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
