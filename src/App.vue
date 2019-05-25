<template>
  <div id="app">
    <h1>Text Field</h1>

    <t-input
      :id="text.id"
      v-model="text.value"
      :disabled="text.disabled"
      :name="text.name"
    />

    <p>{{ text.value }}</p>

    <ul>
      <li>
        <label for="text-disabled">
          <input 
            id="text-disabled" 
            v-model="text.disabled" 
            type="checkbox"
          >
          Disabled
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import TInput from '@/elements/TInput'

export default {
  name: 'App',
  components: {
    TInput
  },

  data () {
    return {
      text: {
        value: null,
        disabled: null,
        id: 'text-field',
        name: 'text-field'
      }
    }
  },
}
</script>
