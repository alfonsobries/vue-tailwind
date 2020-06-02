import { CreateElement, VNode, VNodeChildren } from 'vue';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';
import TSelect from './TSelect';

const TRichSelect = TSelect.extend({
  name: 'TRichSelect',

  render(createElement) {
    const createWrapperFunc: (createElement: CreateElement) => VNode = this.createWrapper;

    return createWrapperFunc(createElement);
  },

  props: {
    openOnFocus: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      hasFocus: false,
      show: false,
      localValue: this.value,
      highlighted: null as number | null,
    };
  },

  watch: {
    async localValue(localValue: string | null) {
      this.$emit('input', localValue);

      await this.$nextTick();

      this.$emit('change', localValue);

      this.show = false;
    },
    value(value) {
      (this as any).localValue = value;
    },
  },

  methods: {
    hideOptions() {
      this.show = false;
    },
    showOptions() {
      this.show = true;
    },
    toggleOptions() {
      if (this.show) {
        this.hideOptions();
      } else {
        this.showOptions();
      }
    },
    blurHandler(e: FocusEvent) {
      this.hasFocus = false;
      this.hideOptions();
      this.$emit('blur', e);
    },
    focusHandler(e: FocusEvent) {
      this.hasFocus = true;
      if (this.openOnFocus) {
        this.showOptions();
      }
      this.$emit('focus', e);
    },
    clickHandler(e: FocusEvent) {
      if (!this.show && !this.hasFocus) {
        this.getButton().focus();
        if (!this.openOnFocus) {
          this.showOptions();
        }
      } else {
        this.toggleOptions();
      }
      this.$emit('click', e);
    },
    async arrowUpHandler(e: KeyboardEvent) {
      e.preventDefault();
      if (!this.show) {
        this.showOptions();
        return;
      }
      if (this.highlighted === null) {
        this.highlighted = 0;
      } else {
        this.highlighted = this.highlighted - 1 < 0
          ? this.normalizedOptions.length - 1
          : this.highlighted - 1;
      }
      if (this.$refs.list) {
        this.$refs.list.children[(this.highlighted as number) - 1].scrollIntoView({ block: 'nearest' });
      }
    },
    arrowDownHandler(e: KeyboardEvent) {
      e.preventDefault();
      if (!this.show) {
        this.showOptions();
        return;
      }
      if (this.highlighted === null) {
        this.highlighted = 0;
      } else {
        this.highlighted = this.highlighted + 1 >= this.normalizedOptions.length
          ? 0
          : this.highlighted + 1;
      }

      if (this.$refs.list) {
        this.$refs.list.children[this.highlighted + 1].scrollIntoView({ block: 'nearest' });
      }
    },
    enterHandler(e: KeyboardEvent) {
      if (!this.show) {
        return;
      }

      if (this.highlighted !== null) {
        e.preventDefault();
        const option = this.normalizedOptions[this.highlighted];
        this.selectOption(option);
      }
    },
    getButton() {
      return (this as any).$refs.button as HTMLButtonElement;
    },
    async optionClicked(option: NormalizedOption) {
      this.selectOption(option);
    },
    async selectOption(option: NormalizedOption) {
      (this as any).localValue = option.value;
      this.hideOptions();
      await this.$nextTick();
      this.getButton().focus();
    },
    createSelectWrapper(createElement: CreateElement) {
      const children: VNode[] = [
        this.createSelect(createElement),
      ];

      if (!this.multiple) {
        children.push(this.createArrow(createElement));
      }

      return createElement(
        'div',
        {
          ref: 'select-wrapper',
          class: this.getElementCssClass('wrapper'),
        },
        children,
      );
    },
    createArrow(createElement: CreateElement) {
      return createElement(
        'span',
        {
          ref: 'arrow',
          class: this.getElementCssClass('arrowWrapper'),
        },
        [
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
        ],
      );
    },
    createWrapper(createElement: CreateElement) {
      return createElement(
        'div',
        {
          ref: 'wrapper',
          class: 'relative',
        },
        [
          this.createSelectButtonWrapper(createElement),
          this.createOptionsWrapper(createElement),
        ],
      );
    },
    createSelectButtonWrapper(createElement: CreateElement) {
      return createElement(
        'div',
        {
          ref: 'buttonWrapper',
          class: 'inline-block w-full',
        },
        [this.createSelectButton(createElement)],
      );
    },
    createSelectButton(createElement: CreateElement) {
      return createElement(
        'button',
        {
          ref: 'button',
          attrs: {
            type: 'button',
          },
          class: 'w-full',
          on: {
            click: this.clickHandler,
            blur: this.blurHandler,
            focus: this.focusHandler,
            keydown: (e: KeyboardEvent) => {
              // Down
              if (e.keyCode === 40) {
                this.arrowDownHandler(e);
              // Up
              } else if (e.keyCode === 38) {
                this.arrowUpHandler(e);
              } else if (e.keyCode === 13) {
                this.enterHandler(e);
              }
            },
            mousedown: (e: MouseEvent) => {
              e.preventDefault();
            },
            // change: this.changeHandler,
          },
        },
        this.value as string,
      );
    },
    createOptionsWrapper(createElement: CreateElement) {
      return createElement(
        'div',
        {
          ref: 'optionsWrapper',
          class: 'absolute mt-1 w-full rounded-md bg-white shadow-lg z-10',
          style: {
            display: !this.show ? 'none' : undefined, // 'none',
          },
        },
        [
          createElement(
            'ul',
            {
              ref: 'list',
              attrs: {
                tabindex: -1,
              },
              class: 'max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5',
            },
            this.createOptions(createElement),
          ),
        ],
      );
    },
    createOptions(createElement: CreateElement): VNode[] {
      const options: NormalizedOptions = this.normalizedOptionsWithPlaceholder;
      return options
        .map((option: NormalizedOption, index) => this.createOption(
          createElement, option, index,
        ));
    },

    createOption(
      createElement: CreateElement,
      option: NormalizedOption,
      index: number,
    ): VNode {
      // const isSelected = Array.isArray(this.value)
      //   ? this.value.includes(option.value)
      //   : this.value === option.value;

      return createElement(
        'li',
        {
          class: {
            'cursor-default select-none relative py-2 pl-4 pr-9': true,
            'text-white bg-orange-500': this.highlighted === index,
            'text-gray-900': this.highlighted !== index,
          },
          on: {
            mouseover: () => {
              this.highlighted = index;
            },
            mouseleave: () => {
              this.highlighted = null;
            },
            mousedown: (e: MouseEvent) => {
              e.preventDefault();
            },
            click: (e: MouseEvent) => {
              e.preventDefault();

              this.optionClicked(option);
            },
          },
        },
        [
          createElement(
            'div',
            {
              class: ['flex items-center space-x-3'],
            },
            [
              createElement(
                'span',
                {
                  class: {
                    'font-normal block truncate': true,
                    'font-semibold': this.highlighted === index,
                    'font-normal': this.highlighted !== index,
                  },
                },
                option.text as VNodeChildren,
              ),
            ],
          ),
        ],
      );
    },
  },
});

export default TRichSelect;
