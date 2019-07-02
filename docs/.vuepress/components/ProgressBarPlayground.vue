<template>
  <input-demo>
    <t-progress-bar
      v-model="model"
      :size="size"
      ref="input"
      class="rotate-90 transform-origin-tl"
    />

    <template slot="controls">
      <div>
        <span class="text-xs uppercase font-bold text-gray-600">
          Progress Bar value:
        </span>
        <t-input
          id="model"
          v-model="model"
          name="model"
          default-class="p-1 border text-sm"
          type="number"
          min="0"
          max="100"
        />
      </div>

      <size-control class="mt-2" v-model="size">Button size</size-control>

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
  name: 'ProgressBarPlayground',

  mixins: [getRenderedClass],

  data () {
    return {
      model: 50,
      id: 'progress-field',
      name: 'progress-field',
    }
  }
}
</script>
