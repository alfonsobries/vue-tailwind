import TInput from './TInput.vue'
import TTextarea from './TTextarea.vue'
import TSelect from './TSelect.vue'
import TButton from './TButton.vue'
import TRadio from './TRadio.vue'
import TRadioGroup from './TRadioGroup.vue'
import DefaultTheme from '../themes/default.js'

const fields = {
  TInput: TInput,
  TTextarea: TTextarea,
  TSelect: TSelect,
  TButton: TButton,
  TRadio: TRadio,
  TRadioGroup: TRadioGroup,
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

    const components = args.components || Object.keys(fields)

    components.forEach(componentName => {
      Vue.component(componentName, extendComponent(Vue, CurrentTheme, componentName))
    })
  }
}

export default VueTailwind
