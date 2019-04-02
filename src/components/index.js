import TTextField from './TTextField.vue'
import DefaultTheme from '../themes/default.js'

/**
 * Will extend the component with the merged classes added in the settings
 */
function extendComponent (Vue, Component, CurrentTheme, componentName) {
  const propsDefaults = CurrentTheme[componentName]

  let props = {}

  Object.keys(propsDefaults).forEach(key => {
    const prop = {
      default: propsDefaults[key]
    }
    props[key] = prop
  })

  return Vue.extend({
    ...Component,
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
      'TTextField'
    ]

    components.forEach(componentName => {
      Vue.component(componentName, extendComponent(Vue, TTextField, CurrentTheme, componentName))
    })
  }
}

export default VueTailwind
