<template>
  <input-demo>
    <t-input
      v-model="model"
      :disabled="disabled"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :status="status"
    />

    <template slot="controls">
      <label class="">
        <input 
          v-model="disabled" 
          type="checkbox">
        <span>
          {{ disabled ? 'Enabled' : 'Disabled' }}
        </span>
      </label>
      
      <status-control v-model="status" />
    </template>

    <template slot="value">
      <p>Current value: <pre class="text-white">{{ model }}</pre></p>
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
      model: 'I love vuejs 😎',
      disabled: false,
      id: 'text-input',
      name: 'text-input',
      placeholder: 'Nice placeholder'
    }
  }
}
</script>
