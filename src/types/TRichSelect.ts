import { CombinedVueInstance } from 'vue/types/vue';
import CssClass from './CssClass';
import NormalizedOptions from './NormalizedOptions';
import NormalizedOption from './NormalizedOption';
import InputOption from './InputOption';

type TRichSelect = CombinedVueInstance<Vue,
{
  id?: string | null;
  name?: string | null;
  autofocus?: boolean;
  disabled?: boolean;
  clearable: boolean;
  hideSearchBox: boolean;
  value: string;
  localValue: string | number | undefined;
  show: boolean;
  filteredOptions: NormalizedOptions;
  highlighted: number | null;
  query: string;
  placeholder: string | undefined;
  noResultsLabel: string;
  searchBoxPlaceholder: string;
},
{
  getElementCssClass: (elementName?: string) => CssClass;
  clickHandler: (e: MouseEvent) => void;
  focusHandler: (e: FocusEvent) => void;
  blurHandler: (e: FocusEvent) => void;
  arrowDownHandler: (e: KeyboardEvent) => void;
  arrowUpHandler: (e: KeyboardEvent) => void;
  enterHandler: (e: KeyboardEvent) => void;
  optionIsSelected(option: NormalizedOption): boolean;
  selectOption(option: NormalizedOption): void;
  searchInputHandler(e: Event): void;
  clearIconClickHandler(e: MouseEvent): void;
  guessOptionText(option: InputOption): string;
}, {
  normalizedHeight: string;
  selectedOption: NormalizedOption | undefined;
}, {

}>

export default TRichSelect;
