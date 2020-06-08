import { CombinedVueInstance } from 'vue/types/vue';
import CssClass from './CssClass';
import NormalizedOptions from './NormalizedOptions';
import NormalizedOption from './NormalizedOption';
import InputOption from './InputOption';

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
},
{
  getElementCssClass: (elementName?: string) => CssClass;
  clickHandler: (e: MouseEvent) => void;
  focusHandler: (e: FocusEvent) => void;
  blurHandler: (e: FocusEvent) => void;
  arrowDownHandler: (e: KeyboardEvent) => void;
  arrowUpHandler: (e: KeyboardEvent) => void;
  enterHandler: (e: KeyboardEvent) => void;
  // eslint-disable-next-line max-len
  optionHasValue(option: NormalizedOption, value: string | number | boolean | symbol | null): boolean;
  selectOption(option: NormalizedOption): void;
  searchInputHandler(e: Event): void;
  clearIconClickHandler(e: MouseEvent): void;
  guessOptionText(option: InputOption): string;
}, {
  normalizedHeight: string;
}, {
  id?: string | null;
  name?: string | null;
  autofocus?: boolean;
  disabled?: boolean;
  hideSearchBox: boolean;
  clearable: boolean;
  value: string;
  noResultsText: string;
  searchingText: string;
  searchBoxPlaceholder: string;
  delay: number;
  placeholder: string | undefined;
  fetchOptions: Function | undefined;
}>

export default TRichSelect;
