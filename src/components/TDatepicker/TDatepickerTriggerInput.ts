import { CreateElement, VNode } from 'vue';
import TInput from '@/inputs/TInput';
import { DateValue } from '@/utils/dates';
import HtmlInput from '@/base/HtmlInput';

const TDatepickerTriggerInput = HtmlInput.extend({
  name: 'TDatepickerTriggerInput',

  props: {
    value: {
      type: Date,
      default: null,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    show: {
      type: Function,
      required: true,
    },
    hideIfFocusOutside: {
      type: Function,
      required: true,
    },
    dateFormatter: {
      type: Function,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
    userFormat: {
      type: String,
      required: true,
    },
    toggle: {
      type: Function,
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
    const value = this.value as DateValue;
    return createElement(
      TInput,
      {
        attrs: {
          readonly: true,
          id: this.id,
          name: this.name,
          disabled: this.disabled,
          autocomplete: 'off',
          autofocus: this.autofocus,
          type: 'text',
          required: this.required,
          placeholder: this.placeholder,
        },
        props: {
          value: this.dateFormatter(value, this.userFormat),
        },
        nativeOn: {
          click: () => {
            this.show();
          },
        },
        on: {
          focus: () => {
            this.show();
          },
          blur: (e: FocusEvent) => {
            this.hideIfFocusOutside(e);
          },
          keydown: (e: KeyboardEvent) => {
            this.$emit('keydown', e);
          },
        },
      },
    );
  },
});

export default TDatepickerTriggerInput;
