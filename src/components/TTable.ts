import pick from 'lodash/pick';
import Component from '@/base/Component';
import { CreateElement } from 'vue';
import CssClass from '@/types/CssClass';

type Header = {
  id?: string;
  className?: CssClass;
  text?: string;
  value?: string;
}

type Row = { [k: string]: string } | string[]

const TTable = Component.extend({
  name: 'TTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    footerData: {
      type: Array,
      default: () => [],
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    responsive: {
      type: Boolean,
      default: false,
    },
    responsiveBreakpoint: {
      type: Number,
      default: 768,
    },
  },

  data() {
    return {
      ready: !this.responsive,
      windowWidth: null,
    };
  },

  computed: {
    renderResponsive() {
      return this.responsive && this.windowWidth && this.windowWidth < this.responsiveBreakpoint;
    },

    normalizedHeaders(): Header[] {
      return (this.headers as Header[]).map((header) => {
        if (typeof header === 'string') {
          return {
            text: header,
          };
        }

        return header;
      });
    },

    normalizedFooterData() {
      return this.footerData.map((footer) => {
        if (typeof footer === 'string') {
          return {
            text: footer,
          };
        }

        return footer;
      });
    },

    headersValues(): string[] {
      return (this.headers as Header[])
        .filter((h) => h.value)
        .map((h) => h.value) as string[];
    },

    showHeader() {
      return !this.hideHeader;
    },

    resizeListener() {
      this.windowWidth = window.innerWidth;
    },
  },

  mounted() {
    // If responsive we will need to calculate the windowWidth
    if (this.responsive) {
      this.windowWidth = window.innerWidth;
      // If responsive we want to show the table until we know the window size
      this.ready = true;
      window.addEventListener('resize', this.resizeListener);
    }
  },

  beforeDestroy() {
    if (this.responsive) {
      window.removeEventListener('resize', this.resizeListener);
    }
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.renderTable;
    return renderFun(createElement);
  },

  methods: {
    renderTable(createElement: CreateElement) {
      if (!this.ready) {
        return createElement();
      }

      const childElements = [];

      // The responsive version doesnt have header
      if (!this.renderResponsive) {
        childElements.push(this.renderThead(createElement));
      }

      childElements.push(this.renderTBody(createElement));

      return createElement(
        'table',
        {
          ref: 'table',
          class: this.getElementCssClass('table'),
        },
        childElements,
      );
    },
    renderThead(createElement: CreateElement) {
      if (this.$scopedSlots.thead) {
        return this.$scopedSlots.thead({
          theadClass: this.getElementCssClass('thead'),
          theadTrClass: this.getElementCssClass('theadTr'),
          theadThClass: this.getElementCssClass('theadTh'),
        });
      }

      if (!this.showHeader) {
        return createElement();
      }

      const ths = this.normalizedHeaders.map((header: Header) => createElement(
        'th',
        {
          attrs: {
            id: header.id,
          },
          class: [this.getElementCssClass('theadTh'), header.className],
        },
        header.text,
      ));

      return createElement(
        'thead',
        {
          class: this.getElementCssClass('thead'),
        },
        [
          createElement(
            'tr',
            {
              class: this.getElementCssClass('theadTr'),
            },
            ths,
          ),
        ],
      );
    },

    renderTbody(createElement: CreateElement) {
      if (this.$scopedSlots.tbody) {
        return this.$scopedSlots.tbody({
          tbodyClass: this.getElementCssClass('tbody'),
          trClass: this.getElementCssClass('tr'),
          tdClass: this.getElementCssClass('td'),
          data: this.data,
          headers: this.normalizedHeaders,
          renderResponsive: this.renderResponsive,
        });
      }

      return createElement(
        'tbody',
        {
          class: this.getElementCssClass('tbody'),
        },
        this.renderRows(createElement),
      );
    },

    renderRows(createElement: CreateElement) {
      return (this.data as Row[]).map((row: Row, rowIndex) => {
        if (this.$scopedSlots.row) {
          return this.$scopedSlots.row({
            rowIndex,
            row,
            trClass: this.getElementCssClass('tr'),
            tdClass: this.getElementCssClass('td'),
          });
        }

        return createElement(
          'tr',
          {
            class: this.getElementCssClass('tr'),
          },
          this.renderCols(createElement, row, rowIndex),
        );
      });
    },

    renderCols(createElement: CreateElement, row: Row, rowIndex: number) {
      const columns = this.getRowColumns(row);

      if (typeof columns === 'object') {
        Object.keys(columns).map((columnIndex: string) => {
          const text = columns[columnIndex];
          return this.renderCol(createElement, text, rowIndex, columnIndex);
        });
      }

      return (columns as string[])
        .map((
          text: string,
          columnIndex: number,
        ) => this.renderCol(createElement, text, rowIndex, columnIndex));
    },

    renderCol(
      createElement: CreateElement,
      text: string, rowIndex:
      number, columnIndex: string | number,
    ) {
      if (this.$scopedSlots.row) {
        return this.$scopedSlots.row({
          rowIndex,
          columnIndex,
          text,
          tdClass: this.getElementCssClass('td'),
        });
      }

      return createElement(
        'td',
        {
          class: this.getElementCssClass('td'),
        },
        text,
      );
    },

    getRowColumns(row: Row): Row {
      if (!this.headersValues.length) {
        return row;
      }

      return pick(row, this.headersValues);
    },
  },
});

export default TTable;
