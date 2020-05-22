import Vue from 'vue';
import CssClass from '@/types/CssClass';
import get from 'lodash/get';

const HtmlInput = Vue.extend({
  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
    variant: {
      type: [String, Object],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: undefined,
    },
    theme: {
      type: Object,
      default: undefined,
    },
  },

  computed: {
    inputClass(): CssClass {
      return this.getElementCssClass();
    },
    activeVariant(): string | undefined {
      if (this.variant) {
        return undefined;
      }

      if (typeof this.variant === 'object') {
        const firstTruthyKey = Object.keys(this.variant).find((key) => !!this.variant[key]);
        return firstTruthyKey ? this.variant[firstTruthyKey] : undefined;
      }

      return this.variant;
    },
  },

  methods: {
    getElementCssClass(elementName?: string): CssClass {
      if (elementName) {
        if (this.activeVariant) {
          return get(this.theme, `${this.activeVariant}.${elementName}`, undefined);
        }

        return get(this.classes, elementName, undefined);
      }

      if (this.activeVariant) {
        return get(this.theme, this.activeVariant, undefined);
      }

      return this.classes;
    },
  },
});

export default HtmlInput;
