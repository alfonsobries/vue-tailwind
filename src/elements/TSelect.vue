<template>
  <div 
    ref="select-wrapper" 
    :class="wrapperClass"
  >
    <select
      :id="id"
      ref="select"
      v-model="currentValue"
      :autofocus="autofocus"
      :disabled="disabled"
      :name="name"
      :required="required"
      :multiple="multiple"
      :class="currentClass"
      @blur="onBlur"
      @focus="onFocus"
    >
      <template v-for="(option, index) in normalizedOptions">
        <optgroup
          v-if="option.children"
          :key="`${option.value}-optgroup-${index}`"
          :value="option.value"
          :label="option.text"
        >
          <option
            v-for="(childOption, index2) in option.children"
            :key="`${childOption.value}-${index}-${index2}`"
            :value="childOption.value"
            v-text="childOption.text"
          />
        </optgroup>
        <option
          v-else
          :key="`${option.value}-${index}`"
          :value="option.value"
          v-text="option.text"
        />
      </template>
    </select>
    <div 
      v-if="!multiple" 
      :class="arrowWrapperClass"
    >
      <svg 
        :class="arrowClass" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20"
      ><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
    </div>
  </div>
</template>

<script>
import commonAttributes from '../mixins/commonAttributes.js'
import hasMultioptions from '../mixins/hasMultioptions.js'
import handleClasses from '../mixins/handleClasses.js'
import TSelectTheme from '../themes/default/TSelect'
import get from 'lodash/get'

const {
  baseClass,
  baseClassMultiple,
  defaultStatusClass,
  errorStatusClass,
  successStatusClass,
  warningStatusClass,
  disabledClass,
  defaultSizeClass,
  largeSizeClass,
  smallSizeClass,
  wrapperClass,
  arrowWrapperClass,
  arrowClass,
} = TSelectTheme

export default {
  name: 'TSelect',
  
  mixins: [commonAttributes, handleClasses, hasMultioptions],

  props: {
    value: {
      type: [String, Number, Array, Object],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    baseClassMultiple: {
      type: [String, Object, Array],
      default: baseClassMultiple
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
    arrowWrapperClass: {
      type: [String, Object, Array],
      default: arrowWrapperClass
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
    arrowClass: {
      type: [String, Object, Array],
      default: arrowClass
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: wrapperClass
    },
  },

  data () {
    return {
      currentValue: this.value,
    }
  },

  computed: {
    /**
     * The default classes for the select are different for multiptions
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${ this.size || 'default' }`,
        `${this.$options._componentTag}-status-${ this.statusName }`,
        !this.multiple ? this.baseClass : this.baseClassMultiple,
      ]

      if (this.multiple) {
        classes.push(`${this.$options._componentTag}-multiple`)
      }

      return classes.concat(this.statusClasses)
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
    guessOptionValue(option) {
      return get(option, 'value', get(option, 'id', get(option, 'text')))
    },
    guessOptionText(option) {
      return get(option, 'text', get(option, 'label'))
    },
    normalizeOption (option) {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          value: option,
          text: option,
        }
      }

      if (option.children && Array.isArray(option.children)) {
        return {
          value: this.guessOptionValue(option),
          text: this.guessOptionText(option),
          children: option.children.map(childOption => this.normalizeOption(childOption))
        }
      }
      
      return {
        value: this.guessOptionValue(option),
        text: this.guessOptionText(option),
      }
    },
  
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
