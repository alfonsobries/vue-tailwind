<template>
  <div 
    :id="id"
    ref="radio-group" 
    :class="currentClass"
  >
    <div 
      v-for="(option, index) in normalizedOptions" 
      :key="`${ id || name }-${index}`"
      :class="optionClass"
    >
      <t-radio
        :id="`${ id || name || 'option' }-${index}`"
        :key="`${ id || name }-${index}`"
        v-model="currentValue"
        :value="option.value"
        :name="name"
        :required="required"
        :disabled="disabled"
        :status="status"
        :size="size"
        :class="inputClass"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />

      <label 
        :class="labelClass" 
        :for="`${ id || name || 'option' }-${index}`"
      >{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
import hasMultioptions from '../mixins/hasMultioptions.js'
import handleClasses from '../mixins/handleClasses.js'
import TRadio from './TRadio'
import TRadioGroupTheme from '../themes/default/TRadioGroup'

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
  optionClass,
  labelClass,
  inputClass,
} = TRadioGroupTheme

export default {
  name: 'TRadioGroup',

  components: {
    TRadio
  },
  
  mixins: [hasMultioptions, handleClasses],

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
    optionClass: {
      type: [String, Object, Array],
      default: optionClass
    },
    labelClass: {
      type: [String, Object, Array],
      default: labelClass
    },
    inputClass: {
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
    onInput (value) {
      this.currentValue = value
    },

    onBlur (e) {
      this.$emit('blur', e)
    },

    onFocus (e) {
      this.$emit('focus', e)
    }
  }
}
</script>
