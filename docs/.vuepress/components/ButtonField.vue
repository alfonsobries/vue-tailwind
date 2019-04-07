<template>
  <input-demo>
    <t-button
      :disabled="disabled"
      :id="id"
      :name="name"
    >{{ label }}</t-button>

    <template slot="controls">
      <label class="">
        <input 
          v-model="disabled" 
          type="checkbox">
        <span>
          {{ disabled ? 'Enabled' : 'Disabled' }}
        </span>
      </label>
    </template>
  </input-demo>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'TextInput',

  data () {
    return {
      label: 'Im a nice button',
      disabled: false,
      id: 't-button',
      name: 't-button',
    }
  }
}
</script>
