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
    defaultClass: 'border block w-full rounded bg-white border-grey-light hover:bg-grey-lightest hover:bg-grey-lightest',
    primaryClass: 'border block w-full rounded text-white bg-blue border-blue hover:bg-blue-dark hover:bg-blue-dark',
    secondaryClass: 'border block w-full rounded border-blue-light text-blue bg-white hover:border-blue hover:text-blue-dark hover:bg-white',
    tertiaryClass: 'border block w-full underline text-blue hover:text-blue-dark border-transparent bg-transparent',
    successClass: 'border block w-full rounded text-white bg-green border-green hover:bg-green-dark',
    dangerClass: 'border block w-full rounded text-white bg-red border-red hover:bg-red-dark',
    warningClass: 'border block w-full rounded text-yellow-darkest bg-yellow border-yellow hover:bg-yellow-dark',
    disabledClass: 'cursor-not-allowed opacity-75',
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
