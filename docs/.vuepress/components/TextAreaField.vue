<template>
  <input-demo>
    <t-textarea
      v-model="model"
      :disabled="disabled"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :rows="6"
      :status="status"
    />

    <template slot="controls">
      <p>
        <label class="flex items-center">
          <input 
            v-model="disabled" 
            type="checkbox">
          <span class="ml-2">
            {{ disabled ? 'Disabled' : 'Enabled' }}
          </span>
        </label>
      </p>

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
  name: 'TextAreaField',

  data () {
    return {
      model: `Vuejs is awesome

^ Right?`,
      disabled: false,
      id: 'text-field',
      name: 'text-field',
      placeholder: 'Nice placeholder',
      status: undefined,
    }
  }
}
</script>
