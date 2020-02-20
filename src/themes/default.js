// For convenience we organize every component classes in his own file, but if you are planning to
// create your own theme (and you prefer) remember that you can also define the classes directly.
// So instead of importing the file:
// `import TInput from './default/TInput'`
// 
// You can define have all your classes in your theme file like:
// ```
// const TInput = {
//   baseClass: 'border block w-full rounded',
//   ...
// }
// const TTextarea = {
//   ...
// }
// ...
// ```

import TInput from './default/TInput'
import TTextarea from './default/TTextarea'
import TSelect from './default/TSelect'
import TRadio from './default/TRadio'
import TCheckbox from './default/TCheckbox'
import TButton from './default/TButton'
import TRadioGroup from './default/TRadioGroup'
import TCheckboxGroup from './default/TCheckboxGroup'
import TInputGroup from './default/TInputGroup'
import TAlert from './default/TAlert'
import TCard from './default/TCard'
import TTable from './default/TTable'
import TPagination from './default/TPagination'
import TDropdown from './default/TDropdown'
import TModal from './default/TModal'

const DefaultTheme = {
  TInput,
  TTextarea,
  TSelect,
  TRadio,
  TCheckbox,
  TButton,
  TRadioGroup,
  TCheckboxGroup,
  TInputGroup,
  TAlert,
  TTable,
  TPagination,
  TCard,
  TDropdown,
  TModal,
}

export {
  TInput,
  TTextarea,
  TSelect,
  TButton,
  TRadio,
  TCheckbox,
  TRadioGroup,
  TCheckboxGroup,
  TInputGroup,
  TAlert,
  TTable,
  TPagination,
  TCard,
  TDropdown,
  TModal,
}

export default DefaultTheme
