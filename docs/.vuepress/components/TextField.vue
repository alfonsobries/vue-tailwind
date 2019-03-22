<template>
  <t-text-field
    v-model="model"
    :disabled="disabled"
    :id="id"
    :name="name"
  />
</template>

<script>
import TTextField from '../../../src/components/TTextField'

export default {
  name: 'TextField',

  components: {
    TTextField
  },

  data () {
    return {
      model: 'I love vuejs',
      disabled: null,
      id: 'text-field',
      name: 'text-field'
    }
  }
}
</script>
