<template>
  <div>
    <span class="text-xs uppercase font-bold text-gray-600">
      <slot>Field status:</slot>
    </span>

    <t-radio-group
      :name="name"
      v-model="currentValue"
      :options="options"
      option-class="flex items-center"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'field-status'
    },
    value: {
      type: [Boolean, String],
      default: null
    },
    options: {
      type: Array,
      default: () => [
        { value: null, text: 'No status' },
        { value: true, text: 'Success' },
        { value: false, text: 'Danger' },
        { value: 'warning', text: 'Warning' },
      ]
    }
  },

  data () {
    return {
      currentValue: this.value,
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