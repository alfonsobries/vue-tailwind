<template>
  <div
    id="app"
    class="flex flex-col max-w-lg mx-auto p-5"
  >
    <select
      id=""
      v-model="variant"
      name="variant"
      class="p-3 h-6"
    >
      <option
        v-for="variant in variants"
        :key="variant"
        :value="variant"
      >
        {{ variant }}
      </option>
    </select>
    <t-input
      v-model="model"
      :classes="classes"
      :variant="variant"
    />
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TInput from './components/TInput.vue';

@Component({
  components: {
    TInput,
  },
})
export default class App extends Vue {
  model? = ''

  variant = 'default'

  variants = ['default', 'error']

  classes = {
    default: 'border block rounded bg-white p-3',
    error: 'border block rounded bg-red-500 text-white p-3',
  }
}
</script>
