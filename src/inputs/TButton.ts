import { CreateElement, VNode } from 'vue';
import HtmlInput from '@/base/HtmlInput';

const TButton = HtmlInput.extend({
  name: 'TButton',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    tagName: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'a'].indexOf(value) !== -1;
      },
    },
    type: {
      type: String,
      default: undefined,
    },
    href: {
      type: String,
      default: null,
    },
    max: {
      type: [String, Number],
      default: undefined,
    },
    min: {
      type: [String, Number],
      default: undefined,
    },
    method: {
      type: String,
      default: undefined,
    },
    data: {
      type: Object,
      default: undefined,
    },
    preserveState: {
      type: Boolean,
      default: false,
    },
    preserveScroll: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [String, Object],
      default: undefined,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    activeClass: {
      type: String,
      default: 'router-link-active',
    },
    exact: {
      type: Boolean,
      default: false,
    },
    exactActiveClass: {
      type: String,
      default: 'router-link-exact-active',
    },
  },
  computed: {
    isInertiaLinkComponentAvailable(): boolean {
      return !!(this.$options.components
        && this.$options.components.InertiaLink);
    },

    isRouterLinkComponentAvailable(): boolean {
      return !!(this.$options.components
          && (this.$options.components.RouterLink || this.$options.components.NuxtLink));
    },

    /**
     * If we have the `to` defined and the routerLink or Nuxt link component is
     * available we can use it to create a router link
     *
     * @return {Boolean}
     */
    isARouterLink(): boolean {
      return this.to !== undefined && this.isRouterLinkComponentAvailable;
    },
    /**
     * If we have the `href` defined and the InertiaLink component is available
     * we can use it to create an interia link
     *
     * @return {Boolean}
     */
    isAnIntertiaLink(): boolean {
      return this.href !== undefined && this.isInertiaLinkComponentAvailable;
    },
    /**
     * The component to render according to the props
     * @return {String}
     */
    componentToRender() {
      if (this.isARouterLink && this.$options.components) {
        return this.$options.components.NuxtLink || this.$options.components.RouterLink;
      }
      if (this.isAnIntertiaLink) {
        return this.$options.components && this.$options.components.InertiaLink;
      }
      if (this.href) {
        return 'a';
      }
      return this.tagName;
    },
  },
  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },
  methods: {
    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },
    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },
    clickHandler(e: MouseEvent) {
      this.$emit('click', e);
    },
    keydownHandler(e: MouseEvent) {
      this.$emit('keydown', e);
    },
    mousedownHandler(e: MouseEvent) {
      this.$emit('mousedown', e);
    },
    blur() {
      (this.$el as HTMLButtonElement).blur();
    },
    focus() {
      (this.$el as HTMLButtonElement).focus();
    },

    inertiaLinkAttributes() {
      return {
        href: this.href,
        method: this.method,
        data: this.data,
        preserveState: this.preserveState,
        preserveScroll: this.preserveScroll,
        id: this.id,
        value: this.value,
        autofocus: this.autofocus,
        disabled: this.disabled,
        name: this.name,
        type: this.type,
      };
    },

    routerLinkAttributes() {
      return {
        to: this.to,
        replace: this.replace,
        append: this.append,
        tag: this.tagName,
        activeClass: this.activeClass,
        exact: this.exact,
        event: ['click', 'focus', 'blur'],
        exactActiveClass: this.exactActiveClass,
        id: this.id,
        value: this.value,
        autofocus: this.autofocus,
        disabled: this.disabled,
        name: this.name,
        type: this.type,
      };
    },

    /**
     * Attrs according to the button type
     * @return {Object}
     */
    getAttributes() {
      if (this.isAnIntertiaLink) {
        return this.inertiaLinkAttributes();
      }
      if (this.isARouterLink) {
        return this.routerLinkAttributes();
      }

      return {
        id: this.id,
        value: this.value,
        autofocus: this.autofocus,
        disabled: this.disabled,
        name: this.name,
        href: this.href,
        type: this.type,
      };
    },

    render(createElement: CreateElement): VNode {
      return createElement(
        this.componentToRender,
        {
          attrs: this.getAttributes(),
          class: this.componentClass,
          on: {
            click: this.clickHandler,
            focus: this.focusHandler,
            blur: this.blurHandler,
            keydown: this.keydownHandler,
            mousedown: this.mousedownHandler,
          },
        },
        this.$slots.default,
      );
    },
  },

});

export default TButton;
