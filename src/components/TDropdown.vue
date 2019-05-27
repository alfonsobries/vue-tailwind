<template>
  <popper
    ref="popper"
    :key="rerenderKey"
    :class="wrapperClass"
    :options="allOptions"
    :trigger="trigger"
    :disabled="disabled"
    :delay-on-mouse-over="delayOnMouseOver"
    :delay-on-mouse-out="delayOnMouseOut"
    :append-to-body="appendToBody"
    :force-show="forceShow"
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    :transition="transition"
    :stop-propagation="stopPropagation"
    :prevent-default="preventDefault"
    :visible-arrow="false"
    @created="$emit('created')"
    @show="onShow"
    @hide="onHide"
    @document-click="$emit('document-click')"
  >
    <div :class="dropdownClass">
      <slot />
    </div>

    <t-button 
      slot="reference"
      :value="value"
      :type="type"
      :variant="variant"
      :active="shown"
      :size="size"
    >
      <slot name="button-content">
        {{ text }}
      </slot>
      <svg 
        v-if="visibleArrow"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        class="ml-1 h-5 w-5 fill-current text-gray-700">
        <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/>
      </svg>
    </t-button>
  </popper>
</template>

<script>
import { TDropdownTheme } from '../themes/default.js'
import Popper from 'vue-popperjs';
import TButton from '../elements/TButton';

const {
  wrapperClass,
  buttonClass,
  activeButtonClass,
  inactiveButtonClass,
  dropdownClass,
} = TDropdownTheme

export default {
  name: 'TDropdown',

  components: {
    Popper,
    TButton
  },

  props: {
    value: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return value === null || ['lg', 'sm'].indexOf(value) !== -1
      }
    },

    text: {
      type: String,
      default: ''
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: wrapperClass
    },
    buttonClass: {
      type: [String, Object, Array],
      default: buttonClass
    },
    activeButtonClass: {
      type: [String, Object, Array],
      default: buttonClass
    },
    inactiveButtonClass: {
      type: [String, Object, Array],
      default: buttonClass
    },
    dropdownClass: {
      type: [String, Object, Array],
      default: dropdownClass
    },
    disabled: {
      type: Boolean,
      default: false
    },
    delayOnMouseOver: {
      type: Number,
      default: 10
    },
    delayOnMouseOut: {
      type: Number,
      default: 10
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'auto'
    },
    options: {
      type: Object,
      default: () => {}
    },
    trigger: {
      type: String,
      default: 'click'
    },
    visibleArrow: {
      type: Boolean,
      default: true
    },
    forceShow: {
      type: Boolean,
      default: false
    },
    enterActiveClass: {
      type: String,
      default: null
    },
    leaveActiveClass: {
      type: String,
      default: null
    },
    transition: {
      type: String,
      default: ''
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    preventDefault: {
      type: Boolean,
      default: false
    },
  },

  data () {
    return {
      rerenderKey: 1,
      shown: false
    }
  },

  computed: {
    allOptions () {
      return {
        ...this.options,
        ...{
          placement: this.placement
        }
      }
    }
  },

  watch: {
    allOptions: {
      handler() {
        this.resetPopper();
      },
      deep: true
    },
  },

  methods: {
    onShow () {
      this.shown = true
      this.$emit('show')
    },
    onHide () {
      this.shown = false
      this.$emit('show')
    },
    /**
     * Change the key forces to the component to re-render
     * @todo Make a PR in the vue-popper package for reset the values
     */
    async resetPopper () {
      this.rerenderKey++
    }
  }
}
</script>
