import CssClass from '@/types/CssClass';
import { CreateElement, VNode, VNodeChildren } from 'vue';
import CssClasses from '@/types/CssClasses';
import MultipleInput from './MultipleInput';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';
import InputOption from '../types/InputOption';

const TSelect = MultipleInput.extend({
  name: 'TSelect',

  props: {
    placeholder: {
      type: String,
      default: undefined,
    },
    wrapped: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: [String, Array, Object],
      default: (): CssClasses => 'form-select',
    },
  },

  computed: {
    wrapperClass(): CssClass {
      return this.getElementCssClass('wrapper');
    },

    inputClass(): CssClass {
      if (this.wrapped) {
        return this.getElementCssClass('input');
      }

      return this.getElementCssClass();
    },

    arrowClass(): CssClass {
      return this.getElementCssClass('arrow');
    },

    arrowWrapperClass(): CssClass {
      return this.getElementCssClass('arrowWrapper');
    },

    normalizedOptionsWithPlaceholder(): NormalizedOptions {
      if (typeof this.placeholder === 'undefined') {
        return this.normalizedOptions;
      }

      const { normalizedOptions } = this;

      normalizedOptions.unshift({
        value: null,
        text: this.placeholder,
      });

      return normalizedOptions;
    },
  },

  watch: {
    async localValue(localValue: string | null | string[]) {
      this.$emit('input', localValue);

      await this.$nextTick();

      this.$emit('change', localValue);
    },
    value(value) {
      this.localValue = value;
    },
  },

  render(createElement) {
    const createSelectFunc: (createElement: CreateElement) => VNode = this.createSelect;
    // eslint-disable-next-line max-len
    const createSelectWrapperFunc: (createElement: CreateElement) => VNode = this.createSelectWrapper;

    if (this.wrapped) {
      return createSelectWrapperFunc(createElement);
    }

    return createSelectFunc(createElement);
  },

  methods: {
    createSelectWrapper(createElement: CreateElement) {
      const children: VNode[] = [
        this.createSelect(createElement),
      ];

      if (!this.multiple) {
        children.push(this.createArrow(createElement));
      }

      return createElement(
        'div',
        {
          ref: 'select-wrapper',
          class: this.wrapperClass,
        },
        children,
      );
    },
    createArrow(createElement: CreateElement) {
      return createElement(
        'span',
        {
          ref: 'arrow',
          class: this.arrowWrapperClass,
        },
        [
          createElement(
            'svg',
            {
              attrs: {
                fill: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 20 20',
              },
              class: this.arrowClass,
            },
            [
              createElement('path', {
                attrs: {
                  'clip-rule': 'evenodd',
                  'fill-rule': 'evenodd',
                  d: 'M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
                },
                class: this.arrowClass,
              }),
            ],
          ),
        ],
      );
    },
    createSelect(createElement: CreateElement) {
      return createElement(
        'select',
        {
          ref: 'select',
          attrs: {
            id: this.id,
            autofocus: this.autofocus,
            disabled: this.disabled,
            name: this.name,
            required: this.required,
            multiple: this.multiple,
          },
          class: this.inputClass,
          on: {
            blur: this.blurHandler,
            focus: this.focusHandler,
            change: this.changeHandler,
          },
        },
        this.createOptions(createElement, this.value),
      );
    },
    createOptions(createElement: CreateElement, value: string | number | unknown[]): VNode[] {
      const options: NormalizedOptions = this.normalizedOptionsWithPlaceholder;
      return options.map((option: NormalizedOption) => {
        if (option.children) {
          return this.createOptgroup(createElement, option, value);
        }

        return this.createOption(createElement, option, value);
      });
    },

    createOptgroup(
      createElement: CreateElement,
      option: NormalizedOption, value: string | number | unknown[],
    ): VNode {
      return createElement('optgroup', option.children?.map((opt) => this.createOption(createElement, opt, value)));
    },

    createOption(
      createElement: CreateElement,
      option: NormalizedOption, value: string | number | unknown[],
    ): VNode {
      const isSelected = Array.isArray(value)
        ? value.includes(option.value)
        : value === option.value;

      return createElement('option', {
        domProps: {
          value: option.value,
        },
        attrs: {
          selected: isSelected,
        },
      }, option.text as VNodeChildren);
    },

    normalizeOption(option: InputOption): NormalizedOption {
      if (
        typeof option === 'string'
        || typeof option === 'number'
        || typeof option === 'boolean'
      ) {
        return {
          value: option,
          text: option,
        };
      }

      return {
        value: this.guessOptionValue(option),
        text: this.guessOptionText(option),
        children: option.children
          ? option.children.map((childOption) => this.normalizeOption(childOption))
          : undefined,
      };
    },

    changeHandler(e: Event) {
      const target = (e.target as HTMLSelectElement);

      let value;

      if (this.multiple) {
        value = Array
          .from(target.selectedOptions)
          .map((o) => o.value);
      } else {
        value = target.value;
      }

      this.localValue = value;
    },

    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },

    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },

    blur() {
      (this.$refs.select as HTMLSelectElement).blur();
    },

    focus(options?: FocusOptions | undefined) {
      (this.$refs.select as HTMLSelectElement).focus(options);
    },
  },
});

export default TSelect;
