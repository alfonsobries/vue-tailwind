import Vue from 'vue';
import CssClass from '@/types/CssClass';
import get from 'lodash/get';

const Component = Vue.extend({
  props: {
    classes: {
      type: [String, Array, Object],
      default: undefined,
    },
    fixedClasses: {
      type: [String, Array, Object],
      default: undefined,
    },
    variants: {
      type: Object,
      default: undefined,
    },
    variant: {
      type: [String, Object],
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
    getElementCssClass(
      elementName?: string,
      defaultClasses: CssClass | undefined = undefined,
    ): CssClass {
      let classes;

      if (elementName) {
        if (this.activeVariant) {
          const elementVariant = get(this.variants, `${this.activeVariant}.${elementName}`);
          // If the variant exists but not for the element fallback to the default
          if (elementVariant === undefined
              && get(this.variants, this.activeVariant) !== undefined) {
            classes = get(this.classes, elementName, defaultClasses);
          } else {
            classes = elementVariant === undefined ? defaultClasses : elementVariant;
          }
        } else {
          classes = get(this.classes, elementName, defaultClasses);
        }

        const fixedClasses = get(this.fixedClasses, elementName);

        if (fixedClasses) {
          return [fixedClasses, classes];
        }

        return classes;
      }

      if (this.activeVariant) {
        classes = get(this.variants, this.activeVariant, defaultClasses);
      } else {
        classes = this.classes === undefined ? defaultClasses : this.classes;
      }

      if (this.fixedClasses) {
        return [this.fixedClasses, classes];
      }

      return classes;
    },
  },
});

export default Component;
