<template>
  <input-demo>
    <t-alert
      ref="input"
      :variant="variant"
      :show.sync="show"
    >
      {{ body }}
    </t-alert>

    <template slot="controls">
      <label class="flex items-center">
        <input 
          v-model="show" 
          type="checkbox"
        >
        <span class="ml-2 text-xs uppercase font-bold text-gray-600">
          Show
        </span>
      </label>

      <variant-control
        v-model="variant"
        class="mt-2"
        :options="options"
      >
        Alert variant
      </variant-control>
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
  name: 'AlertPlayground',

  mixins: [getRenderedClass],

  data () {
    return {
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed sit sint, aliquam tenetur aut doloribus eos, eligendi suscipit.',
      show: true,
      options: [
        { value: null, text: 'Default' },
        { value: 'success', text: 'Success' },
        { value: 'warning', text: 'Warning' },
        { value: 'danger', text: 'Danger' },
      ]
    }
  },

  watch: {
    variant () {
      this.show = true
    }
  }
}
</script>
