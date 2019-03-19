import Vue from 'vue'
import TTextField from './TTextField.vue'

const Components = {
  TTextField
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})


console.log(":DD");
export default Components
