<template>
  <popper
    ref="popper"
    :key="rerenderKey"
    :tag-name="tagName"
    :class="currentClass"
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
    @created="$emit('created', $event)"
    @show="onShow($event)"
    @hide="onHide($event)"
    @document-click="$emit('document-click', $event)"
  >
    <div
      ref="dropdown"
      :class="dropdownClass"
      @click="dropdownClick"
    >
      <slot />
    </div>

    <t-button 
      ref="button"
      slot="reference"
      :disabled="disabled"
      :variant="variant"
      :active="shown"
      :size="size"
      :tag-name="buttonTagName"
      v-bind="buttonProps"
      @click="$emit('click', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
      <slot 
        :shown="shown" 
        name="button-content"
      >
        {{ text }}
      </slot>
      <svg 
        v-if="visibleArrow"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        class="ml-1 h-5 w-5 fill-current text-gray-700"
      >
        <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z" />
      </svg>
    </t-button>
  </popper>
</template>

<script>
import Popper from 'vue-popperjs';
import TButton from '../elements/TButton';
import TDropdownTheme from '../themes/default/TDropdown'

const {
  baseClass,
  dropdownClass,
  disabledClass,
} = TDropdownTheme

export default {
  name: 'TDropdown',

  components: {
    Popper,
    TButton
  },

  props: {
    tagName: {
      type: String,
      default: 'div'
    },
    buttonTagName: {
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
    closeOnDropdownClick: {
      type: Boolean,
      default: true
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    dropdownClass: {
      type: [String, Object, Array],
      default: dropdownClass
    },
    disabledClass: {
      type: [String, Object, Array],
      default: disabledClass
    },
    buttonProps: {
      type: Object,
      default: () => {}
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
    },
    /**
     * The default classes for the button
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${ this.size || 'default' }`,
      ]

      if (this.baseClass) {
        classes.push(this.baseClass)
      }
      
      if (this.disabled) {
        classes.push(`${this.$options._componentTag}-disabled`)
        if (this.disabledClass) {
          classes.push(this.disabledClass)
        }
      }

      return classes
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
    dropdownClick (e) {
      this.$emit('dropdown-click', e)
      
      if (this.closeOnDropdownClick && this.$refs.popper) {
        this.$refs.popper.doClose()
      }
    },

    onShow (e) {
      this.shown = true
      this.$emit('show', e)
    },

    onHide (e) {
      this.shown = false
      this.$emit('show', e)
    },
    /**
     * Change the key forces to the component to re-render
     * @TODO Make a PR in the vue-popper package for reset the values
     */
    async resetPopper () {
      this.rerenderKey++
    }
  }
}
</script>
