<template>
  <div id="app">
    <h1>Text Field</h1>

    <t-text-field
      v-model="text.value"
      :disabled="text.disabled"
      :id="text.id"
      :name="text.name"
    />

    <p>{{ text.value }}</p>

    <ul>
      <li>
        <label for="text-disabled">
          <input id="text-disabled" type="checkbox" v-model="text.disabled" />
          Disabled
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import TTextField from '@/components/TTextField'

export default {
  components: {
    TTextField
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
  name: 'app'
}
</script>
