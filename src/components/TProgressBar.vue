<template>
  <div :class="currentClass">
    <div :class="backgroundClass">
      <div :class="barClass" :style="`width: ${normalizedValue}%`">
      </div>
    </div>
  </div>
</template>

<script>
import TProgressBarTheme from '../themes/default/TProgressBar'

const {
  baseClass,
  barClass,
  backgroundClass,
  defaultClass,
  successClass,
  warningClass,
  dangerClass,
  closeButtonClass,
  closeIconClass,
  defaultSizeClass,
  largeSizeClass,
  smallSizeClass,
} = TProgressBarTheme

export default {
  name: 'TProgressBar',
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['lg', 'sm'].indexOf(value) !== -1
      }
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    backgroundClass: {
      type: [String, Object, Array],
      default: backgroundClass
    },
    barClass: {
      type: [String, Object, Array],
      default: barClass
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
    }
  },

  computed: {
    normalizedValue () {
      if (!this.value || this.value < 0) {
        return 0
      }

      if (this.value > 100) {
        return 100
      }

      return Number((parseFloat(this.value)).toFixed(2))
    },

    /**
     * The default classes
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${ this.size || 'default' }`
      ]

      if (this.baseClass) {
        classes.push(this.baseClass)
      }

      if (this.size === null) {
        classes.push(this.defaultSizeClass)
      } else if (this.size === 'sm') {
        classes.push(this.smallSizeClass)
      } else if (this.size === 'lg') {
        classes.push(this.largeSizeClass)
      }

      return classes
    }
  }
}
</script>
