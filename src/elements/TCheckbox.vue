<template>
  <input
    :id="id"
    ref="input"
    v-model="isChecked"
    :value="value"
    :autofocus="autofocus"
    :readonly="readonly"
    :disabled="disabled"
    :name="name"
    :required="required"
    :class="currentClass"
    type="checkbox"
    @blur="onBlur"
    @focus="onFocus"
    @change="onChange"
  >
</template>

<script>
import commonAttributes from '../mixins/commonAttributes.js'
import htmlInputMethods from '../mixins/htmlInputMethods.js'
import handleClasses from '../mixins/handleClasses.js'
import isEqual from 'lodash/isEqual'
import TCheckboxTheme from '../themes/default/TCheckbox'

const {
  baseClass,
} = TCheckboxTheme

export default {
  name: 'TCheckbox',

  mixins: [commonAttributes, htmlInputMethods, handleClasses],

  model: {
    prop: 'model',
    event: 'input'
  },

  props: {
    value: {
      type: [String, Object, Number, Boolean, Array],
      default: true
    },
    uncheckedValue: {
      type: [String, Object, Number, Boolean, Array],
      default: false
    },
    indeterminate: {
      type: [Boolean, String],
      default: false
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
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
    checked: {
      type: Boolean,
      default: null
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
  },

  data () {
    return {
      currentValue: this.model
    }
  },

  computed: {
    isChecked: {
      get () {
        if (Array.isArray(this.model)) {
          return this.model
        } else {
          return this.model === this.value
        }
      },
      set (checked) {
        this.currentValue = checked
      }
    }
  },

  watch: {
    indeterminate: {
      handler(indeterminate) {
        this.$nextTick(() => {
          this.setIndeterminate(indeterminate)
        })
      },
      immediate: true
    },
    checked: {
      handler(checked) {
        this.setChecked(checked)
      },
      immediate: true
    },
  },

  methods: {
    setIndeterminate(indeterminate) {
      if (this.$refs && this.$refs.input) {
        this.$refs.input.indeterminate = indeterminate
        // Emit update event to prop
        this.$emit('update:indeterminate', indeterminate)
      }
    },

    setChecked(checked) {
       if (this.$refs && this.$refs.input) {
        this.$refs.input.checked = !checked
        this.$refs.input.click()
        // Emit update event to prop
        this.$emit('update:checked', checked)
      }
    },

    onChange (e) {
      let currentValue
      let isChecked
      if (Array.isArray(this.isChecked)) {
        currentValue = this.currentValue
        isChecked = this.isChecked.indexOf(this.value) >= 0
      } else {
        currentValue = this.currentValue ? this.value : this.uncheckedValue
        isChecked = this.currentValue ? true : false
      }

      this.$emit('input', currentValue)
      this.$emit('change', currentValue)
      this.$emit('update:indeterminate', false)
      this.$emit('update:checked', isChecked)
    },

    onBlur (e) {
      this.$emit('blur', e)
    },

    onFocus (e) {
      this.$emit('focus', e)
    },

    focus () {
      this.$refs.input.focus()
    },

    blur () {
      this.$refs.input.blur()
    },
  },
}
</script>
