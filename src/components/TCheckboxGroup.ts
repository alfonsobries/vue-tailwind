import { CreateElement, VNode } from 'vue';
import kebabCase from 'lodash.kebabcase';
import InputWithOptions from '../base/InputWithOptions';
import TCheckbox from '../inputs/TCheckbox';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';

const TCheckboxGroup = InputWithOptions.extend({
  name: 'TCheckboxGroup',

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
    value: {
      type: Array,
      default() {
        return [];
      },
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
        return {
          groupWrapper: 'flex flex-col',
          label: '',
          input: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
          inputWrapper: 'inline-flex',
          wrapper: 'inline-flex items-center space-x-2',
        };
      },
    },
  },

  data() {
    return {
      localValue: this.value as (string | number | Record<string, unknown>)[],
    };
  },

  watch: {
    localValue(localValue: (string | number | Record<string, unknown>)[]) {
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
        TCheckbox,
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
            input: this.inputHandler,
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

    inputHandler(value: (string | number| Record<string, unknown>)[]) {
      (this.localValue as (string | number | Record<string, unknown>)[]) = value;
    },

    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },

    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },
  },
});

export default TCheckboxGroup;
