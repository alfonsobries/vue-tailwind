<template>
  <input-demo>
    <t-input-group ref="input" label="E-mail">
      <t-input
        value="I love vuejs 😎"
      />
    </t-input-group>
    <t-input-group label="Password" :feedback="submited ? feedback : null" :description="description" :status="status">
      <t-input
        value="password"
        type="password"
        @input="status = null"
      />
    </t-input-group>

    <t-input-group>
      <t-button
        type="submit"
        variant="primary"
        @click="onSubmit"
      >Submit</t-button>
    </t-input-group>

    <template slot="controls">
      <status-control v-model="status" class="mt-2">Password group status</status-control>
      
      <p class="mt-2">
        <label 
          for="rows" 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Description:
        </label>

        <t-input
          size="sm"
          id="description"
          v-model="description"
          name="description"
          default-class="p-1 border text-sm"
        />
      </p>

      <p class="mt-2">
        <label 
          for="rows" 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Feedback (Press submit):
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
      submited: false,
      description: 'Password must be at least 6 characters long',
      feedback: 'You used that password before',
    }
  },

  methods: {
    async onSubmit() {
      this.status = false
      await this.$nextTick()
      this.submited = true
    },
  },

  watch: {
    status () {
      this.submited = false
    }
  }
}
</script>
