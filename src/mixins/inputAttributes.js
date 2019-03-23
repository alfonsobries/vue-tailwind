const inputAttributes = {
  props: {
    id: {
      type: String,
      default: null
    },
    autocomplete: {
      type: String,
      default: null
    },
    autofocus: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: [String, Number],
      default: null
    },
    min: {
      type: [String, Number],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    pattern: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: NaN
    },
    tabindex: {
      type: [String, Number],
      default: null
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}

export default inputAttributes
