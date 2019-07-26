<template>
  <div :class="currentClass">
    <template v-for="slotName in elementsToRender">
      <component
        :is="getTagName(slotName)"
        :key="slotName"
        :ref="slotName"
        :class="getTagClasses(statusName, slotName)"
        :for="slotName === 'label' ? inputName : null"
      >
        <slot :name="slotName">
          {{ $props[slotName] }}
        </slot>
      </component>
    </template>
  </div>
</template>

<script>
import isEqual from 'lodash/isEqual'
import handleStatus from '../mixins/handleStatus.js'
import TInputGroupTheme from '../themes/default/TInputGroup'

const {
  baseClass,
  statusClass,
  labelClass,
  bodyClass,
  feedbackClass,
  descriptionClass,
} = TInputGroupTheme

export default {
  name: 'TInputGroup',

  mixins: [handleStatus],

  props: {
    inputName: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    feedback: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    orderedElements: {
      type: Array,
      default: () => ['label', 'default', 'feedback', 'description'],
      validator: function (value) {
        const sortedExpectedValue = ['default', 'description', 'feedback', 'label'];
        // The array should contain exactly the same values (in any order)
        return isEqual(value.slice().sort(), sortedExpectedValue)
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
    descriptionClass: {
      type: [String, Object, Array],
      default: descriptionClass
    },
    statusClass: {
      type: [String, Object, Array],
      default: () => statusClass
    },
  },

  computed: {
    /**
     * Only render the elements that has a prop or a slot (always the default prop)
     * @return {Array}
     */
    elementsToRender () {
      return this.orderedElements.filter(e => e === 'default' || !! this.$props[e] || !! this.$slots[e]);
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

  methods: {
    /**
     * Get the tag name according to the slot name
     * @param  {String} slotName
     * @return {String}
     */
    getTagName (slotName) {
      switch(slotName) {
        case 'label':
          return 'label';
      }

      return 'div'
    },

    /**
     * The tag classes + the status specific classes
     * @param  {String} statusName
     * @param  {String} slotName
     * @return {Array}
     */
    getTagClasses (statusName, slotName) {
      const slotClassName = slotName === 'default' ? 'body' : slotName
      return [this[`${slotClassName}Class`], this.statusClass[statusName][slotClassName]]
    },
  },
}
</script>
