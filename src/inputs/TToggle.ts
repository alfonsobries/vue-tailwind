import { VNode, CreateElement } from 'vue';
import TCheckbox from './TCheckbox';

interface InputElement extends Vue{
  getInput: () => HTMLInputElement
}
const TToggle = TCheckbox.extend({
  name: 'TToggle',

  props: {
    tabindex: {
      type: [String, Number],
      default: 0,
    },
  },

  methods: {
    getCheckbox(): InputElement {
      return this.$refs.checkbox as InputElement;
    },
    getInput(): HTMLInputElement {
      return this.getCheckbox().getInput() as HTMLInputElement;
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'span',
      {
        class: {
          'relative inline-flex flex-shrink-0 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline': true,
          'bg-gray-200': !this.isChecked,
          'bg-blue-500': this.isChecked,
        },
        attrs: {
          role: 'checkbox',
          tabindex: this.tabindex,
          autofocus: this.autofocus,
          'aria-checked': this.isChecked ? 'true' : 'false',
        },
        on: {
          click: () => {
            this.click();
          },
          keydown: (e: KeyboardEvent) => {
            // Space
            if (e.keyCode === 32) {
              e.preventDefault();
              this.click();
            }
          },
        },
      },
      [
        createElement(
          'span',
          {
            class: {
              'relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200': true,
              'translate-x-0': !this.isChecked,
              'translate-x-4': this.isChecked,
            },
            attrs: {
              'aria-hidden': 'true',
            },
          },
          [
            createElement(
              TCheckbox,
              {
                ref: 'checkbox',
                props: {
                  id: this.id,
                  name: this.name,
                  disabled: this.disabled,
                  readonly: this.readonly,
                  required: this.required,
                  value: this.value,
                  uncheckedValue: this.uncheckedValue,
                  checked: this.checked,
                  model: this.model,
                  fixedClasses: 'absolute pointer-events-none invisible',
                  classes: undefined,
                  variants: undefined,
                  tabindex: -1,
                },
                on: {
                  blur: this.blurHandler,
                  focus: this.focusHandler,
                  change: this.changeHandler,
                },
              },
            ),

            createElement(
              'span',
              {
                class: {
                  'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity': true,
                  'opacity-100 ease-in duration-200': !this.isChecked,
                  'opacity-0 ease-out duration-100': this.isChecked,
                },
              },
              // [
              //   createElement(
              //     'svg',
              //     {
              //       class: 'h-3 w-3 text-gray-400',
              //       attrs: {
              //         fill: 'none',
              //         viewBox: '0 0 12 12',
              //       },
              //     },
              //     [
              //       createElement(
              //         'path',
              //         {
              //           attrs: {
              //             d: 'M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2',
              //             stroke: 'currentColor',
              //             'stroke-width': '2',
              //             'stroke-linecap': 'round',
              //             'stroke-linejoin': 'round',
              //           },
              //         },
              //       ),
              //     ],
              //   ),
              // ],
            ),

            createElement(
              'span',
              {
                class: {
                  'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity': true,
                  'opacity-0 ease-out duration-100': !this.isChecked,
                  'opacity-100 ease-in duration-200': this.isChecked,
                },
              },
              // [
              //   createElement(
              //     'svg',
              //     {
              //       class: 'h-3 w-3 text-blue-600',
              //       attrs: {
              //         fill: 'currentColor',
              //         viewBox: '0 0 12 12',
              //       },
              //     },
              //     [
              //       createElement(
              //         'path',
              //         {
              //           attrs: {
              //             d: 'M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z',
              //           },
              //         },
              //       ),
              //     ],
              //   ),
              // ],
            ),
          ],
        ),
      ],
    );
  },
});

export default TToggle;
