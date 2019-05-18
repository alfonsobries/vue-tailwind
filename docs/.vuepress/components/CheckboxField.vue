<template>
  <input-demo>
    <label
      v-for="(option, index) in options"
      :for="`${id}-${index}`"
      class="flex py-1"
    >
      <t-checkbox
        ref="input"
        :key="option.value"
        :id="`${id}-${index}`"
        v-model="model"
        :disabled="disabled"
        :name="name"
        :value="option.value"
      />
      <span class="ml-3">{{ option.text }}</span>
    </label>

    <t-checkbox
        ref="input"
        id="test"
        v-model="test"
        :value="':D'"
        name="test"
        checked
        
      />

  {{ test }}
    <template slot="controls">
      <disabled-control v-model="disabled" />

      <p class="flex items-center mt-2">
        <label 
          for="rows" 
          class="mr-2">
          Add option:
        </label>
        <t-input
          id="newOption"
          v-model.number="newOption"
          name="newOption"
          default-class="p-1 border text-sm"
          @keyup.enter="addNewOption"
        />
      </p>
    </template>

    <template slot="value">
      <p>Current value: <pre class="text-white">{{ model }}</pre></p>
    </template>

  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'CheckboxField',

  mixins: [getRenderedClass],

  data () {
    return {
      test: null,
      model: ['Option 2', 'Option 5'],
      id: 'radio-field',
      name: 'radio-field',
      options: [
        { value: 'Option 1', text: 'Option 1' },
        { value: 'Option 2', text: 'Option 2' },
        { value: 'Option 3', text: 'Option 3' },
        { value: 'Option 4', text: 'Option 4' },
        { value: 'Option 5', text: 'Option 5' },
      ],
      newOption: '',
    }
  },

  methods: {
    addNewOption() {
      if (!this.newOption) {
        return
      }
      const option = { value: this.newOption, text: this.newOption }
      this.options.push(option)
      this.model.push(option.value)
      this.newOption = ''
    },
  }
}
</script>
