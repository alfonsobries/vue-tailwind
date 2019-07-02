const TFileInput = {
  baseClass: 'border block rounded inline-flex items-center justify-center cursor-pointer',
  defaultClass: 'bg-white border-gray-400 hover:bg-gray-100 hover:border-gray-500',
  primaryClass: 'text-white bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600',
  secondaryClass: 'border-blue-500 text-blue-500 bg-white hover:border-blue-600 hover:text-blue-600 hover:bg-white',
  tertiaryClass: 'border block underline text-blue-500 border-transparent bg-transparent hover:text-blue-600',
  successClass: 'text-white bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600',
  dangerClass: 'text-white bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600',
  warningClass: 'text-yellow-900 bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600',
  disabledClass: 'cursor-not-allowed opacity-75',
  defaultSizeClass: 'px-6 py-3',
  largeSizeClass: 'px-8 py-4 text-lg',
  smallSizeClass: 'px-4 py-2 text-sm',
  defaultLabel: 'Choose File...',
  defaultIcon: `<svg style="width:24px;height:24px" fill="currentColor" viewBox="0 0 24 24">
  <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
</svg>`
}

export default TFileInput
