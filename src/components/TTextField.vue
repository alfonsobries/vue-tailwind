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
    :value="value"
    @blur="onBlur"
    @focus="onFocus"
    @keyup="$emit('keyup', $event)"
    @keydown="$emit('keydown', $event)"
    :class="currentClass"
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
  successStatusClass
} = TTextFieldTheme

export default {
  mixins: [htmlInputAttributes, htmlInputMethods],
  name: 'TTextField',
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

      return classes
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
