import TTextField from './TTextField.vue'
import TTextarea from './TTextarea.vue'
import TSelect from './TSelect.vue'
import DefaultTheme from '../themes/default.js'

const fields = {
  TTextField: TTextField,
  TTextarea: TTextarea,
  TSelect: TSelect,
}

/**
 * Will extend the component with the merged classes added in the settings
 */
function extendComponent (Vue, CurrentTheme, componentName) {
  const propsDefaults = CurrentTheme[componentName]

  let props = fields[componentName].props

  Object.keys(propsDefaults).forEach(key => {
    const prop = {
      default: propsDefaults[key]
    }
    props[key] = prop
  })

  return Vue.extend({
    ...fields[componentName],
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

    const components = args.components || [
      'TTextField',
      'TTextarea',
      'TSelect',
    ]

    components.forEach(componentName => {
      Vue.component(componentName, extendComponent(Vue, CurrentTheme, componentName))
    })
  }
}

export default VueTailwind
