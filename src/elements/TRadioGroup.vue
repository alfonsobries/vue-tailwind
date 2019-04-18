<template>
  <div 
    ref="radio-group" 
    :class="defaultClass"
  >
    <div v-for="(option, index) in normalizedOptions">
      <t-radio
        :id="`${ id || name || '' }-${option.value}`"
        :key="`${ id || name }-${index}`"
        :value="option.value"
        v-model="currentValue"
        :name="name"
        :required="required"
        :status="status"
        :size="size"
        @input="onInput"
      />

      <label :for="`${ id || name }-${index}`">{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
import hasMultioptions from '../mixins/hasMultioptions.js'
import { TRadioGroupTheme } from '../themes/default.js'

const {
  defaultClass,
} = TRadioGroupTheme

export default {
  name: 'TRadioGroup',
  
  mixins: [hasMultioptions],

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
      default: null,
      validator: function (value) {
        return [null, true, false, 'success', 'error', 'warning'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['lg', 'sm'].indexOf(value) !== -1
      }
    },
    defaultClass: {
      type: [String, Object, Array],
      default: defaultClass
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
    }
  }
}
</script>
