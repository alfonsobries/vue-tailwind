<template>
  <p>
    <span class="text-xs uppercase font-bold text-gray-600">
      <slot>Placement:</slot>
    </span>

    <t-radio-group
      name="placement"
      v-model="currentValue"
      :options="options"
      option-class="flex items-center"
    />
  </p>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    },
    options: {
      type: Array,
      required: true
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