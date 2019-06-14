<template>
  <input-demo>
    <t-dropdown
      ref="input"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      :placement="`${placement}${placementVariant}`"
    >
      <template v-slot:button-content>
        <span>Im a <strong>{{ placement }}{{ placementVariant }}</strong> dropdown</span>
      </template>
      <ul>
        <li>
          <a 
            href="http://www.google.com" 
            class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
          >My orders</a>
        </li>
        <li>
          <a 
            href="#" 
            class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
          >Account settings</a>
        </li>
        <li class="border-b"></li>
        <li>
          <a 
            href="#" 
            class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
          >Sign out</a>
        </li>
      </ul>
    </t-dropdown>

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <size-control class="mt-2" v-model="size">Button size</size-control>
      
      <variant-control
        class="mt-2"
        v-model="variant"
        :options="options"
      >Button variant</variant-control>

      <placement-control
        v-model="placement"
        :options="placementOptions"
        class="mt-2"
      />

      <p class="mt-2">
        <span class="text-xs uppercase font-bold text-gray-600">
          <slot>Placement variant:</slot>
        </span>

        <t-radio-group
          v-model="placementVariant"
          :options="[{ value: '', text: 'no variant'}, '-start', '-end']"
          name="placement-variant"
          option-class="flex items-center"
        />
      </p>
    </template>

    <template slot="classes" v-if="ready">
      <p>
        Rendered class: 
        <pre class="text-white">{{ $refs.input.currentClass }}</pre>
      </p>
      <p>
        Dropdown class: 
        <pre class="text-white">{{ $refs.input.dropdownClass }}</pre>
      </p>
    </template>
  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'DropdownComponent',

  mixins: [getRenderedClass],

  data () {
    return {
      placementOptions: [
        'auto', 'top', 'right', 'bottom', 'left'
      ],
      placement: 'bottom',
      placementVariant: '-start',
      options: [
        { value: null, text: 'Default' },
        { value: 'primary', text: 'Primary' },
        { value: 'secondary', text: 'Secondary' },
        { value: 'tertiary', text: 'Tertiary' },
        { value: 'success', text: 'Success' },
        { value: 'warning', text: 'Warning' },
        { value: 'danger', text: 'Danger' },
      ]
    }
  },

  watch: {
    async placement() {
      await this.$nextTick();
      this.$refs.input.$refs.popper.doShow()
    },
    async placementVariant() {
      await this.$nextTick();
      this.$refs.input.$refs.popper.doShow()
    }
  }
}
</script>
