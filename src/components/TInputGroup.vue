<template>
  <div :class="currentClass">
    <label
      v-if="label || hasLabelSlot"
      ref="label"
      :class="statusClass[statusName].label"
    >
      <slot
        v-if="hasLabelSlot"
        name="label"
      />
      <template v-else-if="label">{{ label }}</template>
    </label>
    <div :class="statusClass[statusName].body">
      <slot />
    </div>

    <div
      v-if="feedback || hasFeedbackSlot"
      ref="feedback"
      :class="statusClass[statusName].feedback"
    >
      <slot
        v-if="hasFeedbackSlot"
        name="feedback"
      />
      <template v-else-if="feedback">{{ feedback }}</template>
    </div>
  </div>
</template>

<script>
import { TInputGroupTheme } from '../themes/default.js'

const {
  baseClass,
  labelClass,
  bodyClass,
  feedbackClass,
  defaultStatusClass,
  errorStatusClass,
  successStatusClass,
  warningStatusClass,
  errorStatus,
} = TInputGroupTheme

export default {
  name: 'TInputGroup',

  props: {
    label: {
      type: String,
      default: null
    },
    feedback: {
      type: String,
      default: null
    },
    status: {
      type: [Boolean, String],
      default: null,
      validator: function (value) {
        return [null, true, false, 'success', 'error', 'warning'].indexOf(value) !== -1
      }
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    labelClass: {
      type: [String, Object, Array],
      default: labelClass
    },
    bodyClass: {
      type: [String, Object, Array],
      default: bodyClass
    },
    feedbackClass: {
      type: [String, Object, Array],
      default: feedbackClass
    },
    defaultStatusClass: {
      type: [String, Object, Array],
      default: defaultStatusClass
    },
    errorStatusClass: {
      type: [String, Object, Array],
      default: errorStatusClass
    },
    successStatusClass: {
      type: [String, Object, Array],
      default: successStatusClass
    },
    warningStatusClass: {
      type: [String, Object, Array],
      default: warningStatusClass
    },
    errorStatus: {
      type: [String, Object, Array],
      default: () => errorStatus
    },
  },

  computed: {
    hasLabelSlot () {
      return !!this.$slots['label']
    },

    hasFeedbackSlot () {
      return !!this.$slots['feedback']
    },

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

    /**
     * The default classes for the input group
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
      ]

      if (this.baseClass) {
        classes.push(this.baseClass)
      }

      return classes
    }
  },
}
</script>
