<template>
  <input-demo>
    <t-button
      :disabled="disabled"
      :id="id"
      :name="name"
      :status="status"
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

      <status-control v-model="status" >Button status</status-control>
    </template>
  </input-demo>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'TextInput',

  data () {
    return {
      status: undefined,
      label: 'Im a nice button',
      disabled: false,
      id: 't-button',
      name: 't-button',
    }
  }
}
</script>
