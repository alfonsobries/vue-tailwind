<template>
  <input-demo>
    <t-file-input
      v-model="model"
      name="file-input-form"
      ref="input"
      :size="size"
      :disabled="disabled"
      :variant="status"
    />

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <size-control v-model="size" class="mt-2" />

      <div class="mt-2">
        <label class="text-xs uppercase font-bold text-gray-600">Field Variant :</label>
        <t-radio-group
          v-model="status"
          :options="options"
          option-class="py-0"
        />
      </div>
    </template>

    <template slot="value">
      <p>Current value:
        <pre class="text-white">{{ model && model.length ? `${model[0]} : ${model[0].name} - ${model[0].size} bytes` : 'No File' }}</pre>
      </p>
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
  name: 'FileInput',

  mixins: [getRenderedClass],

  data () {
    return {
      model: null,
      size: null,
      disabled: null,
      status: null,
      id: 'file-input',
      name: 'file-input',
      placeholder: 'Nice placeholder',
      options: [
        { value: null, text: 'Default' },
        { value: 'primary', text: 'Primary' },
        { value: 'secondary', text: 'Secondary' },
        { value: 'tertiary', text: 'Tertiary' },
        { value: 'success', text: 'Success' },
        { value: 'warning', text: 'Warning' },
        { value: 'danger', text: 'Danger' },
      ]
    }
  }
}
</script>
