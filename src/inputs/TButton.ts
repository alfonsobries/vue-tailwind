import { CreateElement, VNode } from 'vue';
import HtmlInput from '../base/HtmlInput';

const TButton = HtmlInput.extend({
  name: 'TButton',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    text: {
      type: String,
      default: undefined,
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
    to: {
      type: [String, Object],
      default: undefined,
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
    event: {
      type: [String, Array],
      default: 'click',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    method: {
      type: String,
      default: 'get',
    },
    replace: {
      type: Boolean,
      default: false,
    },
    preserveScroll: {
      type: Boolean,
      default: false,
    },
    preserveState: {
      type: Boolean,
      default: false,
    },
    only: {
      type: Array,
      default: () => [],
    },
    native: {
      type: Boolean,
      default: false,
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
      return this.to !== undefined
        && this.isRouterLinkComponentAvailable
        && !this.native;
    },
    /**
     * If we have the `href` defined and the InertiaLink component is available
     * we can use it to create an inertia link
     *
     * @return {Boolean}
     */
    isAnIntertiaLink(): boolean {
      return this.href !== null
        && this.tagName === 'a'
        && this.isInertiaLinkComponentAvailable
        && !this.native;
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
        return this.$options.components?.InertiaLink;
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
        data: this.data,
        href: this.href,
        method: this.method,
        replace: this.replace,
        preserveScroll: this.preserveScroll,
        preserveState: this.preserveState,
        only: this.only,
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
        event: this.event,
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
        this.text === undefined ? this.$slots.default : this.text,
      );
    },
  },

});

export default TButton;
