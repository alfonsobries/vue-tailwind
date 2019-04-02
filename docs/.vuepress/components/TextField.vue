<template>
  <div>
    <t-text-field
      v-model="model"
      :disabled="disabled"
      :id="id"
      :name="name"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapTheme from '../../../src/themes/bootstrap'
import { TTextField } from '../../../src/components'
import VueTailwind from '../../../src/components'

Vue.use(VueTailwind, {
  theme: BootstrapTheme,
})

// import { TextFieldTheme } from '../../../src/themes/bootstrap.js'
// import Components from '../../../src/components'

// TTextField.theme = TextFieldTheme

export default {
  name: 'TextField',

  data () {
    return {
      model: 'I love vuejs',
      disabled: false,
      id: 'text-field',
      name: 'text-field'
    }
  }
}
</script>
