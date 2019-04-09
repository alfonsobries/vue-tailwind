const handleClasses = {
  props: {
    status: {
      type: [Boolean, String],
      default: undefined,
      validator: function (value) {
        [undefined, true, false, 'success', 'error'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: undefined,
      validator: function (value) {
        return value === undefined || ['lg', 'sm'].indexOf(value) !== -1
      }
    },
  },
  computed: {
    noStatus () {
      return this.status === undefined
    },
    isSuccess () {
      return this.status === true || this.status === 'success'
    },
    isError () {
      return this.status === false || this.status === 'error'
    },
    currentClass () {
      let classes = [this.defaultClass]

      if (this.size === undefined) {
        classes.push(this.defaultSizeClass)
      } else if (this.size === 'sm') {
        classes.push(this.smallSizeClass)
      } else if (this.size === 'lg') {
        classes.push(this.largeSizeClass)
      }

      if (!this.disabled && this.noStatus) {
        classes.push(this.defaultStatusClass)
      }

      if (this.isError) {
        classes.push(this.errorStatusClass)
      } else if (this.isSuccess) {
        classes.push(this.successStatusClass)
      }

      if (this.disabled) {
        classes.push(this.disabledClass)
      }

      return classes
    },
  }
}

export default handleClasses
