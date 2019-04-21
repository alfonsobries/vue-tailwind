<template>
  <input-demo>
    <t-textarea
      ref="input"
      v-model="model"
      :disabled="disabled"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :rows="6"
      :status="status"
      :size="size"
    />

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <status-control class="mt-2" v-model="status" />

      <size-control class="mt-2" v-model="size" />
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
  name: 'TextAreaField',
  
  mixins: [getRenderedClass],

  data () {
    return {
      model: `Vuejs is awesome

^ Right?`,
      id: 'text-field',
      name: 'text-field',
      placeholder: 'Nice placeholder',
    }
  }
}
</script>
