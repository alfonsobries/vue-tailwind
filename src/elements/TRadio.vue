<template>
  <input
    :id="id"
    ref="input"
    v-model="currentValue"
    :value="value"
    :autofocus="autofocus"
    :readonly="readonly"
    :disabled="disabled"
    :checked="checked"
    :name="name"
    :required="required"
    :class="currentClass"
    type="radio"
    @blur="onBlur"
    @focus="onFocus"
  >
</template>

<script>
import commonAttributes from '../mixins/commonAttributes.js'
import htmlInputMethods from '../mixins/htmlInputMethods.js'
import { TRadioTheme } from '../themes/default.js'
import handleClasses from '../mixins/handleClasses.js'

const {
  defaultClass,
  disabledClass,
} = TRadioTheme

export default {
  name: 'TRadio',

  mixins: [commonAttributes, htmlInputMethods, handleClasses],

  model: {
    prop: 'model',
    event: 'input'
  },

  props: {
    value: {
      type: [String, Object, Number, Boolean],
      default: 'on'
    },
    checked: {
      type: [Boolean, String],
      default: false
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean],
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
  },

  data () {
    return {
      currentValue: this.checked ? this.value : this.model
    }
  },

  watch: {
    model(model) {
      if (model !== this.currentValue) {
        this.currentValue = model
        if (this.model === this.currentValue) {
          this.$emit('input', model)
          this.$emit('change', model)
        }
      }
    },
    checked(checked) {
      const currentValue = checked ? this.value : null
      if (currentValue !== this.currentValue) {
        this.currentValue = currentValue
        if (this.model === this.currentValue) {
          this.$emit('input', model)
          this.$emit('change', model)
        }
      }
    },
    currentValue(currentValue) {
      if (this.model !== this.currentValue) {
        this.$emit('input', currentValue)
        this.$emit('change', currentValue)
      }
    },
  },

  methods: {
    onBlur (e) {
      this.$emit('blur', e)
    },

    onFocus (e) {
      this.$emit('focus', e)
    }
  },
}
</script>
