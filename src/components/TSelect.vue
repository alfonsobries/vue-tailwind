<template>
  <div
    ref="select-wrapper"
    :class="wrapperClass"
  >
    <select
      :id="id"
      ref="select"
      v-model="localValue"
      :autofocus="autofocus"
      :disabled="disabled"
      :name="name"
      :required="required"
      :multiple="multiple"
      :class="inputClass"
      @blur="onBlur"
      @focus="onFocus"
    >
      <template v-for="(option, index) in normalizedOptionsWithPlaceholder">
        <optgroup
          v-if="option.children"
          :key="`${option.value}-optgroup-${index}`"
          :value="option.value"
          :label="option.text"
        >
          <option
            v-for="(childOption, index2) in option.children"
            :key="`${childOption.value}-${index}-${index2}`"
            :value="childOption.value"
            v-text="childOption.text"
          />
        </optgroup>
        <option
          v-else
          :key="`${option.value}-${index}`"
          :value="option.value"
          v-text="option.text"
        />
      </template>
    </select>
    <div
      v-if="!multiple"
      :class="arrowWrapperClass"
    >
      <slot name="arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          :class="arrowClass"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import TSelect from '../inputs/Select';

export default TSelect;
</script>
