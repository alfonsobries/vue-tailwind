<template>
  <component
    :is="tagName"
    v-if="localShow"
    :class="currentClass"
  >
    <slot />
    <span
      v-if="dismissible"
      ref="close"
      :class="closeButtonClass"
      @click="hide"
    >
      <slot name="close">
        <svg
          :class="closeIconClass"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>{{ closeButtonTitle }}</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
      </slot>
    </span>
  </component>
</template>

<script>
import TAlertTheme from '../themes/default/TAlert'

const {
  baseClass,
  defaultClass,
  infoClass,
  successClass,
  warningClass,
  dangerClass,
  closeButtonClass,
  closeIconClass,
} = TAlertTheme

export default {
  name: 'TAlert',
  props: {
    tagName: {
      type: String,
      default: 'div'
    },
    variant: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['danger', 'warning', 'success'].indexOf(value) !== -1
      }
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: null,
    },
    closeButtonTitle: {
      type: String,
      default: 'Close',
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    defaultClass: {
      type: [String, Object, Array],
      default: defaultClass
    },
    infoClass: {
      type: [String, Object, Array],
      default: infoClass
    },
    successClass: {
      type: [String, Object, Array],
      default: successClass
    },
    dangerClass: {
      type: [String, Object, Array],
      default: dangerClass
    },
    warningClass: {
      type: [String, Object, Array],
      default: warningClass
    },
    closeButtonClass: {
      type: [String, Object, Array],
      default: closeButtonClass
    },
    closeIconClass: {
      type: [String, Object, Array],
      default: closeIconClass
    },
  },

  data () {
    return {
      localShow: this.show,
    }
  },

  computed: {
    /**
     * The classes related with the input status
     * 
     * @return {Array}
     */
    statusClasses () {
      let classes = []

      if (!this.variant && this.defaultClass) {
        classes.push(this.defaultClass)
      } else {
        switch (this.variant) {
          case 'info':
            classes.push(this.infoClass)
            break;
          case 'danger':
            classes.push(this.dangerClass)
            break;
          case 'success':
            classes.push(this.successClass)
            break;
          case 'warning':
            classes.push(this.warningClass)
            break;
        }
      }

      return classes
    },

    /**
     * The default classes
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-variant-${ this.statusName }`,
      ]

      if (this.baseClass) {
        classes.push(this.baseClass)
      }

      return classes.concat(this.statusClasses)
    }
  },

  watch: {
    show (show) {
      this.localShow = show
    },
    localShow (localShow) {
      this.$emit('update:show', localShow)
      if (this.localShow) {
        this.$emit('shown')
        if (this.timeout) {
          this.initTimeout()
        }
      } else {
        this.$emit('hidden')
      }
    },
  },

  mounted () {
    if (this.localShow && this.timeout) {
      this.initTimeout()
    }
  },

  methods: {
    initTimeout () {
      setTimeout(() => {
        this.hide()
      }, this.timeout)
    },
    hide () {
      this.localShow = false;
    }
  }
}
</script>
