import flatten from 'lodash/flatten'
import get from 'lodash/get'

const hasMultioptions = {
  props: {
    valueAttribute: {
      type: String,
      default: undefined
    },
    textAttribute: {
      type: String,
      default: undefined
    },
    options: {
      type: [Array, Object],
      default: () => []
    },
  },
  computed: {
    normalizedOptions () {
      if (Array.isArray(this.options)) {
        return this.options.map(option => this.normalizeOption(option))
      } else {
        return Object.keys(this.options).map(key => ({
          value: key,
          text: this.options[key]
        }))
      }
    },

    flattenedOptions () {
      return flatten(this.normalizedOptions.map(option => {
        if (option.children) {
          return option.children
        }
        
        return option
      }))
    },
  },
  methods: {
    guessOptionValue(option) {
      if (this.valueAttribute) {
        return get(option, this.valueAttribute) 
      }
      return get(option, 'value', get(option, 'id', get(option, 'text')))
    },
    guessOptionText(option) {
      if (this.textAttribute) {
        return get(option, this.textAttribute) 
      }
      return get(option, 'text', get(option, 'label'))
    },
    normalizeOption (option) {
      if (['string', 'number', 'boolean'].includes(typeof option)) {
        return {
          value: option,
          text: option,
        }
      }

      return {
        value: this.guessOptionValue(option),
        text: this.guessOptionText(option),
      }
    },
  }
}

export default hasMultioptions
