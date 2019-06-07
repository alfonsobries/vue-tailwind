import handleStatus from './handleStatus.js'
import handleSize from './handleSize.js'

const handleClasses = {
  mixins: [handleStatus, handleSize],

  computed: {
    /**
     * The classes related with the input status
     * 
     * @return {Array}
     */
    statusClasses () {
      let classes = []

      if (this.disabled) {
        classes.push(`${this.$options._componentTag}-disabled`)
        if (this.disabledClass) {
          classes.push(this.disabledClass)
        }
      }

      if (this.size === null && this.defaultSizeClass) {
        classes.push(this.defaultSizeClass)
      } else if (this.size === 'sm' && this.smallSizeClass) {
        classes.push(this.smallSizeClass)
      } else if (this.size === 'lg' && this.largeSizeClass) {
        classes.push(this.largeSizeClass)
      }

      if (!this.disabled && this.noStatus && this.defaultStatusClass) {
        classes.push(this.defaultStatusClass)
      }

      if (this.isError && this.errorStatusClass) {
        classes.push(this.errorStatusClass)
      } else if (this.isSuccess && this.errorStatusClass) {
        classes.push(this.successStatusClass)
      } else if (this.isWarning && this.warningStatusClass) {
        classes.push(this.warningStatusClass)
      }

      return classes
    },

    /**
     * By default the current class contains only the status classes but it can be overriden
     * in the component
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${ this.size || 'default' }`,
        `${this.$options._componentTag}-status-${ this.statusName }`,
        this.baseClass,
      ]

      return classes.concat(this.statusClasses)
    }
  }
}

export default handleClasses
