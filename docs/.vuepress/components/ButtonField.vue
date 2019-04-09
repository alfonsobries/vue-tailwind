<template>
  <input-demo>
    <t-button
      ref="input"
      :disabled="disabled"
      :id="id"
      :name="name"
      :size="size"
      :variant="variant"
    >{{ label }}</t-button>

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <size-control v-model="size">Button size</size-control>
      
      <variant-control
        v-model="variant"
        :options="options"
      >Button variant</variant-control>
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
  name: 'TextInput',

  mixins: [getRenderedClass],

  data () {
    return {
      label: 'Im a nice button',
      id: 't-button',
      name: 't-button',
      options: [
        { value: undefined, text: 'Default' },
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
