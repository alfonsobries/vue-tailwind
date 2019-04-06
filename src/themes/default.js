const BootstrapTheme = {
  TTextField: {
    defaultClass: 'border p-3 block w-full rounded bg-white',
    defaultStatusClass: '',
    errorStatusClass: 'border-red',
    successStatusClass: 'border-green',
    successStatusClass: 'border-green',
    disabledClass: '',
  },
  TTextarea: {
    defaultClass: 'border p-3 block w-full rounded bg-white',
    defaultStatusClass: '',
    errorStatusClass: 'border-red',
    successStatusClass: 'border-green',
    disabledClass: '',
  },
  TSelect: {
    defaultClass: 'block appearance-none w-full border p-3 pr-8 rounded leading-tight bg-white',
    defaultClassMultiple: 'block appearance-none w-full border p-3 rounded leading-tight bg-white',
    defaultStatusClass: '',
    errorStatusClass: 'border-red',
    successStatusClass: 'border-green',
    disabledClass: '',
  }
}

export const {
  TTextField: TTextFieldTheme,
  TTextarea: TTextareaTheme,
  TSelect: TSelectTheme,
} = BootstrapTheme

export default BootstrapTheme
