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
    :value="value"
    :class="currentClass"
    @blur="onBlur"
    @focus="onFocus"
    @keyup="$emit('keyup', $event)"
    @keydown="$emit('keydown', $event)"
  >
</template>

<script>
import htmlInputAttributes from '../mixins/htmlInputAttributes.js'
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
  
  mixins: [htmlInputAttributes, htmlInputMethods],

  props: {
    size: {
      type: String,
      default: null
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

      switch (this.size) {
        case 'sm':
          classes.push(this.smallClasses)
          break
        case 'lg':
          classes.push(this.largeClasses)
          break
        default:
          classes.push(this.defaultClasses)
      }

      if (this.disabled) {
        classes.push(this.disabledClass)
      }

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
