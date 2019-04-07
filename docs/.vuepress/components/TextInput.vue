<template>
  <input-demo>
    <t-input
      ref="input"
      v-model="model"
      :disabled="disabled"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :status="status"
      :size="size"
    />

    <template slot="controls">
      <label class="">
        <input 
          v-model="disabled" 
          type="checkbox">
        <span>
          {{ disabled ? 'Enabled' : 'Disabled' }}
        </span>
      </label>
      
      <status-control v-model="status" />
      
      <size-control v-model="size" />
    </template>

    <template slot="value">
      <p>Current value: <pre class="text-white">{{ model }}</pre></p>
    </template>

    <template slot="classes">
      <p>Rendered class: 
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
      model: 'I love vuejs 😎',
      id: 'text-input',
      name: 'text-input',
      placeholder: 'Nice placeholder',
    }
  },
}
</script>
