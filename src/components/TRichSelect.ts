import TRichSelectType from '@/types/TRichSelect';
import { CreateElement, VNode } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import InputWithOptions from '@/base/InputWithOptions';
import InputOptions from '@/types/InputOptions';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';
import TRichSelectRenderer from '../renderers/TRichSelectRenderer';

const TRichSelect = InputWithOptions.extend({
  name: 'TRichSelect',

  render(createElement: CreateElement) {
    const createSelectFunc: (createElement: CreateElement) => VNode = this.createSelect;
    return createSelectFunc(createElement);
  },

  props: {
    ajax: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 250,
    },
    fetchOptions: {
      type: Function,
      default: undefined,
    },
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
    clearable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    searchBoxPlaceholder: {
      type: String,
      default: 'Search...',
    },
    noResultsText: {
      type: String,
      default: 'No results found',
    },
    searchingText: {
      type: String,
      default: 'Searching...',
    },
    maxHeight: {
      type: [String, Number],
      default: 300,
    },
    classes: {
      type: Object,
      default() {
        return {
          wrapper: 'relative',
          buttonWrapper: 'inline-block w-full relative',
          selectButton: 'w-full border bg-white flex text-left justify-between items-center rounded p-2 text-gray-500',
          selectButtonLabel: 'block truncate text-gray-900',
          selectButtonPlaceholder: 'block truncate text-gray-500',
          selectButtonIcon: 'fill-current flex-shrink-0 ml-1 h-4 w-4',
          selectButtonClearButton: 'hover:bg-gray-200 rounded flex flex-shrink-0 items-center justify-center ml-1 absolute right-0 top-0 mt-2 mr-2 h-6 w-6',
          selectButtonClearIcon: 'fill-current h-3 w-3 text-gray-500',
          dropdown: 'absolute w-full rounded-md bg-white shadow-lg z-10',
          dropdownFeedback: 'p-2 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5',
          optionsList: 'py-1 text-base leading-6 overflow-auto focus:outline-none sm:text-sm sm:leading-5',
          searchWrapper: 'inline-block w-full bg-white p-2',
          searchBox: 'inline-block w-full p-2 bg-gray-200 focus:outline-none text-sm rounded',
          optgroup: 'text-gray-500 uppercase text-xs py-1 px-2 font-semibold',
          option: 'text-gray-900',
          highlightedOption: 'text-gray-900 bg-gray-300',
          selectedOption: 'text-gray-900 font-semibold bg-gray-100',
          selectedHighlightedOption: 'text-gray-900 bg-gray-300 font-semibold',
          optionContent: 'flex justify-between p-2 items-center',
          optionLabel: 'truncate block',
          selectedIcon: 'fill-current h-4 w-4',
        };
      },
    },
  },

  data() {
    return {
      hasFocus: false,
      show: false,
      localValue: this.value as string | number | boolean | symbol | null,
      highlighted: null as number | null,
      query: '',
      filteredOptions: [] as NormalizedOptions,
      selectedOption: undefined as undefined | NormalizedOption,
      searching: false,
      delayTimeout: undefined as undefined | ReturnType<typeof setTimeout>,
    };
  },

  created() {
    this.selectedOption = this.findOptionByValue(this.value);
  },
  watch: {
    normalizedOptions: {
      handler() {
        this.query = '';
      },
      immediate: true,
    },
    query(query: string) {
      this.filterOptions(query);
    },
    async localValue(localValue: string | null) {
      this.$emit('input', localValue);

      await this.$nextTick();

      this.$emit('change', localValue);

      this.hideOptions();
    },
    value(value) {
      if (!this.selectedOption || this.selectedOption.value !== value) {
        this.selectedOption = this.findOptionByValue(value);
      }
      this.localValue = value;
    },
    async show(show) {
      if (show) {
        if (!this.hideSearchBox) {
          this.focusSearchBox();
        }

        if (!this.filteredflattenedOptions.length) {
          this.highlighted = null;
          return;
        }

        this.highlighted = this.selectedOptionIndex || 0;
      }
    },
  },

  computed: {
    filteredflattenedOptions(): NormalizedOptions {
      return this.filteredOptions.map((option: NormalizedOption) => {
        if (option.children) {
          return option.children;
        }

        return option;
      }).flat();
    },

    normalizedHeight(): string {
      if (/^\d+$/.test(String(this.maxHeight))) {
        return `${this.maxHeight}px`;
      }

      return String(this.maxHeight);
    },
    selectedOptionIndex(): number | undefined {
      if (!this.selectedOption) {
        return undefined;
      }
      const index = this.filteredflattenedOptions
        .findIndex((option) => this.optionHasValue(option, this.localValue));
      return index >= 0 ? index : undefined;
    },
  },

  methods: {
    // eslint-disable-next-line max-len
    findOptionByValue(value: string | number | boolean | symbol | null): undefined | NormalizedOption {
      return this.filteredflattenedOptions
        .find((option) => this.optionHasValue(option, value));
    },
    // eslint-disable-next-line max-len
    optionHasValue(option: NormalizedOption, value: string | number | boolean | symbol | null): boolean {
      return Array.isArray(value)
        ? value.includes(option.value)
        : value === option.value;
    },
    createSelect(createElement: CreateElement) {
      return (new TRichSelectRenderer(createElement, this as TRichSelectType))
        .render();
    },

    async filterOptions(query: string) {
      if (!this.fetchOptions || !query) {
        const options = cloneDeep(this.normalizedOptions);

        this.filteredOptions = this.queryFilter(options);

        if (this.filteredOptions.length) {
          this.highlighted = 0;
        } else {
          this.highlighted = null;
        }

        return;
      }

      this.searching = true;

      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }

      this.delayTimeout = setTimeout(async () => {
        try {
          const filteredRawOptions = await this.getFilterPromise(query);
          this.filteredOptions = this.normalizeOptions(filteredRawOptions);
        } catch (error) {
          this.$emit('fetch-error', error);
          this.filteredOptions = [];
        }

        if (this.filteredOptions.length) {
          this.highlighted = 0;
        } else {
          this.highlighted = null;
        }

        this.searching = false;
        this.delayTimeout = undefined;
      }, this.delay);
    },

    getFilterPromise(query: string): Promise<InputOptions> {
      return Promise
        .resolve(this.fetchOptions(query) as Promise<InputOptions>);
    },

    queryFilter(options: NormalizedOptions): NormalizedOptions {
      if (!this.query) {
        return options;
      }

      return options
        .map((option: NormalizedOption): NormalizedOption => {
          if (option.children) {
            const newOption: NormalizedOption = {
              ...option,
              ...{
                children: this.queryFilter(option.children as NormalizedOptions),
              },
            };
            return newOption as NormalizedOption;
          }

          return option as NormalizedOption;
        }).filter((option: NormalizedOption): boolean => {
          const foundText = String(option.text)
            .toUpperCase()
            .trim()
            .includes(this.query.toUpperCase().trim());

          const hasChildren = option.children && option.children.length > 0;

          return hasChildren || foundText;
        });
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
    async focusSearchBox() {
      await this.$nextTick();
      const searchBox = this.getSearchBox();
      searchBox.focus();
      searchBox.select();
    },
    blurHandler(e: FocusEvent) {
      this.hasFocus = false;
      this.$emit('blur', e);

      let shouldHideOptions = true;
      const clickedElement = e.relatedTarget as HTMLElement;
      if (clickedElement) {
        const wrapper = this.$refs.wrapper as HTMLDivElement;
        const isChild = wrapper.contains(clickedElement);
        if (isChild) {
          shouldHideOptions = false;
        }
      }

      if (shouldHideOptions) {
        this.hideOptions();
      } else {
        this.focusSearchBox();
      }
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
          ? this.filteredflattenedOptions.length - 1
          : this.highlighted - 1;
      }

      this.scrollToOptionIndex(this.highlighted);
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
        this.highlighted = this.highlighted + 1 >= this.filteredflattenedOptions.length
          ? 0
          : this.highlighted + 1;
      }

      this.scrollToOptionIndex(this.highlighted);
    },
    scrollToOptionIndex(index: number) {
      if (this.$refs.optionsList) {
        const list = this.$refs.optionsList as HTMLUListElement;
        const li = list.querySelectorAll('li[data-type=option]')[index] as HTMLLIElement;
        if (li.scrollIntoView) {
          li.scrollIntoView({ block: 'nearest' });
        }
      }
    },
    enterHandler(e: KeyboardEvent) {
      if (!this.show) {
        return;
      }

      if (this.highlighted !== null) {
        e.preventDefault();
        const option = this.filteredflattenedOptions[this.highlighted];
        this.selectOption(option);
      }
    },
    searchInputHandler(e: Event): void {
      const target = (e.target as HTMLInputElement);
      this.query = target.value;
    },
    getButton() {
      return this.$refs.selectButton as HTMLButtonElement;
    },
    getSearchBox() {
      return this.$refs.searchBox as HTMLInputElement;
    },
    async selectOption(option: NormalizedOption) {
      if (this.localValue !== option.value) {
        (this.localValue as string | number | boolean | symbol | null) = option.value;
      }
      this.selectedOption = option;
      await this.$nextTick();
      this.getButton().focus();
      this.hideOptions();
    },
    clearIconClickHandler(e: MouseEvent): void {
      e.preventDefault();
      e.stopPropagation();
      (this.localValue as string | number | boolean | symbol | null) = null;
      this.query = '';
    },

    blur() {
      const el = this.hideSearchBox
        ? this.$refs.selectButton as HTMLButtonElement
        : this.$refs.searchBox as HTMLInputElement;
      el.blur();
    },

    focus(options?: FocusOptions | undefined) {
      const el = this.$refs.selectButton as HTMLButtonElement;
      el.focus(options);
    },
  },
});


export default TRichSelect;
