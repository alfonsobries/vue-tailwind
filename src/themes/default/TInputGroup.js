const TInputGroup = {
  baseClass: 'mb-3',
  labelClass: 'block uppercase tracking-wide text-xs font-bold mb-1',
  bodyClass: '',
  feedbackClass: 'text-sm',
  descriptionClass: 'text-sm',
  statusClass: {
    default: {
      label: 'text-gray-700',
      body: '',
      feedback: 'text-gray-700',
      description: 'text-gray-700',
    },
    error: {
      label: 'text-red-700',
      body: '',
      feedback: 'text-red-700',
      description: 'text-gray-700',
    },
    success: {
      label: 'text-green-700',
      body: '',
      feedback: 'text-green-700',
      description: 'text-gray-700',
    },
    warning: {
      label: 'text-yellow-700',
      body: '',
      feedback: 'text-yellow-700',
      description: 'text-gray-700',
    }
  }
}

export default TInputGroup
