import Component from '@/base/Component';
import { CreateElement, VNode } from 'vue';
import TDropdown from '@/components/TDropdown';
import TDatepickerInput from './TDatepicker/TDatepickerInput';
import TDatepickerDays from './TDatepicker/TDatepickerDays';


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
          TDatepickerDays,
          {
            props: {
              value: this.localValue,
              weekStart: this.weekStart,
            },
          },
        ),
      ],
    );
  },
});

export default TDatepicker;
