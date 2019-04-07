<template>
  <input-demo>
    <t-button
      ref="input"
      :disabled="disabled"
      :id="id"
      :name="name"
      :status="status"
      :size="size"
    >{{ label }}</t-button>

    <template slot="controls">
      <label class="">
        <input 
          v-model="disabled" 
          type="checkbox">
        <span>
          {{ disabled ? 'Enabled' : 'Disabled' }}
        </span>
      </label>

      <status-control v-model="status">Button status</status-control>

      <size-control v-model="size">Button size</size-control>
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
      label: 'Im a nice button',
      id: 't-button',
      name: 't-button',
    }
  }
}
</script>
