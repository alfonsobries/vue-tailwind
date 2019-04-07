const BootstrapTheme = {
  TInput: {
    defaultClass: 'border p-3 block w-full rounded',
    defaultStatusClass: 'bg-white',
    errorStatusClass: 'border-red  bg-red-lightest',
    successStatusClass: 'border-green bg-green-lightest',
    disabledClass: 'bg-grey-lightest cursor-not-allowed',
  },
  TTextarea: {
    defaultClass: 'border p-3 block w-full rounded',
    defaultStatusClass: 'bg-white',
    errorStatusClass: 'border-red  bg-red-lightest',
    successStatusClass: 'border-green bg-green-lightest',
    disabledClass: 'bg-grey-lightest cursor-not-allowed',
  },
  TSelect: {
    defaultClass: 'block appearance-none w-full border p-3 pr-8 rounded leading-tight',
    defaultClassMultiple: 'block appearance-none w-full border p-3 rounded leading-tight',
    defaultStatusClass: 'bg-white',
    errorStatusClass: 'border-red  bg-red-lightest',
    successStatusClass: 'border-green bg-green-lightest',
    disabledClass: 'bg-grey-lightest cursor-not-allowed',
    arrowWrapperClass: 'pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker',
    arrowClass: 'fill-current h-4 w-4',
  },
  TButton: {
    defaultClass: 'border p-3 block w-full rounded',
    defaultStatusClass: 'bg-grey-light border-grey-light hover:bg-grey hover:border-grey',
    errorStatusClass: 'border-red bg-red text-white',
    successStatusClass: 'border-green bg-green text-white',
    disabledClass: 'bg-grey-lighter border-grey-lighter cursor-not-allowed',
  }
}

export const {
  TInput: TInputTheme,
  TTextarea: TTextareaTheme,
  TSelect: TSelectTheme,
  TButton: TButtonTheme,
} = BootstrapTheme

export default BootstrapTheme
