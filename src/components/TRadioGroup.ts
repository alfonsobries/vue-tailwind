import { CreateElement, VNode } from 'vue';
import isEqual from 'lodash/isEqual';
import kebabCase from 'lodash/kebabCase';
import InputWithOptions from '../base/InputWithOptions';
import TRadio from '../inputs/TRadio';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';

const TRadioGroup = InputWithOptions.extend({
  name: 'TRadioGroup',

  props: {
    groupWrapperTag: {
      type: String,
      default: 'div',
    },
    wrapperTag: {
      type: String,
      default: 'label',
    },
    inputWrapperTag: {
      type: String,
      default: 'span',
    },
    labelTag: {
      type: String,
      default: 'span',
    },
    fixedClasses: {
      type: Object,
      default() {
        return {};
      },
    },
    classes: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      localValue: this.value,
    };
  },

  watch: {
    localValue(localValue: string | null | string[]) {
      this.$emit('input', localValue);

      this.$emit('change', localValue);
    },
    value(value) {
      this.localValue = value;
    },
  },

  render(createElement) {
    const createRadioGroupFunc: (createElement: CreateElement) => VNode = this.createRadioGroup;
    return createRadioGroupFunc(createElement);
  },

  methods: {
    createRadioGroup(createElement: CreateElement) {
      return createElement(
        this.groupWrapperTag,
        {
          ref: 'wrapper',
          class: this.getElementCssClass('groupWrapper'),
        },
        this.createRadioOptions(createElement),
      );
    },
    createRadioOptions(createElement: CreateElement): VNode[] {
      const options: NormalizedOptions = this.normalizedOptions;

      return options
        .map(
          (option: NormalizedOption, index) => this.createRadioOption(createElement, option, index),
        );
    },
    createRadioOption(
      createElement: CreateElement,
      option: NormalizedOption,
      index: number,
    ): VNode {
      return createElement(
        TRadio,
        {
          props: {
            id: this.buildId(option, index),
            name: this.name,
            tabindex: this.tabindex,
            disabled: this.disabled,
            autofocus: this.autofocus,
            required: this.required,
            model: this.localValue,
            label: option.text,
            wrapped: true,
            value: option.value,
            checked: this.value === option.value,
            variant: this.variant,
            classes: this.classes,
            fixedClasses: this.fixedClasses,
            variants: this.variants,
            wrapperTag: this.wrapperTag,
            inputWrapperTag: this.inputWrapperTag,
            labelTag: this.labelTag,
          },
          scopedSlots: {
            default: this.$scopedSlots.default,
          },
          on: {
            blur: this.blurHandler,
            focus: this.focusHandler,
            input: (value: string | number) => {
              if (isEqual(value, option.value)) {
                this.inputHandler(option.value);
              }
            },
          },
        },
      );
    },

    buildId(option: NormalizedOption, index: number) {
      const parts = [];

      if (this.id) {
        parts.push(this.id);
      } else if (this.name) {
        parts.push(this.name);
      }

      if (['string', 'number'].includes(typeof option.value)) {
        parts.push(kebabCase(String(option.value)));
      } else {
        parts.push(index);
      }

      return parts.join('-');
    },

    inputHandler(value: string | number | boolean | symbol | null) {
      this.$emit('input', value);
    },

    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },

    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },
  },
});

export default TRadioGroup;
