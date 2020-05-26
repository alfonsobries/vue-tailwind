// <template>
//   <transition :name="transition">
//     <div
//       v-if="localShow"
//       ref="modal"
//       :class="baseClass"
//       tabindex="0"
//       @keydown.esc="escClick"
//     >
//       <div
//         ref="container"
//         :style="containerStyle"
//         :class="containerClass"
//       >
//         <div
//           :style="{ minHeight: normalizedHeight }"
//           :class="wrapperClass"
//         >
//           <button
//             v-if="!hideCloseButton"
//             ref="close"
//             :class="closeIconClass"
//             @click="hide"
//           >
//             <slot name="close">
//               <svg
//                 role="button"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//               >
//                 <title>close</title>
//                 <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
//             </slot>
//           </button>

//           <div
//             v-if="hasHeaderSlot"
//             ref="header"
//             :class="headerClass"
//           >
//             <slot name="header" />
//           </div>
//           <div
//             v-else-if="header"
//             ref="header"
//             :class="headerClass"
//             v-text="header"
//           />
//           <div
//             ref="body"
//             :class="bodyClass"
//           >
//             <slot />
//           </div>
//           <div
//             v-if="hasFooterSlot"
//             ref="footer"
//             :class="footerClass"
//           >
//             <slot name="footer" />
//           </div>
//         </div>
//       </div>
//       <div
//         :class="overlayClass"
//         @click="outsideClick"
//       />
//     </div>
//   </transition>
// </template>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Component from '@/base/Component';
import { CreateElement, VNode } from 'vue';

const TModal = Component.extend({
  name: 'TModal',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: undefined,
    },
    footer: {
      type: String,
      default: undefined,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    escToClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [String, Number],
      default: 600,
    },
    height: {
      type: [String, Number],
      default: 300,
    },
    pivotY: {
      type: Number,
      default: 0.1,
    },
    hideCloseButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localShow: this.value,
      marginTop: null,
      windowResizeListener: null,
      params: [],
    };
  },

  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    containerStyle() {
      return {
        width: this.normalizedWidth,
        marginTop: this.marginTop,
      };
    },
    normalizedWidth() {
      if (!Number.isNaN(this.width)) {
        return `${this.width}px`;
      }

      return this.width;
    },
    normalizedHeight() {
      if (!Number.isNaN(this.height)) {
        return `${this.height}px`;
      }

      return this.height;
    },
  },

  watch: {
    value(value) {
      this.localShow = value;
    },
    async localShow(shown) {
      this.$emit('input', shown);
      this.$emit('change', shown);

      if (shown) {
        this.beforeOpen();
        await this.$nextTick();
        this.opened();
      } else {
        this.beforeClose();
        await this.$nextTick();
        this.closed();
      }
    },
  },

  mounted() {
    if (this.localShow) {
      this.prepareDomForModal();
    }
    if (window) {
      window.onresize = () => {
        if (this.localShow) {
          this.calculateMarginTop();
        }
      };
    }
  },

  beforeDestroy() {
    enableBodyScroll(this.$refs.modal);
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;

    return renderFun(createElement);
  },

  methods: {
    render(createElement: CreateElement) {
      if (!this.localShow) {
        return createElement();
      }

      return createElement(
        this.tagName,
        {
          class: this.getElementCssClass('wrapper'),
        },
        this.renderChilds(createElement),
      );
    },
    renderChilds(createElement: CreateElement) {
      const childs = [];

      if (!!this.$slots.header || this.header !== undefined) {
        childs.push(createElement(
          'div',
          {
            ref: 'header',
            class: this.getElementCssClass('header'),
          },
          this.$slots.header || this.header,
        ));
      }

      childs.push(createElement(
        'div',
        {
          ref: 'body',
          class: this.getElementCssClass('body'),
        },
        this.$slots.default,
      ));

      if (!!this.$slots.footer || this.footer !== undefined) {
        childs.push(createElement(
          'div',
          {
            ref: 'footer',
            class: this.getElementCssClass('footer'),
          },
          this.$slots.footer || this.footer,
        ));
      }

      return childs;
    },

    calculateMarginTop() {
      const { container } = this.$refs;
      if (!window || !container) {
        return;
      }
      const paddingTop = parseInt(window.getComputedStyle(container).getPropertyValue('padding-top'), 10);
      const paddingBottom = parseInt(window.getComputedStyle(container).getPropertyValue('padding-bottom'), 10);
      const modalHeight = container.clientHeight;
      const viewportHeight = document.documentElement.clientHeight;
      const adjustement = paddingBottom - paddingTop;
      const marginTop = (viewportHeight - modalHeight + adjustement) * this.pivotY;
      this.marginTop = marginTop > 0 ? `${marginTop}px` : null;
    },
    beforeOpen() {
      this.$emit('before-open', { params: this.params });
    },
    opened() {
      this.$emit('opened', { params: this.params });
      this.prepareDomForModal();
    },
    beforeClose() {
      enableBodyScroll(this.$refs.modal);
      this.$emit('before-close');
    },
    closed() {
      this.$emit('closed');
    },
    prepareDomForModal() {
      disableBodyScroll(this.$refs.modal, {
        reserveScrollBarGap: true,
      });
      this.calculateMarginTop();
      if (this.$refs.modal) {
        this.$refs.modal.focus();
      }
    },
    hide() {
      this.localShow = false;
    },
    show() {
      this.localShow = true;
    },
    outsideClick() {
      if (this.clickToClose) {
        this.hide();
      }
    },
    escClick() {
      if (this.escToClose) {
        this.hide();
      }
    },
  },
});

export default TModal;
