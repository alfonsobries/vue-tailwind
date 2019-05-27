<template>
  <input-demo>
    <t-dropdown
      ref="dropdown"
      :placement="`${placement}${placementVariant}`"
    >
      <template v-slot:button-content>
        Im a <strong>&nbsp;{{ placement }}{{ placementVariant }}&nbsp;</strong> dropdown
      </template>
      <ul>
        <li>
          <a 
            href="#" 
            class="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
        >My orders</a></li>
        <li>
          <a 
            href="#" 
            class="block px-4 py-2 hover:bg-indigo-500 hover:text-white">Account settings</a>
        </li>
        <li><a 
          href="#" 
          class="block px-4 py-2 hover:bg-indigo-500 hover:text-white">Sign out</a></li>
      </ul>
    </t-dropdown>

    <template slot="controls">
      <!-- <disabled-control v-model="disabled" />

      <size-control class="mt-2" v-model="size">Button size</size-control> -->
      
      <placement-control
        v-model="placement"
        :options="placementOptions"
        class="mt-2"
      />

      <p>
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

    <template slot="classes">
      <p>
        Rendered class: 
        <pre class="text-white">{{ renderedClass }}</pre>
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
      placement: 'auto',
      placementVariant: ''
      // label: 'Im a nice button',
      // id: 't-button',
      // name: 't-button',
      // options: [
      //   { value: null, text: 'Default' },
      //   { value: 'primary', text: 'Primary' },
      //   { value: 'secondary', text: 'Secondary' },
      //   { value: 'tertiary', text: 'Tertiary' },
      //   { value: 'success', text: 'Success' },
      //   { value: 'warning', text: 'Warning' },
      //   { value: 'danger', text: 'Danger' },
      // ]
    }
  },

  watch: {
    async placement() {
      await this.$nextTick();
      this.$refs.dropdown.$refs.popper.doShow()
    },
    async placementVariant() {
      await this.$nextTick();
      this.$refs.dropdown.$refs.popper.doShow()
    }
  }
}
</script>
