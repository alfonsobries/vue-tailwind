const selfInstall = (Vue, theme = {}, component) => {
  const { props } = component

  Object.keys(theme).forEach(key => {
    const prop = {
      default: () => theme[key]
    }
    props[key] = prop
  })

  Vue.component(component.name, {
    ...component,
    ... {
      props
    }
  })
}

export default selfInstall
