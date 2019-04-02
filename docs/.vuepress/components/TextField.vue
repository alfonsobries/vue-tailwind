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
import { TTextField } from '../../../src/components'

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
