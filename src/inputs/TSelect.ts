import { CreateElement, VNode, VNodeChildren } from 'vue';
import { guessOptionText } from '../utils/inputOptions';
import MultipleInput from '../base/MultipleInput';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';

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
      default: 'form-select',
    },
  },

  data() {
    return {
      localValue: this.value,
    };
  },

  computed: {
    normalizedOptionsWithPlaceholder(): NormalizedOptions {
      if (this.placeholder === undefined) {
        return this.normalizedOptions;
      }

      const { normalizedOptions } = this;
      const placeholder: NormalizedOptions = [{
        value: null,
        text: this.placeholder,
      }];

      return placeholder.concat(normalizedOptions);
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
      const children: (VNode | VNode[])[] = [
        this.createSelect(createElement),
      ];

      if (!this.multiple) {
        if (this.$scopedSlots.arrowWrapper) {
          const arrowWrapper = this.$scopedSlots.arrowWrapper({
            className: this.getElementCssClass('arrowWrapper'),
            variant: this.variant,
            value: this.localValue,
          }) as VNode[];
          children.push(arrowWrapper);
        } else {
          children.push(this.createArrow(createElement));
        }
      }

      return createElement(
        'div',
        {
          ref: 'selectWrapper',
          class: this.getElementCssClass('wrapper'),
        },
        children,
      );
    },
    createArrow(createElement: CreateElement) {
      const subElements = [];

      if (this.$scopedSlots.arrow) {
        subElements.push(
          this.$scopedSlots.arrow({
            className: this.getElementCssClass('arrow'),
            variant: this.variant,
            value: this.localValue,
          }),
        );
      } else {
        subElements.push(
          createElement(
            'svg',
            {
              attrs: {
                fill: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 20 20',
              },
              class: this.getElementCssClass('arrow'),
            },
            [
              createElement('path', {
                attrs: {
                  'clip-rule': 'evenodd',
                  'fill-rule': 'evenodd',
                  d: 'M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
                },
              }),
            ],
          ),
        );
      }

      return createElement(
        'span',
        {
          ref: 'arrow',
          class: this.getElementCssClass('arrowWrapper'),
        },
        subElements,
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
          class: this.wrapped ? this.getElementCssClass('input') : this.getElementCssClass(),
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
      return createElement(
        'optgroup',
        {
          domProps: {
            label: guessOptionText(option, this.textAttribute),
          },
        },
        option.children?.map((opt) => this.createOption(createElement, opt, value)),
      );
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
          selected: isSelected,
          disabled: option.disabled,
        },
      }, option.text as VNodeChildren);
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

      this.localValue = value as string | number | (unknown[] & string) | (unknown[] & number);
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
