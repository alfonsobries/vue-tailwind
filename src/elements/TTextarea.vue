<template>
  <textarea
    :id="id"
    ref="textarea"
    v-model="currentValue"
    :autofocus="autofocus"
    :disabled="disabled"
    :name="name"
    :placeholder="placeholder"
    :readonly="readonly"
    :required="required"
    :maxlength="maxlength"
    :rows="rows"
    :wrap="wrap"
    :class="currentClass"
    @blur="onBlur"
    @focus="onFocus"
    @keyup="$emit('keyup', $event)"
    @keydown="$emit('keydown', $event)"
  />
</template>

<script>
import handleClasses from '../mixins/handleClasses.js'
import commonAttributes from '../mixins/commonAttributes.js'
import htmlInputMethods from '../mixins/htmlInputMethods.js'
import TTextareaTheme from '../themes/default/TTextarea'

const {
  baseClass,
  defaultStatusClass,
  errorStatusClass,
  successStatusClass,
  warningStatusClass,
  disabledClass,
  defaultSizeClass,
  largeSizeClass,
  smallSizeClass,
} = TTextareaTheme

export default {
  name: 'TTextarea',
  
  mixins: [commonAttributes, htmlInputMethods, handleClasses],

  props: {
    value: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    maxlength: {
      type: [String, Number],
      default: null
    },
    readonly: {
      type: Boolean,
      default: undefined
    },
    rows: {
      type: [String, Number],
      default: 2
    },
    wrap: {
      type: String,
      default: 'soft'
    },
    status: {
      type: [Boolean, String],
      default: undefined
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
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
    warningStatusClass: {
      type: [String, Object, Array],
      default: warningStatusClass
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

  data () {
    return {
      currentValue: this.value,
      valueWhenFocus: null
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
