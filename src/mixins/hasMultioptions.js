const hasMultioptions = {
  props: {
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
  },
  methods: {
    normalizeOption (option) {
      if (['string', 'number', 'boolean'].includes(typeof option)) {
        return {
          value: option,
          text: option,
        }
      }

      const value = option.hasOwnProperty('value')
        ? option.value
        : (
          option.hasOwnProperty('id')
            ? option.id
            : (
              option.hasOwnProperty('text')
                ? option.text
                : null
              )
        )

      const text = option.hasOwnProperty('text')
        ? option.text
        : (
          option.hasOwnProperty('label')
            ? option.label
            : null
        )

      return {
        value,
        text
      }
    },
  }
}

export default hasMultioptions
