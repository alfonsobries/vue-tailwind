import merge from 'lodash/merge'
import DefaultTheme from './themes/default.js'

import TInput from './elements/TInput.vue'
import TTextarea from './elements/TTextarea.vue'
import TSelect from './elements/TSelect.vue'
import TButton from './elements/TButton.vue'
import TRadio from './elements/TRadio.vue'
import TRadioGroup from './elements/TRadioGroup.vue'
import TCheckbox from './elements/TCheckbox.vue'
import TCheckboxGroup from './elements/TCheckboxGroup.vue'

import TAlert from './components/TAlert.vue'
import TCard from './components/TCard.vue'
import TTable from './components/TTable.vue'
import TModal from './components/TModal.vue'
import TPagination from './components/TPagination.vue'
import TDropdown from './components/TDropdown.vue'
import TInputGroup from './components/TInputGroup.vue'

const components = {
  TInput,
  TTextarea,
  TSelect,
  TButton,
  TRadio,
  TRadioGroup,
  TCheckbox,
  TCheckboxGroup,
  TDropdown,
  TInputGroup,
  TCard,
  TTable,
  TModal,
  TPagination,
  TAlert,
}

/**
 * Will extend the component with the merged classes added in the settings
 */
function extendComponent (Vue, CurrentTheme, componentName) {
  const themeSettings = CurrentTheme[componentName]
  const themeDefaultSettings = DefaultTheme[componentName]

  const newSettings = merge(themeDefaultSettings, themeSettings)
  
  let { props } = components[componentName]
  
  Object.keys(newSettings).forEach(key => {
    const prop = {
      default: () => newSettings[key]
    }
    props[key] = prop
  })

  return Vue.extend({
    ...components[componentName],
    ...{
      props
    }
  })
}

const VueTailwind = {
  install (Vue, args = {}) {
    if (this.installed) {
      return
    }

    this.installed = true

    const CurrentTheme = {
      ...DefaultTheme,
      ...args.theme || {}
    }

    const componentsToRegister = args.components || Object.keys(components)

    componentsToRegister.forEach(componentName => {
      Vue.component(componentName, extendComponent(Vue, CurrentTheme, componentName))
    })
  }
}

export default VueTailwind
