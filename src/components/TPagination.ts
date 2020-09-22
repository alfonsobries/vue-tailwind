
import range from 'lodash/range';
import { CreateElement, VNode, VNodeChildren } from 'vue';
import Component from '../base/Component';
import CssClass from '../types/CssClass';

type ClickHandler = () => void
const TPagination = Component.extend({
  name: 'TPagination',

  props: {
    value: {
      type: Number,
      default: null,
    },
    tagName: {
      type: String,
      default: 'ul',
    },
    elementTagName: {
      type: String,
      default: 'li',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    perPage: {
      type: Number,
      default: 20,
      validator: (value) => value > 0,
    },
    totalItems: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0,
    },
    limit: {
      type: Number,
      default: 5,
      validator: (value) => value >= 0,
    },
    prevLabel: {
      type: String,
      default: '&lsaquo;',
    },
    nextLabel: {
      type: String,
      default: '&rsaquo;',
    },
    firstLabel: {
      type: String,
      default: '&laquo;',
    },
    lastLabel: {
      type: String,
      default: '&raquo;',
    },
    ellipsisLabel: {
      type: String,
      default: '&hellip;',
    },
    hideFirstLastControls: {
      type: Boolean,
      default: false,
    },
    hidePrevNextControls: {
      type: Boolean,
      default: false,
    },
    hideEllipsis: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: Object,
      default() {
        return {
          wrapper: 'table border-collapse text-center bg-white mx-auto mt-2',
          element: 'w-8 h-8 border table-cell',
          disabledElement: 'w-8 h-8 border table-cell',
          ellipsisElement: 'w-8 h-8 border hidden md:table-cell',
          activeButton: 'bg-gray-300 w-full h-full',
          disabledButton: 'opacity-25 w-full h-full cursor-not-allowed',
          button: 'hover:bg-gray-200 w-full h-full',
          ellipsis: '',
        };
      },
    },
  },

  render(createElement: CreateElement) {
    const createComponentFunc: (createElement: CreateElement) => VNode = this.createComponent;
    return createComponentFunc(createElement);
  },

  data() {
    return {
      currentPage: this.value as number | null,
    };
  },

  computed: {
    totalPages(): number {
      if (this.perPage <= 0) {
        return 0;
      }

      return Math.ceil(this.totalItems / this.perPage);
    },

    pageButtons(): string[] {
      const from1 = Number(this.currentPage) - Math.round(this.limit as number / 2) + 1;
      const from2 = (this.totalPages as number) + 1 - (this.limit as number);
      const from = Math.max(
        Math.min(from1, from2),
        1,
      );

      const to = Math.min(from + this.limit - 1, this.totalPages);

      return range(from, to + 1).map((page) => {
        if (!this.hideEllipsis && page === from && from > 1) {
          return 'less';
        }

        if (!this.hideEllipsis && page === to && to < this.totalPages) {
          return 'more';
        }

        return String(page);
      });
    },

    prevIsDisabled(): boolean {
      return this.disabled || this.currentPage === null || this.currentPage <= 1;
    },

    nextIsDisabled(): boolean {
      return this.disabled || this.currentPage === null || this.currentPage >= this.totalPages;
    },
  },

  watch: {
    value(value: number | null): void {
      this.currentPage = value;
    },
    currentPage(currentPage: number): void {
      this.$emit('input', currentPage);
      this.$emit('change', currentPage);
    },
  },

  methods: {
    createComponent(createElement: CreateElement) {
      const subElements = [];

      if (!this.hideFirstLastControls) {
        subElements.push(this.createControl(
          createElement,
          this.firstLabel,
          this.prevIsDisabled,
          false,
          this.goToFirstPage,
        ));
      }

      if (!this.hidePrevNextControls) {
        subElements.push(this.createControl(
          createElement,
          this.prevLabel,
          this.prevIsDisabled,
          false,
          this.goToPrevPage,
        ));
      }

      this.pageButtons.forEach((page) => {
        if (page === 'less' || page === 'more') {
          subElements.push(this.createControl(
            createElement,
            this.ellipsisLabel,
          ));
        } else {
          subElements.push(this.createControl(
            createElement,
            page,
            false,
            this.isPageActive(Number(page)),
            () => this.selectPage(Number(page)),
          ));
        }
      });

      if (!this.hidePrevNextControls) {
        subElements.push(this.createControl(
          createElement,
          this.nextLabel,
          this.nextIsDisabled,
          false,
          this.goToNextPage,
        ));
      }

      if (!this.hideFirstLastControls) {
        subElements.push(this.createControl(
          createElement,
          this.lastLabel,
          this.nextIsDisabled,
          false,
          this.goToLastPage,
        ));
      }

      return createElement(
        this.tagName,
        {
          class: this.getElementCssClass('wrapper'),
        },
        subElements as VNodeChildren,
      );
    },

    // eslint-disable-next-line max-len
    createControl(createElement: CreateElement, text: string, disabled = false, active = false, clickHandler?: ClickHandler) {
      let className: CssClass = '';

      if (!clickHandler) {
        className = this.getElementCssClass('ellipsisElement');
      } else if (disabled) {
        className = this.getElementCssClass('disabledElement');
      } else {
        className = this.getElementCssClass('element');
      }

      return createElement(
        this.elementTagName,
        {
          class: className,
        },
        [
          this.createControlButton(createElement, text, disabled, active, clickHandler),
        ],
      );
    },

    // eslint-disable-next-line max-len
    createControlButton(createElement: CreateElement, text: string, disabled = false, active = false, clickHandler?: ClickHandler) {
      if (!clickHandler) {
        return createElement(
          'span',
          {
            class: this.getElementCssClass('ellipsis'),
            domProps: {
              innerHTML: text,
            },
          },
        );
      }

      let className: CssClass = '';
      if (disabled) {
        className = this.getElementCssClass('disabledButton');
      } else if (active) {
        className = this.getElementCssClass('activeButton');
      } else {
        className = this.getElementCssClass('button');
      }

      return createElement(
        'button',
        {
          class: className,
          on: {
            click: clickHandler,
          },
          domProps: {
            innerHTML: text,
          },
        },
      );
    },

    selectPage(page: number) {
      this.currentPage = page;
    },
    goToPrevPage() {
      this.currentPage = this.currentPage === null
        ? 1
        : Math.max(this.currentPage - 1, 1);
    },
    goToNextPage() {
      this.currentPage = this.currentPage === null
        ? this.totalPages
        : Math.min(this.currentPage + 1, this.totalPages);
    },
    goToFirstPage() {
      this.currentPage = 1;
    },
    goToLastPage() {
      this.currentPage = this.totalPages;
    },
    isPageActive(page: number) {
      return page === this.currentPage;
    },
  },
});

export default TPagination;
