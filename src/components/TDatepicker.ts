import { CreateElement, VNode } from 'vue';
import Component from '@/base/Component';

import TDropdown from '@/components/TDropdown';
import parseDate, { ParseableDate, DateValue } from '@/utils/parseDate';
import formatDate from '@/utils/formatDate';
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
    dateFormat: {
      type: String,
      default: 'Y-m-d',
    },
    dateFormatter: {
      type: Function,
      default: (date: Date | null) : string => formatDate(date),
    },
    dateParser: {
      type: Function,
      default: (date: ParseableDate) : DateValue => parseDate(date),
    },
    fixedClasses: {
      type: Object,
      default: () => ({
        day: 'text-sm rounded-full w-8 h-8 hover:bg-blue-100',
        selectedDay: 'text-sm rounded-full bg-gray-200 w-8 h-8 bg-blue-500 text-white',
        disabledDay: 'text-sm rounded-full w-8 h-8 opacity-25 cursor-not-allowed',
        otherMonthDay: 'text-sm rounded-full w-8 h-8 hover:bg-blue-100 text-gray-400',
      }),
    },
  },

  data() {
    const value = this.value as ParseableDate;
    const dateParser = this.dateParser as (date: ParseableDate) => DateValue;

    return {
      localValue: dateParser(value),
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
              getElementCssClass: this.getElementCssClass,
            },
          },
        ),
      ],
    );
  },
});

export default TDatepicker;
