<template>
  <div id="app">
    <t-text-field v-model="form.example" />
    <t-text-field v-model="form.example" />
  </div>
</template>

<script>
import TTextField from '@/components/TTextField'

export default {
  components: {
    TTextField
  },
  data () {
    return {
      form: {
        example: 'Hola'
      }
    }
  },
  name: 'app'
}
</script>
