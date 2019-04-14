<template>
  <div 
    ref="radio-group" 
    :id="id"
    :class="currentClass"
  >
    <span
      v-for="(option, index) in normalizedOptions"
      :key="`${option.value}-${index}`"
      :value="option.value"
      :class="labelClass"
    >
      <input
        :id="`${ id || name || '' }-${option.value}`"
        v-model="currentValue"
        :value="option.value"
        :disabled="disabled"
        :name="name"
        :required="required"
        :class="inputClass"
        type="radio"
        @blur="onBlur"
        @focus="onFocus"
      >
      <label 
        :class="textClass" 
        :for="`${ id || name || '' }-${option.value}`"
      >{{ option.text }}</label>
    </span>
  </div>
</template>

<script>
import hasMultioptions from '../mixins/hasMultioptions.js'
import handleClasses from '../mixins/handleClasses.js'
import { TRadioTheme } from '../themes/default.js'

const {
  defaultClass,
  defaultStatusClass,
  errorStatusClass,
  successStatusClass,
  warningStatusClass,
  disabledClass,
  defaultSizeClass,
  largeSizeClass,
  smallSizeClass,
  labelClass,
  inputClass,
  textClass,
  controlClass,
} = TRadioTheme

export default {
  name: 'TRadio',
  
  mixins: [handleClasses, hasMultioptions],

  props: {
    id: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    },
    required: {
      type: Boolean,
      default: false
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
    labelClass: {
      type: [String, Object, Array],
      default: labelClass
    },
    inputClass: {
      type: [String, Object, Array],
      default: inputClass
    },
    textClass: {
      type: [String, Object, Array],
      default: inputClass
    },
  },

  data () {
    return {
      currentValue: this.value,
    }
  },

  watch: {
    value (value) {
      this.currentValue = value
    },

    currentValue (currentValue) {
      this.$emit('input', currentValue)
      this.$emit('change', currentValue)
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
