import { CombinedVueInstance } from 'vue/types/vue';
import CssClass from './CssClass';
import NormalizedOptions from './NormalizedOptions';
import NormalizedOption from './NormalizedOption';

type TRichSelect = CombinedVueInstance<Vue,
{
  clearable: boolean;
  hideSearchBox: boolean;
  value: string;
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
}, {
  normalizedHeight: string;
}, {

}>

export default TRichSelect;
