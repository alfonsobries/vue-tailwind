<template>
  <div class="flex">
    <div class="flex-1 m-2">
      <t-text-field
        v-model="model"
        :disabled="disabled"
        :id="id"
        :name="name"
        :placeholder="placeholder"
      />
    </div>
    <div class="flex-1 m-2">
      <label class="">
        <input v-model="disabled" type="checkbox">
        <span>
          {{ disabled ? 'Enabled' : 'Disabled' }}
        </span>
      </label>
    </div>
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
      name: 'text-field',
      placeholder: 'Nice placeholder'
    }
  }
}
</script>
