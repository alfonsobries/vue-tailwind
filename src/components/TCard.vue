<template>
  <component
    :is="tagName"
    :class="currentClass"
  >
    <slot v-if="noBody" />
    <template v-else>
      <div
        v-if="header || hasHeaderSlot"
        ref="header"
        :class="headerClass"
      >
        <slot
          v-if="hasHeaderSlot"
          name="header"
        />
        <template v-else-if="header">{{ header }}</template>
      </div>
      <div
        ref="body"
        :class="bodyClass"
      >
        <slot />
      </div>
      <div
        v-if="hasFooterSlot"
        ref="footer"
        :class="footerClass"
      >
        <slot
          name="footer"
        />
      </div>
    </template>
  </component>
</template>

<script>
import { TCardTheme } from '../themes/default.js'

const {
  baseClass,
  bodyClass,
  headerClass,
  footerClass,
} = TCardTheme

export default {
  name: 'TCard',

  props: {
    tagName: {
      type: String,
      default: 'div'
    },
    header: {
      type: String,
      default: null
    },
    noBody: {
      type: Boolean,
      default: false
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    bodyClass: {
      type: [String, Object, Array],
      default: bodyClass
    },
    headerClass: {
      type: [String, Object, Array],
      default: headerClass
    },
    footerClass: {
      type: [String, Object, Array],
      default: footerClass
    },
  },

  computed: {
    hasHeaderSlot () {
      return !!this.$slots['header']
    },
    hasFooterSlot () {
      return !!this.$slots['footer']
    },

    /**
     * The default classes for the card
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${ this.size || 'default' }`,
      ]

      if (this.baseClass) {
        classes.push(this.baseClass)
      }

      return classes
    }
  },
}
</script>
