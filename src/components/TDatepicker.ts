import { CreateElement, VNode } from 'vue';
import Component from '@/base/Component';

import TDropdown from '@/components/TDropdown';
import TDatepickerInput from './TDatepicker/TDatepickerInput';
import TDatepickerDays from './TDatepicker/TDatepickerDays';
import TDatepickerHeaders from './TDatepicker/TDatepickerHeaders';

const TDatepicker = Component.extend({
  name: 'TDatepicker',
  props: {
    value: {
      type: [Date, String, Number, Array],
      default: null,
    },
    weekStart: {
      type: Number,
      default: 0,
    },
    locale: {
      type: String,
      default: 'en',
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  render(createElement: CreateElement): VNode {
    return createElement(
      TDropdown,
      {
        props: {
          show: true,
        },
        scopedSlots: {
          trigger: (props) => createElement(
            TDatepickerInput,
            {
              props: {
                show: props.show,
                hideIfFocusOutside: props.hideIfFocusOutside,
              },
            },
          ),
        },
      },
      [
        createElement(
          TDatepickerHeaders,
          {
            props: {
              weekStart: this.weekStart,
              locale: this.locale,
            },
          },
        ),
        createElement(
          TDatepickerDays,
          {
            props: {
              value: this.localValue,
              weekStart: this.weekStart,
              locale: this.locale,
            },
          },
        ),
      ],
    );
  },
});

export default TDatepicker;
