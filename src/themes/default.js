const BootstrapTheme = {
  TInput: {
    defaultClass: 'border block w-full rounded',
    defaultStatusClass: 'bg-white',
    errorStatusClass: 'border-red bg-red-lightest',
    successStatusClass: 'border-green bg-green-lightest',
    disabledClass: 'bg-grey-lightest cursor-not-allowed',
    defaultSizeClass: 'p-3',
    largeSizeClass: 'p-4 text-lg',
    smallSizeClass: 'p-2 text-sm',
  },
  TTextarea: {
    defaultClass: 'border block w-full rounded',
    defaultStatusClass: 'bg-white',
    errorStatusClass: 'border-red bg-red-lightest',
    successStatusClass: 'border-green bg-green-lightest',
    disabledClass: 'bg-grey-lightest cursor-not-allowed',
    defaultSizeClass: 'p-3',
    largeSizeClass: 'p-4 text-lg',
    smallSizeClass: 'p-2 text-sm',
  },
  TSelect: {
    defaultClass: 'block appearance-none w-full border pr-8 rounded leading-tight',
    defaultClassMultiple: 'block appearance-none w-full border rounded leading-tight',
    defaultStatusClass: 'bg-white',
    errorStatusClass: 'border-red bg-red-lightest',
    successStatusClass: 'border-green bg-green-lightest',
    disabledClass: 'bg-grey-lightest cursor-not-allowed',
    arrowWrapperClass: 'pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker',
    arrowClass: 'fill-current h-4 w-4',
    defaultSizeClass: 'p-3',
    largeSizeClass: 'p-4 text-lg',
    smallSizeClass: 'p-2 text-sm',
  },
  TButton: {
    defaultClass: 'border block w-full rounded',
    defaultStatusClass: 'bg-grey-light border-grey-light hover:bg-grey hover:border-grey',
    errorStatusClass: 'border-red bg-red text-white',
    successStatusClass: 'border-green bg-green text-white',
    disabledClass: 'bg-grey-light border-grey-light cursor-not-allowed opacity-75',
    defaultSizeClass: 'p-3',
    largeSizeClass: 'p-4 text-lg',
    smallSizeClass: 'p-2 text-sm',
  }
}

export const {
  TInput: TInputTheme,
  TTextarea: TTextareaTheme,
  TSelect: TSelectTheme,
  TButton: TButtonTheme,
} = BootstrapTheme

export default BootstrapTheme
