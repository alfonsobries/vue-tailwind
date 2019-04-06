<template>
  <div class="relative">
    <select
      ref="select"
      :id="id"
      v-model="currentValue"
      :autofocus="autofocus"
      :disabled="disabled"
      :name="name"
      :required="required"
      :multiple="multiple"
      :size="size"
      :class="currentClass"
      @blur="onBlur"
      @focus="onFocus"
    >
      <option
        v-for="(option, index) in normalizedOptions"
        :key="`${option.value}-${index}`"
        :value="option.value"
        v-text="option.text"
      />
    </select>
    <div v-if="!multiple" class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
      <svg 
        class="fill-current h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
</template>

<script>
import commonAttributes from '../mixins/commonAttributes.js'
import htmlInputMethods from '../mixins/htmlInputMethods.js'
import { TSelectTheme } from '../themes/default.js'

const {
  defaultClass,
  defaultClassMultiple,
  defaultStatusClass,
  errorStatusClass,
  successStatusClass,
  disabledClass,
} = TSelectTheme

export default {
  name: 'TSelect',
  
  mixins: [commonAttributes],

  props: {
    value: {
      type: [String, Number, Array],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    defaultClass: {
      type: [String, Object, Array],
      default: defaultClass
    },
    defaultClassMultiple: {
      type: [String, Object, Array],
      default: defaultClassMultiple
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
    disabledClass: {
      type: [String, Object, Array],
      default: disabledClass
    },
  },

  data () {
    return {
      currentValue: this.value,
    }
  },

  computed: {
    normalizedOptions () {
      return this.options.map(option => {
        if (typeof option === 'string' || typeof option === 'number') {
          return {
            value: option,
            text: option,
          }
        }

        return {
          value: option.value || option.id,
          text: option.text,
        }
      })
    },

    currentClass () {
      let classes = [!this.multiple ? this.defaultClass : this.defaultClassMultiple]

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
