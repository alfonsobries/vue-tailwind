import Vue, { CreateElement, VNode } from 'vue';
import TDatepickerNavigatorPrev from './TDatepickerNavigatorPrev';
import TDatepickerNavigatorNext from './TDatepickerNavigatorNext';

const TDatepickerNavigator = Vue.extend({
  name: 'TDatepickerNavigator',

  props: {
    dateFormatter: {
      type: Function,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    value: {
      type: Date,
      required: true,
    },
    showSelector: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      localValue: new Date(this.value.valueOf()),
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
    const subElements: VNode[] = [];

    if (this.showSelector) {
      subElements.push(createElement(
        'button',
        {
          attrs: {
            type: 'button',
            class: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full flex items-center px-2 py-1 -ml-1',
          },
        },
        [
          createElement(
            'span',
            {
              class: 'text-gray-700 font-semibold',
            },
            this.dateFormatter(this.localValue, 'F'),
          ),
          createElement(
            'span',
            {
              class: 'text-gray-600 ml-1',
            },
            this.dateFormatter(this.localValue, 'Y'),
          ),
          createElement(
            'svg',
            {
              attrs: {
                fill: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 20 20',
              },
              class: 'fill-current flex-shrink-0 h-5 w-5 text-gray-500',
            },
            [
              createElement('polygon', {
                attrs: {
                  points: '12.9497475 10.7071068 13.6568542 10 8 4.34314575 6.58578644 5.75735931 10.8284271 10 6.58578644 14.2426407 8 15.6568542 12.9497475 10.7071068',
                },
              }),
            ],
          ),
        ],
      ));
    } else {
      subElements.push(createElement(
        'span',
        {
          attrs: {
            class: 'flex items-center py-1',
          },
        },
        [
          createElement(
            'span',
            {
              class: 'text-gray-700 font-semibold',
            },
            this.dateFormatter(this.localValue, 'F'),
          ),
          createElement(
            'span',
            {
              class: 'text-gray-600 ml-1',
            },
            this.dateFormatter(this.localValue, 'Y'),
          ),
        ],
      ));
    }

    if (this.showSelector) {
      subElements.push(
        createElement(
          TDatepickerNavigatorPrev,
          {
            props: {
              value: this.localValue,
              dateFormatter: this.dateFormatter,
              getElementCssClass: this.getElementCssClass,
            },
            on: {
              input: this.inputHandler,
            },
          },
        ),
      );
    }

    if (this.showSelector) {
      subElements.push(
        createElement(
          TDatepickerNavigatorNext,
          {
            props: {
              value: this.localValue,
              dateFormatter: this.dateFormatter,
              getElementCssClass: this.getElementCssClass,
            },
            on: {
              input: this.inputHandler,
            },
          },
        ),
      );
    }

    return createElement(
      'div',
      {
        class: 'flex items-center justify-between',
      },
      subElements,
    );
  },

});

export default TDatepickerNavigator;
