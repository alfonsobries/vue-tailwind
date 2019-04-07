<template>
  <input-demo>
    <t-textarea
      v-model="model"
      :disabled="disabled"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxlength"
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

      <p class="flex items-center mt-2">
        <label 
          for="rows" 
          class="mr-2">
          Rows:
        </label>
        <t-input
          id="rows"
          v-model.number="rows"
          name="rows"
          type="number"
          default-class="p-1 border text-sm"
        />
      </p>

      <p class="flex items-center mt-2">
        <label 
          for="rows" 
          class="mr-2">
          Max Length:
        </label>
        <t-input
          id="maxlength"
          v-model.number="maxlength"
          name="maxlength"
          type="number"
          default-class="p-1 border text-sm"
        />
      </p>
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
      rows: 4,
      maxlength: null,
    }
  }
}
</script>
