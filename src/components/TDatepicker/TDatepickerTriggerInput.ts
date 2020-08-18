import { CreateElement, VNode } from 'vue';
import TInput from '@/inputs/TInput';
import HtmlInput from '@/base/HtmlInput';

const TDatepickerTriggerInput = HtmlInput.extend({
  name: 'TDatepickerTriggerInput',

  props: {
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
    userFormatedDate: {
      type: String,
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      TInput,
      {
        ref: 'input',
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
          value: this.userFormatedDate,
        },
        nativeOn: {
          click: () => {
            this.show();
          },
        },
        on: {
          focus: (e: FocusEvent) => {
            this.show();
            this.$emit('focus', e);
          },
          blur: (e: FocusEvent) => {
            this.hideIfFocusOutside(e);
            this.$emit('blur', e);
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
