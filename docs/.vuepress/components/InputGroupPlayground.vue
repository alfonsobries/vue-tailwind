<template>
  <input-demo>
    <t-input-group ref="input" label="E-mail" :status="status">
      <t-input
        value="I love vuejs 😎"
      />
    </t-input-group>
    <t-input-group label="Password" :feedback="feedback" :status="status">
      <t-input
        value="password"
        type="password"
      />
    </t-input-group>

    <t-input-group>
      <t-button
        type="submit"
        variant="primary"
      >Submit</t-button>
    </t-input-group>

    <template slot="controls">
      <status-control v-model="status" class="mt-2">Input group status</status-control>
      
      <p class="mt-3">
        <label 
          for="rows" 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Feedback:
        </label>

        <t-input
          size="sm"
          id="feedback"
          v-model="feedback"
          name="feedback"
          default-class="p-1 border text-sm"
        />
      </p>
    </template>
  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'InputGroupPlayground',

  mixins: [getRenderedClass],

  data () {
    return {
      feedback: 'Password must be at least 6 characters long',
    }
  },
}
</script>
