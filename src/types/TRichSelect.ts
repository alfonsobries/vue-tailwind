import { CombinedVueInstance } from 'vue/types/vue';
import CssClass from './CssClass';
import NormalizedOptions from './NormalizedOptions';
import NormalizedOption from './NormalizedOption';

type TRichSelect = CombinedVueInstance<Vue,
{
  hasFocus: boolean;
  localValue: string | number | boolean | symbol | null;
  show: boolean;
  filteredOptions: NormalizedOptions;
  highlighted: number | null;
  query: string;
  selectedOption: NormalizedOption | undefined;
  searching: boolean;
  delayTimeout: undefined | ReturnType<typeof setTimeout>;
  nextPage: undefined | number;
},
{
  getElementCssClass: (elementName?: string) => CssClass;
  clickHandler: (e: MouseEvent) => void;
  focusHandler: (e: FocusEvent) => void;
  blurHandler: (e: FocusEvent) => void;
  arrowDownHandler: (e: KeyboardEvent) => void;
  arrowUpHandler: (e: KeyboardEvent) => void;
  enterHandler: (e: KeyboardEvent) => void;
  escapeHandler: (e: KeyboardEvent) => void;
  listScrollHandler: (e: Event) => void;
  // eslint-disable-next-line max-len
  optionHasValue(option: NormalizedOption, value: string | number | boolean | symbol | null): boolean;
  selectOption(option: NormalizedOption): void;
  searchInputHandler(e: Event): void;
  clearButtonClickHandler(e: MouseEvent): void;
}, {
  normalizedHeight: string;
  hasMinimumInputLength: boolean;
  shouldShowSearchbox: boolean;
}, {
  id?: string | null;
  name?: string | null;
  autofocus?: boolean;
  disabled?: boolean;
  hideSearchBox?: boolean;
  openOnFocus: boolean;
  closeOnSelect: boolean;
  selectOnClose: boolean;
  minimumResultsForSearch?: number;
  clearable: boolean;
  value: string;
  noResultsText: string;
  searchingText: string;
  loadingMoreResultsText: string;
  searchBoxPlaceholder: string;
  delay: number;
  placeholder: string | undefined;
  fetchOptions: Function | undefined;
  minimumInputLength: number | undefined;
  minimumInputLengthText: Function | string;
  valueAttribute: string | undefined;
  textAttribute: string | undefined;
}>

export default TRichSelect;
