import TRichSelectType from '@/types/TRichSelect';
import { CreateElement, VNode } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import InputWithOptions from '@/base/InputWithOptions';
import InputOptions from '@/types/InputOptions';
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
    minimumInputLength: {
      type: Number,
      default: undefined,
    },
    minimumResultsForSearch: {
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
    classes: {
      type: Object,
      default() {
        return {
          wrapper: 'relative',
          buttonWrapper: 'inline-block w-full relative',
          selectButton: 'w-full border bg-white flex text-left justify-between items-center rounded p-2 focus:outline-none focus:shadow-outline',
          selectButtonLabel: 'block truncate',
          selectButtonPlaceholder: 'block truncate text-gray-500',
          selectButtonIcon: 'fill-current flex-shrink-0 ml-1 h-4 w-4',
          selectButtonClearButton: 'hover:bg-gray-200 text-gray-500 rounded flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6',
          selectButtonClearIcon: 'fill-current h-3 w-3',
          dropdown: 'absolute w-full rounded bg-white shadow z-10',
          dropdownFeedback: 'p-2 text-sm text-gray-500',
          loadingMoreResults: 'p-2 text-sm text-gray-500',
          optionsList: 'overflow-auto',
          searchWrapper: 'inline-block w-full bg-white p-2',
          searchBox: 'inline-block w-full p-2 bg-gray-200 text-sm rounded border focus:outline-none focus:shadow-outline',
          optgroup: 'text-gray-500 uppercase text-xs py-1 px-2 font-semibold',
          option: '',
          highlightedOption: 'bg-gray-300',
          selectedOption: 'font-semibold bg-gray-100',
          selectedHighlightedOption: 'bg-gray-300 font-semibold',
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
      nextPage: undefined as undefined | number,
    };
  },

  created() {
    this.selectedOption = this.findOptionByValue(this.value);
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
    async show(show) {
      if (show) {
        if (this.shouldShowSearchbox) {
          this.focusSearchBox();
        }

        if (!this.filteredflattenedOptions.length) {
          this.highlighted = null;
          return;
        }

        this.highlighted = this.selectedOptionIndex || 0;
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
      if (this.highlighted) {
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
              await this.$nextTick();
              this.scrollToHighlightedOption('smooth');
            }
          } else {
            this.filteredOptions = this.normalizeOptions(results);

            if (this.filteredOptions.length) {
              this.highlighted = 0;
            } else {
              this.highlighted = null;
            }

            this.scrollToHighlightedOption();
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

      this.scrollToHighlightedOption();
    },
    arrowDownHandler(e: KeyboardEvent) {
      e.preventDefault();

      if (!this.show) {
        this.showOptions();
        return;
      }

      const endReached = this.highlighted !== null
        && this.highlighted + 1 >= this.filteredflattenedOptions.length;

      if (endReached && this.usesAJax && this.nextPage) {
        this.listEndReached();
      } else if (this.highlighted === null) {
        this.highlighted = 0;
      } else {
        this.highlighted = endReached ? 0 : this.highlighted + 1;
      }

      this.scrollToHighlightedOption();
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
