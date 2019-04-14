<template>
  <input-demo>
    <t-radio
      ref="input"
      v-model="model"
      :disabled="disabled"
      :id="`${id}-2`"
      :name="`${name}-2`"
      :options="options"
      :status="status"
      :size="size"
      class="rich-radio"
    />

    <template slot="controls">
      <status-control class="mt-0" v-model="status" name="rich-radio" />
    </template>
  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'CustomRadioField',

  mixins: [getRenderedClass],

  data () {
    return {
      model: 'Option 1',
      id: 'rich-field',
      name: 'rich-field',
      options: [
        { value: 'Option 1', text: 'Option 1' },
        { value: 'Option 2', text: 'Option 2' },
        { value: 'Option 3', text: 'Option 3' },
      ],
      newOption: '',
    }
  },
}
</script>

<style>
.rich-radio input[type=radio]:checked,
.rich-radio input[type=radio]:not(:checked) {
    position: absolute;
    left: -9999px;
}
.rich-radio input[type=radio]:checked + label,
.rich-radio input[type=radio]:not(:checked) + label
{
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    line-height: 26px;
    display: inline-block;
}
.rich-radio input[type=radio]:checked + label:before,
.rich-radio input[type=radio]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 26px;
    height: 26px;
    border: 1px solid #dae1e7;
    border-radius: 100%;
    background: #fff;
}
.rich-radio input[type=radio]:checked + label:after,
.rich-radio input[type=radio]:not(:checked) + label:after {
    content: '';
    width: 18px;
    height: 18px;
    background: #3490dc;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}

.rich-radio input[type=radio]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
.rich-radio input[type=radio]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

/** By status */
.rich-radio.t-radio-status-error input[type=radio]:checked + label:after,
.rich-radio.t-radio-status-error input[type=radio]:not(:checked) + label:after {
  background: #e3342f;
}
.rich-radio.t-radio-status-success input[type=radio]:checked + label:after,
.rich-radio.t-radio-status-success input[type=radio]:not(:checked) + label:after {
  background: #38c172;
}
.rich-radio.t-radio-status-warning input[type=radio]:checked + label:after,
.rich-radio.t-radio-status-warning input[type=radio]:not(:checked) + label:after {
  background: #f2d024;
}
</style>
