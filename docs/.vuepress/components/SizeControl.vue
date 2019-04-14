<template>
  <p>
    <span class="text-xs uppercase font-bold text-grey-dark">
      <slot>Field size:</slot>
    </span>

    <t-radio
      :name="name"
      v-model="currentValue"
      :options="options"
    />
  </p>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'field-size'
    },
    value: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => [
        { value: null, text: 'Default size' },
        { value: 'sm', text: 'Small' },
        { value: 'lg', text: 'Large' },
      ]
    }
  },

  data () {
    return {
      currentValue: this.value
    }
  },

  watch: {
    currentValue(currentValue) {
      this.$emit('input', currentValue)
    },
    value(value) {
      this.currentValue = value
    }
  }
}
</script>