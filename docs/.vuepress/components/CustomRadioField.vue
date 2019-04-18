<template>
  <input-demo>
    <div
      v-for="(option, index) in options"
      class="flex py-1"
    >
      <t-radio
        ref="input"
        :key="option.value"
        :id="`${id}-${index}`"
        v-model="model"
        :disabled="disabled"
        :name="name"
        :value="option.value"
        :status="status"
        class="custom-radio"
      />
      <label class="ml-3" :for="`${id}-${index}`">{{ option.text }}</label>
    </div>

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <status-control v-model="status" />

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
  name: 'CustomRadioField',

  mixins: [getRenderedClass],

  data () {
    return {
      model: 'Option 2',
      id: 'custom-radio-field',
      name: 'custom-radio-field',
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
      this.newOption = ''
    },
  }
}
</script>

<style>
input.custom-radio:checked,
input.custom-radio:not(:checked) {
  position: absolute;
  left: -9999px;
}
input.custom-radio:checked + label,
input.custom-radio:not(:checked) + label
{
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  line-height: 26px;
  display: inline-block;
}
input.custom-radio:checked + label:before,
input.custom-radio:not(:checked) + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 26px;
  height: 26px;
  border: 1px solid #dae1e7;
  border-radius: 100%;
  background: #fff;
}
input.custom-radio:checked + label:after,
input.custom-radio:not(:checked) + label:after {
  content: '';
  width: 18px;
  height: 18px;
  background: #3490dc;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

input.custom-radio:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
input.custom-radio:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

input.custom-radio.t-radio-disabled + label:after {
  opacity: 0.5;
}

/** By status */
input.custom-radio.t-radio-status-error:checked + label:after,
input.custom-radio.t-radio-status-error:not(:checked) + label:after {
background: #e3342f;
}
input.custom-radio.t-radio-status-success:checked + label:after,
input.custom-radio.t-radio-status-success:not(:checked) + label:after {
background: #38c172;
}
input.custom-radio.t-radio-status-warning:checked + label:after,
input.custom-radio.t-radio-status-warning:not(:checked) + label:after {
background: #f2d024;
}
</style>
