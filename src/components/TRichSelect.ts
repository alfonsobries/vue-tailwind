import { CreateElement, VNode } from 'vue';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import TRichSelectType from '../types/TRichSelect';
import MultipleInput from '../base/MultipleInput';
import InputOptions from '../types/InputOptions';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';
import TRichSelectRenderer from '../renderers/TRichSelectRenderer';

type AjaxResults = Promise<{
  results: InputOptions;
  hasMorePages?: boolean;
}>

type SelectOptionValue = string | number | boolean | symbol | null;

const TRichSelect = MultipleInput.extend({
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
    multiple: {
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
          selectButtonTagWrapper: 'flex flex-wrap overflow-hidden',
          selectButtonTag: 'bg-blue-500 block disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition whitespace-nowrap m-0.5 max-w-full overflow-hidden h-8 flex items-center',
          selectButtonTagText: 'px-3',
          selectButtonTagDeleteButton: '-ml-1.5 h-full hover:bg-blue-600 hover:shadow-sm inline-flex items-center px-2 transition',
          selectButtonTagDeleteButtonIcon: 'w-3 h-3',
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
          selectButton: 'px-3 py-2 text-black transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
          selectButtonLabel: '',
          selectButtonTagWrapper: '-mx-2 -my-2.5 py-1 pr-8',
          selectButtonTag: 'bg-blue-500 block disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition whitespace-nowrap m-0.5 max-w-full overflow-hidden h-8 flex items-center',
          selectButtonTagText: 'px-3',
          selectButtonTagDeleteButton: '-ml-1.5 h-full hover:bg-blue-600 hover:shadow-sm inline-flex items-center px-2 transition',
          selectButtonTagDeleteButtonIcon: '',
          selectButtonPlaceholder: 'text-gray-400',
          selectButtonIcon: 'text-gray-600',
          selectButtonClearButton: 'hover:bg-blue-100 text-gray-600 rounded transition duration-100 ease-in-out',
          selectButtonClearIcon: '',
          dropdown: '-mt-1 bg-white border-b border-gray-300 border-l border-r rounded-b shadow-sm',
          dropdownFeedback: 'pb-2 px-3 text-gray-400 text-sm',
          loadingMoreResults: 'pb-2 px-3 text-gray-400 text-sm',
          optionsList: '',
          searchWrapper: 'p-2 placeholder-gray-400',
          searchBox: 'px-3 py-2 bg-gray-50 text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300',
          optgroup: 'text-gray-400 uppercase text-xs py-1 px-2 font-semibold',
          option: '',
          disabledOption: '',
          highlightedOption: 'bg-blue-100',
          selectedOption: 'font-semibold bg-gray-100 bg-blue-500 font-semibold text-white',
          selectedHighlightedOption: 'font-semibold bg-gray-100 bg-blue-600 font-semibold text-white',
          optionContent: 'flex justify-between items-center px-3 py-2',
          optionLabel: '',
          selectedIcon: '',
          enterClass: 'opacity-0',
          enterActiveClass: 'transition ease-out duration-100',
          enterToClass: 'opacity-100',
          leaveClass: 'opacity-100',
          leaveActiveClass: 'transition ease-in duration-75',
          leaveToClass: 'opacity-0',
        };
      },
    },
  },

  data() {
    return {
      hasFocus: false,
      show: false,
      localValue: this.value as SelectOptionValue | SelectOptionValue[],
      highlighted: null as number | null,
      query: '',
      filteredOptions: [] as NormalizedOptions,
      selectedOption: undefined as undefined | NormalizedOption,
      selectedOptions: [] as NormalizedOptions,
      searching: false,
      delayTimeout: undefined as undefined | ReturnType<typeof setTimeout>,
      nextPage: undefined as undefined | number,
      tagsAreFocusable: false,
    };
  },

  created() {
    if (Array.isArray(this.value)) {
      this.selectedOptions = this.value
        .map((value) => this.findOptionByValue(value))
        .filter((option) => !!option) as NormalizedOptions;
    } else if (!this.selectedOption || this.selectedOption.value !== this.value) {
      this.selectedOption = this.findOptionByValue(this.value);
    }
  },

  updated() {
    if (typeof this.selectedOption === 'undefined'
    || (!Array.isArray(this.value) && this.selectedOption.value !== this.value && this.value !== null)
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
    async localValue(localValue: SelectOptionValue | SelectOptionValue[]) {
      if (Array.isArray(localValue)) {
        this.selectedOptions = localValue
          .map((value) => this.findOptionByValue(value))
          .filter((option) => !!option) as NormalizedOptions;
      } else if (!this.selectedOption || this.selectedOption.value !== localValue) {
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
    usesAjax(): boolean {
      return !!this.fetchOptions;
    },
    shouldShowSearchbox(): boolean {
      const showSearchbox = !this.hideSearchBox;
      const hasQuery = !!this.query;
      const hasMinResultsSetting = typeof this.minimumResultsForSearch === 'undefined';

      const hasminimumResultsForSearch: boolean = hasMinResultsSetting
      || hasQuery
      || (
        this.usesAjax
          ? this.filteredflattenedOptions.length >= this.minimumResultsForSearch
          : this.normalizedOptions.length >= this.minimumResultsForSearch
      );

      return showSearchbox && hasminimumResultsForSearch;
    },
    hasMinimumInputLength(): boolean {
      return this.minimumInputLength === undefined
        || this.query.length >= this.minimumInputLength;
    },
    flattenedOptions(): NormalizedOptions {
      return this.normalizedOptions.map((option: NormalizedOption) => {
        if (option.children) {
          return option.children;
        }

        return option;
      }).flat();
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
      let selectedOption: undefined | NormalizedOption;

      if (this.multiple) {
        selectedOption = this.selectedOptions.length >= 1 ? this.selectedOptions[this.selectedOptions.length - 1] : undefined;
      } else {
        selectedOption = this.selectedOption;
      }

      if (!selectedOption) {
        return undefined;
      }

      const index = this.filteredflattenedOptions
        .findIndex((option) => this.optionHasValue(option, (selectedOption as NormalizedOption).value));

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
      if (this.usesAjax) {
        // When using ajax results the filtered options are that ones that were
        // fetched with the `fetchOptions` method. Since those can change, we
        // also need to check the `selectedOptions` array that contains the
        // already selected ones.
        return [...this.filteredflattenedOptions, ...this.selectedOptions]
          .find((option) => this.optionHasValue(option, value));
      }

      return this.flattenedOptions
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

        let clickedATag = false;
        if (this.multiple) {
          clickedATag = (this.$refs.tagsContainer as HTMLDivElement).contains(clickedElement);
        }

        if (isChild && !clickedATag) {
          shouldHideOptions = false;
        }
      }

      if (
        clickedElement !== this.$refs.selectButton
          && !shouldHideOptions
          && this.getSearchBox()) {
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
        if (this.multiple) {
          this.getTagsContainer().focus();
        } else {
          this.getButton().focus();
        }
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

      if (endReached && this.usesAjax && this.nextPage) {
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
    getTagsContainer() {
      return this.$refs.tagsContainer as HTMLButtonElement;
    },
    getSearchBox() {
      return this.$refs.searchBox as HTMLInputElement;
    },
    async selectOption(option: NormalizedOption, focus = true) {
      const optionValue = option.value as SelectOptionValue;

      if (this.multiple) {
        if (Array.isArray(this.localValue)) {
          const valueIndex = this.localValue.findIndex((value) => isEqual(value, optionValue));
          if (valueIndex >= 0) {
            this.localValue.splice(valueIndex, 1);
            const selectedOptionIndex = this.selectedOptions.findIndex((o) => o.value === optionValue);
            if (selectedOptionIndex >= 0) {
              this.unselectOptionAtIndex(selectedOptionIndex);
              this.selectedOptions.splice(selectedOptionIndex, 1);
            }
          } else {
            this.localValue.push(optionValue);
            this.selectedOptions.push(option);
          }
        } else {
          this.localValue = [optionValue];
          this.selectedOptions.push(option);
        }
      } else {
        if (this.localValue !== optionValue) {
          this.localValue = optionValue;
        }

        this.selectedOption = option;
      }

      await this.$nextTick();

      if (focus) {
        if (!this.closeOnSelect && this.shouldShowSearchbox) {
          this.getSearchBox().focus();
        } else {
          if (this.multiple) {
            this.getTagsContainer().focus();
          } else {
            this.getButton().focus();
          }

          if (this.closeOnSelect && this.show) {
            this.hideOptions();
          }
        }
      }
    },
    unselectOptionAtIndex(index: number) {
      const selectedOption = this.selectedOptions[index];
      const valueIndex = (this.localValue as SelectOptionValue[]).findIndex((value) => isEqual(value, selectedOption.value));
      if (valueIndex >= 0) {
        this.localValue.splice(valueIndex, 1);
      }
    },
    clearButtonClickHandler(e: MouseEvent): void {
      e.preventDefault();
      e.stopPropagation();
      if (this.multiple) {
        this.localValue = this.selectedOptions.filter((o) => !!o.disabled).map((o) => o.value);
      } else {
        this.localValue = null;
      }
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
    async selectTag(tag: HTMLButtonElement) {
      this.tagsAreFocusable = true;
      // Wait until the tag has `tabindex`
      await this.$nextTick();
      tag.focus();
    },
    async unselectTag() {
      this.tagsAreFocusable = false;
    },
  },
});


export default TRichSelect;
