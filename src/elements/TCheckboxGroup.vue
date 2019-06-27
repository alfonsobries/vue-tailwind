<template>
  <div
    :id="id"
    ref="checkbox-group"
    :class="currentClass"
  >
    <div
      v-if="selectAll"
      :class="selectAllClass"
    >
      <t-checkbox
        :id="`indeterminate`"
        v-model="selectAllOptions"
        :name="name"
        :required="required"
        :disabled="disabled"
        :status="status"
        :size="size"
        :indeterminate="indeterminate"
      />
      <label
        :class="labelClass"
        :for="`indeterminate`"
      >{{ selectAllLabel }}</label>
    </div>

    <div
      v-for="(option, index) in normalizedOptions" 
      :key="`${ id || name }-${index}`"
      :class="optionClass"
    >
      <t-checkbox
        :id="`${ id || name || 'option' }-${index}`"
        :key="`${ id || name }-${index}`"
        v-model="currentValue"
        :value="option.value"
        :name="name"
        :required="required"
        :disabled="disabled"
        :status="status"
        :size="size"
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
import TCheckbox from './TCheckbox'
import TCheckboxGroupTheme from '../themes/default/TCheckboxGroup'

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
} = TCheckboxGroupTheme

export default {
  name: 'TCheckboxGroup',

  components: {
    TCheckbox
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
      type: Array,
      default: () => []
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
    selectAll: {
      type: Boolean,
      default: false
    },
    selectAllLabel: {
      type: String,
      default: 'Select all'
    },
    selectAllClass: {
      type: [String, Object, Array],
      default: optionClass
    }
  },

  data () {
    return {
      currentValue: this.value,
    }
  },

  computed: {
    indeterminate () {
      return this.currentValue.length > 0 &&
          this.currentValue.length !== this.normalizedOptions.length
    },
    selectAllOptions: {
      get () {
        return this.currentValue.length > 0 &&
          this.currentValue.length === this.normalizedOptions.length
      },
      set(value) {
        if (!value) {
          this.currentValue = []
        } else {
          this.currentValue = this.normalizedOptions.map(o => o.value)
        }
      }
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
