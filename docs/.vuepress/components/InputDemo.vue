<template>
  <div>
    <div class="flex">
      <div class="flex-1 m-2">
        <slot />
      </div>
      <div class="flex-1 m-2">
        <slot name="controls" />
      </div>
    </div>
    <div v-if="$slots['value']" class="m-2">
      <slot name="value" />
    </div>
    <div v-if="$slots['value']" class="m-2">
      <slot name="classes" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputDemo',
}
</script>
