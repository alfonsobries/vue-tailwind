import { CreateElement, VNode } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import TRichSelectType from '../types/TRichSelect';
import InputWithOptions from '../base/InputWithOptions';
import InputOptions from '../types/InputOptions';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';
import TRichSelectRenderer from '../renderers/TRichSelectRenderer';

type AjaxResults = Promise<{
  results: InputOptions;
  hasMorePages?: boolean;
}>
const TRichSelect = InputWithOptions.extend({
  name: 'TRichSelect',

  render(createElement: CreateElement) {
    const createSelectFunc: (createElement: CreateElement) => VNode = this.createSelect;
    return createSelectFunc(createElement);
  },

  props: {
    delay: {
      type: Number,
      default: 250,
    },
    fetchOptions: {
      type: Function,
      default: undefined,
    },
    minimumResultsForSearch: {
      type: Number,
      default: undefined,
    },
    minimumInputLength: {
      type: Number,
      default: undefined,
    },
    minimumInputLengthText: {
      type: [Function, String],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      default: (minimumInputLength: number, _query?: string) => `Please enter ${minimumInputLength} or more characters`,
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
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    selectOnClose: {
      type: Boolean,
      default: false,
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
    loadingMoreResultsText: {
      type: String,
      default: 'Loading more results...',
    },
    maxHeight: {
      type: [String, Number],
      default: 300,
    },
    fixedClasses: {
      type: Object,
      default() {
        return {
          wrapper: 'relative',
          buttonWrapper: 'inline-block relative w-full',
          selectButton: 'w-full flex text-left justify-between items-center',
          selectButtonLabel: 'block truncate',
          selectButtonPlaceholder: 'block truncate',
          selectButtonIcon: 'fill-current flex-shrink-0 ml-1 h-4 w-4',
          selectButtonClearButton: 'flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6',
          selectButtonClearIcon: 'fill-current h-3 w-3',
          dropdown: 'absolute w-full z-10',
          dropdownFeedback: '',
          loadingMoreResults: '',
          optionsList: 'overflow-auto',
          searchWrapper: 'inline-block w-full',
          searchBox: 'inline-block w-full',
          optgroup: '',
          option: 'cursor-pointer',
          disabledOption: 'opacity-50 cursor-not-allowed',
          highlightedOption: 'cursor-pointer',
          selectedOption: 'cursor-pointer',
          selectedHighlightedOption: 'cursor-pointer',
          optionContent: '',
          optionLabel: 'truncate block',
          selectedIcon: 'fill-current h-4 w-4',
          enterClass: '',
          enterActiveClass: '',
          enterToClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: '',
        };
      },
    },
    classes: {
      type: Object,
      default() {
        return {
          wrapper: '',
          buttonWrapper: '',
          selectButton: 'border bg-white rounded p-2 focus:outline-none focus:shadow-outline',
          selectButtonLabel: '',
          selectButtonPlaceholder: 'text-gray-500',
          selectButtonIcon: '',
          selectButtonClearButton: 'hover:bg-gray-200 text-gray-500 rounded',
          selectButtonClearIcon: '',
          dropdown: 'rounded bg-white shadow',
          dropdownFeedback: 'text-sm text-gray-500',
          loadingMoreResults: 'text-sm text-gray-500',
          optionsList: '',
          searchWrapper: 'bg-white p-2',
          searchBox: 'p-2 bg-gray-200 text-sm rounded border focus:outline-none focus:shadow-outline',
          optgroup: 'text-gray-500 uppercase text-xs py-1 px-2 font-semibold',
          option: '',
          disabledOption: '',
          highlightedOption: 'bg-gray-300',
          selectedOption: 'font-semibold bg-gray-100',
          selectedHighlightedOption: 'bg-gray-300 font-semibold',
          optionContent: 'flex justify-between items-center p-2',
          optionLabel: 'truncate block',
          selectedIcon: '',
          enterClass: '',
          enterActiveClass: 'opacity-0 transition ease-out duration-100',
          enterToClass: 'opacity-100',
          leaveClass: 'transition ease-in opacity-100',
          leaveActiveClass: '',
          leaveToClass: 'opacity-0 duration-75',
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
      nextPage: undefined as undefined | number,
    };
  },

  created() {
    this.selectedOption = this.findOptionByValue(this.value);
  },

  updated() {
    if (typeof this.selectedOption === 'undefined'
      || (this.selectedOption.value !== this.value && this.value !== null)
    ) {
      this.selectedOption = this.findOptionByValue(this.value);
    }
  },

  watch: {
    normalizedOptions: {
      handler() {
        this.query = '';
        this.filterOptions('');
      },
      immediate: true,
    },
    query(query: string) {
      this.nextPage = undefined;
      this.filterOptions(query);
    },
    async localValue(localValue: string | null) {
      if (!this.selectedOption || this.selectedOption.value !== localValue) {
        this.selectedOption = this.findOptionByValue(localValue);
      }

      this.$emit('input', localValue);

      await this.$nextTick();

      this.$emit('change', localValue);

      if (this.closeOnSelect) {
        this.hideOptions();
      }
    },
    value(value) {
      this.localValue = value;
    },
    async highlighted(highlighted) {
      if (highlighted === null) {
        return;
      }

      await this.$nextTick();
      this.scrollToHighlightedOption();
    },
    show(show) {
      if (show) {
        if (this.shouldShowSearchbox) {
          this.focusSearchBox();
        }

        if (!this.atLeastOneValidOptionExists) {
          this.highlighted = null;
          return;
        }

        this.highlighted = this.selectedOptionIndex !== undefined
          ? this.selectedOptionIndex
          : this.findNextOptionIndex();
      }
    },
    shouldShowSearchbox(shouldShowSearchbox) {
      if (shouldShowSearchbox && this.show) {
        this.focusSearchBox();
      }
    },
  },

  computed: {
    usesAJax(): boolean {
      return !!this.fetchOptions;
    },
    shouldShowSearchbox(): boolean {
      const showSearchbox = !this.hideSearchBox;
      const hasQuery = !!this.query;
      const hasMinResultsSetting = typeof this.minimumResultsForSearch === 'undefined';

      const hasminimumResultsForSearch: boolean = hasMinResultsSetting
      || hasQuery
      || (
        this.usesAJax
          ? this.filteredflattenedOptions.length >= this.minimumResultsForSearch
          : this.normalizedOptions.length >= this.minimumResultsForSearch
      );

      return showSearchbox && hasminimumResultsForSearch;
    },
    hasMinimumInputLength(): boolean {
      return this.minimumInputLength === undefined
        || this.query.length >= this.minimumInputLength;
    },
    filteredflattenedOptions(): NormalizedOptions {
      return this.filteredOptions.map((option: NormalizedOption) => {
        if (option.children) {
          return option.children;
        }

        return option;
      }).flat();
    },
    atLeastOneValidOptionExists(): boolean {
      return this.filteredflattenedOptions.some((option) => !option.disabled);
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

    highlightedOption(): NormalizedOption | undefined {
      if (typeof this.highlighted === 'number') {
        return this.filteredflattenedOptions[this.highlighted];
      }

      return undefined;
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
      if (!this.hasMinimumInputLength) {
        this.filteredOptions = [];
        return;
      }

      if (!this.fetchOptions) {
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
          const { results, hasMorePages } = await this.getFilterPromise(query);

          if (this.nextPage) {
            const currentOptionsListLength = this.filteredOptions.length;
            this.filteredOptions = this.filteredOptions.concat(this.normalizeOptions(results));
            // Ux: When the last item is highlighted highlight the next one, make
            // special sense when using keyboard
            if (this.highlighted === currentOptionsListLength - 1) {
              this.highlighted = currentOptionsListLength;
            }
          } else {
            this.filteredOptions = this.normalizeOptions(results);

            if (this.filteredOptions.length) {
              this.highlighted = 0;
            } else {
              this.highlighted = null;
            }
          }

          if (hasMorePages) {
            this.nextPage = this.nextPage === undefined ? 2 : this.nextPage + 1;
          } else {
            this.nextPage = undefined;
          }
        } catch (error) {
          this.$emit('fetch-error', error);
          this.filteredOptions = [];
        }


        this.searching = false;
        this.delayTimeout = undefined;
      }, this.delay);
    },

    getFilterPromise(query: string): AjaxResults {
      return Promise
        .resolve(this.fetchOptions(query, this.nextPage) as AjaxResults);
    },

    listEndReached() {
      if (!this.nextPage || this.searching) {
        return;
      }

      this.filterOptions(this.query);
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

      if (this.selectOnClose && this.highlightedOption) {
        this.selectOption(this.highlightedOption, false);
      }
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
      let shouldHideOptions = true;
      const clickedElement = e.relatedTarget as HTMLElement;

      if (clickedElement) {
        const wrapper = this.$refs.wrapper as HTMLDivElement;
        const isChild = wrapper.contains(clickedElement);
        if (isChild) {
          shouldHideOptions = false;
        }
      }

      if (clickedElement !== this.$refs.selectButton && !shouldHideOptions && this.getSearchBox()) {
        this.focusSearchBox();
        return;
      }

      if (shouldHideOptions) {
        this.hideOptions();
      }

      this.$emit('blur', e);
      this.hasFocus = false;
    },
    focusHandler(e: FocusEvent) {
      this.hasFocus = true;
      if (this.openOnFocus) {
        this.showOptions();
      }
      this.$emit('focus', e);
    },
    clickHandler(e: MouseEvent) {
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
    findNextOptionIndex(currentOptionIndex: null | number = null): number {
      const endReached = currentOptionIndex !== null
        && currentOptionIndex + 1 >= this.filteredflattenedOptions.length;

      let nextOptionIndex: number;

      if (currentOptionIndex === null || endReached) {
        nextOptionIndex = 0;
      } else {
        nextOptionIndex = currentOptionIndex + 1;
      }

      const nextOption = this.filteredflattenedOptions[nextOptionIndex];

      if (!nextOption || nextOption.disabled) {
        return this.findNextOptionIndex(nextOptionIndex);
      }

      return nextOptionIndex;
    },
    findPrevOptionIndex(currentOptionIndex: null | number): number {
      const beginningReached = currentOptionIndex === null
        || currentOptionIndex - 1 < 0;

      let prevOptionIndex: number;

      if (currentOptionIndex === null || beginningReached) {
        prevOptionIndex = this.filteredflattenedOptions.length - 1;
      } else {
        prevOptionIndex = currentOptionIndex - 1;
      }

      const prevOption = this.filteredflattenedOptions[prevOptionIndex];

      if (!prevOption || prevOption.disabled) {
        return this.findPrevOptionIndex(prevOptionIndex);
      }

      return prevOptionIndex;
    },
    async arrowUpHandler(e: KeyboardEvent) {
      e.preventDefault();

      if (!this.show) {
        this.showOptions();
        return;
      }

      if (!this.atLeastOneValidOptionExists) {
        this.highlighted = null;
        return;
      }

      this.highlighted = this.findPrevOptionIndex(this.highlighted);
    },
    arrowDownHandler(e: KeyboardEvent) {
      e.preventDefault();

      if (!this.show) {
        this.showOptions();
        return;
      }

      if (!this.atLeastOneValidOptionExists) {
        this.highlighted = null;
        return;
      }

      const nextOptionIndex: number = this.findNextOptionIndex(this.highlighted);

      const endReached = nextOptionIndex >= this.filteredflattenedOptions.length;

      if (endReached && this.usesAJax && this.nextPage) {
        this.listEndReached();
      } else {
        this.highlighted = nextOptionIndex;
      }
    },
    listScrollHandler(e: Event) {
      const el = e.target as HTMLUListElement;
      if (el.scrollTop === (el.scrollHeight - el.offsetHeight)) {
        this.listEndReached();
      }
    },
    scrollToHighlightedOption(behavior: 'auto' | 'smooth' = 'auto') {
      if (this.$refs.optionsList && typeof this.highlighted === 'number') {
        const list = this.$refs.optionsList as HTMLUListElement;
        const li = list.querySelectorAll('li[data-type=option]')[this.highlighted] as HTMLLIElement;
        if (li.scrollIntoView) {
          li.scrollIntoView({ block: 'nearest', behavior });
        }
      }
    },
    escapeHandler(e: KeyboardEvent): void {
      e.preventDefault();
      this.hideOptions();
    },
    enterHandler(e: KeyboardEvent): void {
      if (!this.show) {
        return;
      }

      if (this.highlighted !== null) {
        e.preventDefault();
        this.selectOption(this.highlightedOption as NormalizedOption);
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
    async selectOption(option: NormalizedOption, focus = true) {
      if (this.localValue !== option.value) {
        (this.localValue as string | number | boolean | symbol | null) = option.value;
      }

      this.selectedOption = option;

      await this.$nextTick();

      if (focus) {
        if (!this.closeOnSelect && this.shouldShowSearchbox) {
          this.getSearchBox().focus();
        } else {
          this.getButton().focus();

          if (this.closeOnSelect && this.show) {
            this.hideOptions();
          }
        }
      }
    },
    clearButtonClickHandler(e: MouseEvent): void {
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
