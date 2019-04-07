const handleClasses = {
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

      if (!this.disabled && this.noStatus) {
        classes.push(this.defaultStatusClass)
      }

      if (this.disabled) {
        classes.push(this.disabledClass)
      }

      if (this.isError) {
        classes.push(this.errorStatusClass)
      } else if (this.isSuccess) {
        classes.push(this.successStatusClass)
      }

      return classes
    },
  }
}

export default handleClasses
