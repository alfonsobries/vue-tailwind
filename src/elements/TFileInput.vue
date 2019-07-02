<template>
  <label
    :class="currentClass"
    :autofocus="autofocus"
  >
    <slot name="icon">
      <svg style="width:24px;height:24px" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
      </svg>
    </slot>
    <slot>{{ label }}</slot>
    <input
      type="file"
      class="hidden"
      :multiple="multiple"
      :name="name"
      :accept="accept"
      @change="change"
    />
  </label>
</template>

<script>
import commonAttributes from '../mixins/commonAttributes.js'
import TFileInputTheme from '../themes/default/TFileInput'

const {
  baseClass,
  defaultClass,
  primaryClass,
  secondaryClass,
  tertiaryClass,
  successClass,
  dangerClass,
  warningClass,
  disabledClass,
  defaultSizeClass,
  largeSizeClass,
  smallSizeClass,
  defaultLabel
} = TFileInputTheme

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

export default {
  name: 'TFileInput',

  mixins: [commonAttributes],

  props: {
    value: {},
    multiple: Boolean,
    accept: String,
    label: {
      type: String,
      default: defaultLabel
    },
    max: {
      type: [Number, String],
      default: 10
    },
    maxSize: {
      type: [Number, String],
      default: 2 * 1024 ** 2 // 2MB
    },
    variant: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'].indexOf(value) !== -1
      }
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
    defaultClass: {
      type: [String, Object, Array],
      default: defaultClass
    },
    primaryClass: {
      type: [String, Object, Array],
      default: primaryClass
    },
    secondaryClass: {
      type: [String, Object, Array],
      default: secondaryClass
    },
    tertiaryClass: {
      type: [String, Object, Array],
      default: tertiaryClass
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
    disabledClass: {
      type: [String, Object, Array],
      default: disabledClass
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
    },
  },

  computed: {
    /**
     * The default classes for the button
     *
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${ this.size || 'default' }`,
        this.baseClass
      ]
      
      if (this.disabled) {
        classes.push(`${this.$options._componentTag}-disabled`)
        classes.push(this.disabledClass)
      }

      if (this.size === null) {
        classes.push(this.defaultSizeClass)
      } else if (this.size === 'sm') {
        classes.push(this.smallSizeClass)
      } else if (this.size === 'lg') {
        classes.push(this.largeSizeClass)
      }

      switch(this.variant) {
        case 'primary':
          classes.push(this.primaryClass)
          break;
        case 'secondary':
          classes.push(this.secondaryClass)
          break;
        case 'tertiary':
          classes.push(this.tertiaryClass)
          break;
        case 'danger':
          classes.push(this.dangerClass)
          break;
        case 'warning':
          classes.push(this.warningClass)
          break;
        case 'success':
          classes.push(this.successClass)
          break;
        default:
          classes.push(this.defaultClass)
          break;
      }

      return classes
    }
  },

  methods: {
    change (e) {
      const files = event.target.files
      const errors = []

      const maxFilesNumberReached = files.length > this.max
      if (maxFilesNumberReached) {
        errors.push(`Your selection has too many files (${this.max} max.)`)
      }

      const filesSize = files.length
        ? Array.from(files).reduce((prev, curr) => prev += curr.size, 0)
        : 0
      const maxFilesSizeReached = filesSize > this.maxSize
      if (maxFilesSizeReached) {
        errors.push(`Your selection is too big (${bytesToSize(this.maxSize)} max.)`)
      }

      if (errors.length > 0) {
        this.$emit('error', errors)
        return
      }

      this.$emit('input', files)
    }
  }
}
</script>
