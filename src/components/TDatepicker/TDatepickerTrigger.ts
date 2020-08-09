import { CreateElement, VNode } from 'vue';
import HtmlInput from '@/base/HtmlInput';
import { DateValue } from '@/utils/dates';
import TDatepickerTriggerInput from './TDatepickerTriggerInput';

const TDatepickerTrigger = HtmlInput.extend({
  name: 'TDatepickerTrigger',

  props: {
    value: {
      type: [Date, String, Number, Array],
      required: true,
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
  },

  data() {
    const localValue = this.value as DateValue;
    return {
      localValue: new Date(localValue.valueOf()),
    };
  },

  watch: {
    value(value: Date) {
      this.localValue = new Date(value.valueOf());
    },
  },

  methods: {
    inputHandler(newDate: Date): void {
      this.$emit('input', newDate);
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: this.getElementCssClass(''),
      },
      [
        createElement(
          TDatepickerTriggerInput,
          {
            props: {
              id: this.id,
              name: this.name,
              disabled: this.disabled,
              autofocus: this.autofocus,
              required: this.required,
              placeholder: this.placeholder,
              value: this.localValue,
              dateFormatter: this.dateFormatter,
              userFormat: this.userFormat,
              dateFormat: this.dateFormat,
              show: this.show,
              hideIfFocusOutside: this.hideIfFocusOutside,
            },
            on: {
              input: this.inputHandler,
            },
          },
        ),

      ],
    );
  },

});

export default TDatepickerTrigger;
