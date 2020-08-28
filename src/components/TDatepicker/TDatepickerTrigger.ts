import { CreateElement, VNode } from 'vue';
import HtmlInput from '@/base/HtmlInput';
import TDatepickerTriggerInput from './TDatepickerTriggerInput';

const TDatepickerTrigger = HtmlInput.extend({
  name: 'TDatepickerTrigger',

  props: {
    inputName: {
      type: String,
      default: undefined,
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
    conjuntion: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: true,
    },
    range: {
      type: Boolean,
      required: true,
    },
    locale: {
      type: Object,
      required: true,
    },
    userFormatedDate: {
      type: [String, Array],
      required: true,
    },
    formatedDate: {
      type: [String, Array],
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
    const formattedDate = this.formatedDate as string[] | string;

    const subElements = [
      createElement(
        TDatepickerTriggerInput,
        {
          ref: 'input',
          props: {
            id: this.id,
            name: this.inputName,
            disabled: this.disabled,
            autofocus: this.autofocus,
            required: this.required,
            placeholder: this.placeholder,
            conjuntion: this.range && this.locale.rangeSeparator ? this.locale.rangeSeparator : this.conjuntion,
            show: this.show,
            hideIfFocusOutside: this.hideIfFocusOutside,
            userFormatedDate: this.userFormatedDate,
          },
          on: {
            input: (e: Date) => {
              this.$emit('input', e);
            },
            keydown: (e: KeyboardEvent) => {
              this.$emit('keydown', e);
            },
            blur: (e: KeyboardEvent) => {
              this.$emit('blur', e);
            },
            focus: (e: KeyboardEvent) => {
              this.$emit('focus', e);
            },
          },
        },
      ),
    ];

    if (this.multiple) {
      const dates: string[] = Array.isArray(formattedDate) ? formattedDate : [formattedDate];
      const hiddenInputs: VNode[] = dates.map((date: string) => createElement(
        'input',
        {
          attrs: {
            type: 'hidden',
            value: date,
            name: this.name,
            disabled: this.disabled,
            readonly: this.readonly,
            required: this.required,
          },
        },
      ));

      subElements.push(...hiddenInputs);
    } else {
      subElements.push(
        createElement(
          'input',
          {
            attrs: {
              type: 'hidden',
              value: Array.isArray(formattedDate) ? formattedDate.join(this.conjuntion) : formattedDate,
              name: this.name,
              disabled: this.disabled,
              readonly: this.readonly,
              required: this.required,
            },
          },
        ),
      );
    }

    return createElement(
      'div',
      {
        class: this.getElementCssClass(''),
      },
      subElements,
    );
  },

});

export default TDatepickerTrigger;
