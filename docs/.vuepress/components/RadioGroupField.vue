<template>
  <input-demo>
    <t-radio-group
      ref="input"
      v-model="model"
      :disabled="disabled"
      :id="id"
      :name="name"
      :options="options"
      :status="status"
      :size="size"
    />

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <status-control class="mt-2" v-model="status" />

      <size-control class="mt-2" v-model="size" />

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

    <template slot="classes">
      <p>
        Rendered class: 
        <pre class="text-white">{{ renderedClass }}</pre>
      </p>
    </template>
  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'RadioGroupField',

  mixins: [getRenderedClass],

  data () {
    return {
      model: 'Option 2',
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
      this.model = option.value
    },
  }
}
</script>
