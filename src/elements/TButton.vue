<template>
  <component
    :is="validTagName"
    :id="id"
    :value="value"
    :autofocus="autofocus"
    :disabled="disabled"
    :name="name"
    :href="href"
    :type="validTagName === 'button' ? type : null"
    :class="currentClass"
    @blur="onBlur"
    @focus="onFocus"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script>
import commonAttributes from '../mixins/commonAttributes.js'
import { TButtonTheme } from '../themes/default.js'

const {
  baseClass,
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
    tagName: {
      type: String,
      default: 'button',
      validator: function (value) {
        return ['button', 'a'].indexOf(value) !== -1
      }
    },
    value: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'button'
    },
    href: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['lg', 'sm'].indexOf(value) !== -1
      }
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
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
    /**
     * The tag name according to the props
     * @return {String}
     */
    validTagName () {
      if (this.href) {
        return 'a'
      }

      return this.tagName
    },
    /**
     * The default classes for the button
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${ this.size || 'default' }`,
        this.baseClass
      ]
      
      if (this.disabled) {
        classes.push(`${this.$options._componentTag}-disabled`)
        classes.push(this.disabledClass)
      }

      if (this.size === null) {
        classes.push(this.defaultSizeClass)
      } else if (this.size === 'sm') {
        classes.push(this.smallSizeClass)
      } else if (this.size === 'lg') {
        classes.push(this.largeSizeClass)
      }

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
          break;
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

    onClick (e) {
      this.$emit('click', e)
    },

    blur () {
      this.$el.blur()
    },

    focus () {
      this.$el.focus()
    },
  },
}
</script>
