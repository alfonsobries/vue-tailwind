import Vue from 'vue';
import CssClass from '@/types/CssClass';
import get from 'lodash/get';

const Component = Vue.extend({
  props: {
    variant: {
      type: [String, Object],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: undefined,
    },
    variants: {
      type: Object,
      default: undefined,
    },
  },

  computed: {
    componentClass(): CssClass {
      return this.getElementCssClass();
    },
    activeVariant(): string | undefined {
      if (!this.variant) {
        return undefined;
      }

      if (typeof this.variant === 'object') {
        const truthyVariant = Object.keys(this.variant).find((variant) => !!this.variant[variant]);
        return truthyVariant || undefined;
      }

      return this.variant;
    },
  },

  methods: {
    getElementCssClass(elementName?: string): CssClass {
      if (elementName) {
        if (this.activeVariant) {
          return get(this.variants, `${this.activeVariant}.${elementName}`, undefined);
        }

        return get(this.classes, elementName, undefined);
      }


      if (this.activeVariant) {
        return get(this.variants, this.activeVariant, undefined);
      }


      return this.classes;
    },
  },
});

export default Component;
