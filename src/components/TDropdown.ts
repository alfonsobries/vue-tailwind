import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';
import Key from '../types/Key';

const TDropdown = Component.extend({
  name: 'TDropdown',

  props: {
    text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    tagName: {
      type: String,
      default: 'div',
    },
    dropdownWrapperTagName: {
      type: String,
      default: 'div',
    },
    dropdownTagName: {
      type: String,
      default: 'div',
    },
    toggleOnFocus: {
      type: Boolean,
      default: false,
    },
    toggleOnClick: {
      type: Boolean,
      default: true,
    },
    toggleOnHover: {
      type: Boolean,
      default: false,
    },
    hideOnLeaveTimeout: {
      type: Number,
      default: 250,
    },
    show: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: Object,
      default() {
        return {
          button: 'p-3',
          wrapper: 'inline-flex flex-col',
          dropdownWrapper: 'relative z-10',
          dropdown: 'origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white',
          enterClass: '',
          enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
          enterToClass: 'transform opacity-100 scale-100',
          leaveClass: 'transition ease-in transform opacity-100 scale-100',
          leaveActiveClass: '',
          leaveToClass: 'transform opacity-0 scale-95 duration-75',
        };
      },
    },
  },

  data() {
    return {
      localShow: this.show,
      hasFocus: false as boolean,
      hideOnLeaveTimeoutHolder: null as ReturnType<typeof setTimeout> | null,
    };
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },

  watch: {
    show(show): void {
      this.localShow = show;
    },
    localShow(localShow): void {
      this.$emit('update:show', localShow);
      if (localShow) {
        this.$emit('shown');
      } else {
        this.$emit('hidden');
      }
    },
  },

  methods: {
    render(createElement: CreateElement) {
      const defaultSlot = this.$scopedSlots.default
        ? this.$scopedSlots.default({
          hide: this.doHide,
          show: this.doShow,
          toggle: this.doToggle,
          blurHandler: this.blurHandler,
        }) : null;

      const triggerSlot = this.$scopedSlots.trigger
        ? this.$scopedSlots.trigger({
          isShown: this.localShow,
          hide: this.doHide,
          hideIfFocusOutside: this.hideIfFocusOutside,
          show: this.doShow,
          toggle: this.doToggle,
          mousedownHandler: this.mousedownHandler,
          focusHandler: this.focusHandler,
          blurHandler: this.blurHandler,
          keydownHandler: this.keydownHandler,
          disabled: this.disabled,
        }) : createElement(
          'button',
          {
            ref: 'button',
            attrs: {
              type: 'button',
              disabled: this.disabled,
            },
            class: this.getElementCssClass('button'),
            on: {
              keydown: this.keydownHandler,
              mousedown: this.mousedownHandler,
              focus: this.focusHandler,
              blur: this.blurHandler,
            },
          },
          this.$slots.button || this.text,
        );

      const subElements = [
        triggerSlot,
        createElement(
          'transition',
          {
            props: {
              enterClass: this.getElementCssClass('enterClass'),
              enterActiveClass: this.getElementCssClass('enterActiveClass'),
              enterToClass: this.getElementCssClass('enterToClass'),
              leaveClass: this.getElementCssClass('leaveClass'),
              leaveActiveClass: this.getElementCssClass('leaveActiveClass'),
              leaveToClass: this.getElementCssClass('leaveToClass'),
            },
          },
          this.localShow ? [
            createElement(this.dropdownWrapperTagName, {
              ref: 'dropdownWrapper',
              class: this.getElementCssClass('dropdownWrapper'),
              attrs: {
                tabindex: -1,
              },
              on: {
                focus: this.focusHandler,
                blur: this.blurHandler,
              },
            }, [
              createElement(this.dropdownTagName, {
                ref: 'dropdown',
                class: this.getElementCssClass('dropdown'),
              },
              defaultSlot),
            ]),
          ] : undefined,
        ),
      ];

      return createElement(this.tagName, {
        ref: 'wrapper',
        class: this.getElementCssClass('wrapper'),
        on: {
          mouseover: this.mouseoverHandler,
          mouseleave: this.mouseleaveHandler,
        },
      }, subElements);
    },
    blurEventTargetIsChild(e: FocusEvent): boolean {
      const blurredElement = e.relatedTarget as HTMLElement;

      if (blurredElement) {
        const wrapper = this.$refs.wrapper as HTMLDivElement;
        return wrapper.contains(blurredElement);
      }

      return false;
    },
    focusEventTargetIsChild(e: FocusEvent): boolean {
      const focusedElement = e.target as HTMLElement;

      if (focusedElement) {
        const wrapper = this.$refs.wrapper as HTMLDivElement;
        return wrapper.contains(focusedElement);
      }

      return false;
    },
    escapeHandler() {
      this.doHide();
    },
    mousedownHandler() {
      if (this.toggleOnClick) {
        this.doToggle();
      }
    },
    focusHandler(e: FocusEvent) {
      if (!this.hasFocus && this.focusEventTargetIsChild(e)) {
        this.hasFocus = true;
        this.$emit('focus', e);
      }

      if (this.toggleOnFocus) {
        this.doShow();
      }
    },
    blurHandler(e: FocusEvent) {
      if (this.hasFocus && !this.blurEventTargetIsChild(e)) {
        this.hasFocus = false;
        this.$emit('blur', e);
      }

      if (this.toggleOnFocus || this.toggleOnClick) {
        this.hideIfFocusOutside(e);
      }
    },
    keydownHandler(e: KeyboardEvent) {
      if ([Key.ENTER, Key.SPACE].includes(e.keyCode)) {
        this.mousedownHandler();
      } else if (e.keyCode === Key.ESC) {
        this.escapeHandler();
      }
    },
    mouseleaveHandler() {
      if (!this.toggleOnHover) {
        return;
      }

      if (!this.hideOnLeaveTimeout) {
        this.doHide();
        return;
      }

      this.hideOnLeaveTimeoutHolder = setTimeout(() => {
        this.doHide();
        this.hideOnLeaveTimeoutHolder = null;
      }, this.hideOnLeaveTimeout);
    },
    mouseoverHandler() {
      if (!this.toggleOnHover) {
        return;
      }

      if (this.hideOnLeaveTimeout && this.hideOnLeaveTimeoutHolder) {
        clearTimeout(this.hideOnLeaveTimeoutHolder);
        this.hideOnLeaveTimeoutHolder = null;
      }

      this.doShow();
    },
    doHide() {
      this.localShow = false;
    },
    hideIfFocusOutside(e: FocusEvent) {
      if (!(e instanceof Event)) {
        throw new Error('the method hideIfFocusOutside expects an instance of `Event` as parameter');
      }

      if (!this.blurEventTargetIsChild(e)) {
        this.doHide();
      }
    },
    doShow() {
      this.localShow = true;
    },
    doToggle() {
      if (this.localShow) {
        this.doHide();
      } else {
        this.doShow();
      }
    },
    blur() {
      const el = this.$refs.button as HTMLButtonElement;
      el.blur();
    },
    focus(options?: FocusOptions | undefined) {
      const el = this.$refs.button as HTMLButtonElement;
      el.focus(options);
    },
  },
});

export default TDropdown;
