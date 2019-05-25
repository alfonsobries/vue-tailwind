<template>
  <div>
    <input-demo>
      <label
        for="single-checkbox"
        class="flex py-1 items-center"
      >
        <t-checkbox
          ref="input"
          v-model="singleModel"
          :disabled="singleDisabled"
          :value="checkedValue"
          :checked.sync="checked"
          :unchecked-value="unCheckedValue"
          :indeterminate.sync="indeterminate"
          id="single-checkbox"
          name="single-checkbox"
        />
        <span class="ml-3">Accept</span>
      </label>

      <template slot="controls">
        <disabled-control v-model="singleDisabled" />

        <label class="flex items-center mt-2">
          <input 
            v-model="indeterminate" 
            type="checkbox"
          >
          <span class="ml-2 text-xs uppercase font-bold text-gray-600">
            Indeterminate
          </span>
        </label>

        <label class="flex items-center mt-2">
          <input 
            v-model="checked" 
            type="checkbox"
          >
          <span class="ml-2 text-xs uppercase font-bold text-gray-600">
            Checked
          </span>
        </label>

        <p class="flex items-center mt-2">
          <label 
            for="rows" 
            class="mr-2 text-xs uppercase font-bold text-gray-600">
            Checked Value:
          </label>
          <t-input
            id="checkedValue"
            v-model.number="checkedValue"
            name="checkedValue"
            default-class="p-1 border text-sm"
          />
        </p>

        <p class="flex items-center mt-2">
          <label 
            for="rows" 
            class="mr-2 text-xs uppercase font-bold text-gray-600">
            Unchecked value:
          </label>
          <t-input
            id="unCheckedValue"
            v-model.number="unCheckedValue"
            name="unCheckedValue"
            default-class="p-1 border text-sm"
          />
        </p>
      </template>

      <template slot="value">
        <p>Current value: <pre class="text-white">{{ singleModel }}</pre></p>
      </template>
    </input-demo>

    <input-demo>
      <label
        v-for="(option, index) in options"
        :for="`${id}-${index}`"
        class="flex py-1 items-center"
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
  </div>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'CheckboxField',

  mixins: [getRenderedClass],

  data () {
    return {
      model: ['Option 2', 'Option 3', 'Option 5'],
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
      
      singleModel: 'accepted',
      checkedValue: 'accepted',
      unCheckedValue: 'not_accepted',
      indeterminate: false,
      checked: true,
      singleDisabled: false,
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
