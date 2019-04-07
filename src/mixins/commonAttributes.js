const commonAttributes = {
  props: {
    id: {
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
    name: {
      type: String,
      default: null
    },
    tabindex: {
      type: [String, Number],
      default: null
    },
  }
}

export default commonAttributes
