const handleSize = {
  props: {
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['lg', 'sm'].indexOf(value) !== -1
      }
    },
  },

  computed: {
    noStatus () {
      return this.status === null
    },
    isSuccess () {
      return this.status === true || this.status === 'success'
    },
    isError () {
      return this.status === false || this.status === 'error'
    },
    isWarning () {
      return this.status === 'warning'
    },
    statusName () {
      if (this.isError) {
        return 'error'
      }

      if (this.isSuccess) {
        return 'success'
      }

      if (this.isWarning) {
        return 'warning'
      }

      return 'default'
    },
  }
}

export default handleSize
