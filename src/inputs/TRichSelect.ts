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
    value: {
      type: [String, Number],
      default: null,
    },
    hideSearchBox: {
      type: Boolean,
      default: false,
    },
    openOnFocus: {
      type: Boolean,
      default: true,
    },
    searchBoxPlaceholder: {
      type: String,
      default: 'Search...',
    },
    noResultsLabel: {
      type: String,
      default: 'No results found',
    },
    maxHeight: {
      type: [String, Number],
      default: 300,
    },
  },

  data() {
    return {
      hasFocus: false,
      show: false,
      localValue: this.value,
      highlighted: null as number | null,
      query: '',
      filteredOptions: [] as NormalizedOptions,
    };
  },

  watch: {
    normalizedOptions: {
      handler(options) {
        this.filteredOptions = options;
      },
      immediate: true,
    },
    query() {
      this.filterOptions();
    },
    async localValue(localValue: string | null) {
      this.$emit('input', localValue);

      await this.$nextTick();

      this.$emit('change', localValue);

      this.show = false;
    },
    value(value) {
      this.localValue = value;
    },
    async show(show) {
      if (show) {
        if (!this.hideSearchBox) {
          await this.$nextTick();
          this.getSearchBox().focus();
        }

        if (!this.filteredOptions.length) {
          this.highlighted = null;
          return;
        }

        this.highlighted = this.selectedOptionIndex || 0;
      }
    },
  },

  computed: {
    normalizedHeight(): string {
      if (/^\d+$/.test(String(this.maxHeight))) {
        return `${this.maxHeight}px`;
      }

      return String(this.maxHeight);
    },
    selectedOptionIndex(): number | undefined {
      const index = this.filteredOptions.findIndex((option) => this.optionIsSelected(option));
      return index >= 0 ? index : undefined;
    },
  },

  methods: {
    filterOptions() {
      if (!this.query) {
        this.filteredOptions = this.normalizedOptions;
      }

      this.filteredOptions = this.normalizedOptions
        .filter((option: NormalizedOption) => String(option.text)
          .toUpperCase().trim().includes(this.query.toUpperCase().trim()));

      if (this.filteredOptions.length) {
        this.highlighted = 0;
      } else {
        this.highlighted = null;
      }
    },
    optionIsSelected(option: NormalizedOption): boolean {
      return Array.isArray(this.value)
        ? this.value.includes(option.value)
        : this.value === option.value;
    },
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
          ? this.filteredOptions.length - 1
          : this.highlighted - 1;
      }
      if (this.$refs.list) {
        (this.$refs.list as HTMLUListElement).children[this.highlighted].scrollIntoView({ block: 'nearest' });
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
        this.highlighted = this.highlighted + 1 >= this.filteredOptions.length
          ? 0
          : this.highlighted + 1;
      }

      if (this.$refs.list) {
        (this.$refs.list as HTMLUListElement).children[this.highlighted].scrollIntoView({ block: 'nearest' });
      }
    },
    enterHandler(e: KeyboardEvent) {
      if (!this.show) {
        return;
      }

      if (this.highlighted !== null) {
        e.preventDefault();
        const option = this.filteredOptions[this.highlighted];
        this.selectOption(option);
      }
    },
    searchInputHandler(e: Event) {
      const target = (e.target as HTMLInputElement);
      this.query = target.value;
    },
    getButton() {
      return this.$refs.button as HTMLButtonElement;
    },
    getSearchBox() {
      return this.$refs.search as HTMLInputElement;
    },
    async optionClicked(option: NormalizedOption) {
      this.selectOption(option);
    },
    async selectOption(option: NormalizedOption) {
      if (this.localValue !== option.value) {
        this.localValue = option.value as string | number;
      }
      await this.$nextTick();
      this.getButton().focus();
      this.hideOptions();
      this.query = '';
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
    createSearchBoxWrapper(createElement: CreateElement) {
      return createElement(
        'div',
        {
          ref: 'searchWrapper',
          class: 'inline-block w-full',
        },
        [
          this.createSearchBox(createElement),
        ],
      );
    },
    createSearchBox(createElement: CreateElement) {
      return createElement(
        'input',
        {
          ref: 'search',
          class: 'inline-block w-full border p-2',
          domProps: {
            value: this.query,
          },
          attrs: {
            placeholder: this.searchBoxPlaceholder,
          },
          on: {
            keydown: (e: KeyboardEvent) => {
              // Down
              if (e.keyCode === 40) {
                this.arrowDownHandler(e);
              // Up
              } else if (e.keyCode === 38) {
                this.arrowUpHandler(e);
              // Enter
              } else if (e.keyCode === 13) {
                this.enterHandler(e);
              }
            },
            blur: this.blurHandler,
            input: this.searchInputHandler,
          },
        },
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
            focus: this.focusHandler,
            keydown: (e: KeyboardEvent) => {
              // Down
              if (e.keyCode === 40) {
                this.arrowDownHandler(e);
              // Up
              } else if (e.keyCode === 38) {
                this.arrowUpHandler(e);
              // Enter
              } else if (e.keyCode === 13) {
                this.enterHandler(e);
              }
            },
            blur: (e: FocusEvent) => {
              if (!this.hideSearchBox) {
                return;
              }

              this.blurHandler(e);
            },
            mousedown: (e: MouseEvent) => {
              e.preventDefault();
            },
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
          this.hideSearchBox
            ? undefined
            : this.createSearchBoxWrapper(createElement),
          !this.filteredOptions.length
            ? createElement(
              'div',
              {
                ref: 'noResults',
                class: 'rounded-md p-2 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5',
              },
              this.noResultsLabel,
            )
            : createElement(
              'ul',
              {
                ref: 'list',
                attrs: {
                  tabindex: -1,
                },
                class: 'rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5',
                style: {
                  maxHeight: this.normalizedHeight,
                },
              },
              this.createOptions(createElement),
            ),
        ],
      );
    },
    createOptions(createElement: CreateElement): VNode[] {
      const options: NormalizedOptions = this.filteredOptions;
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
      const isSelected = this.optionIsSelected(option);

      return createElement(
        'li',
        {
          class: {
            'cursor-default select-none relative p-2': true,
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
              class: ['flex justify-between items-center'],
            },
            [
              createElement(
                'span',
                {
                  class: {
                    'font-normal block truncate': true,
                    'font-semibold': isSelected,
                    'font-normal': !isSelected,
                  },
                },
                option.text as VNodeChildren,
              ),
              isSelected
                ? createElement(
                  'svg',
                  {
                    attrs: {
                      fill: 'currentColor',
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 20 20',
                    },
                    class: 'fill-current h-4 w-4',
                  },
                  [
                    createElement('polygon', {
                      attrs: {
                        points: '0 11 2 9 7 14 18 3 20 5 7 18',
                      },
                    }),
                  ],
                )
                : undefined,
            ],
          ),
        ],
      );
    },
  },
});

export default TRichSelect;
