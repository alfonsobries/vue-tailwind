import pick from 'lodash/pick';
import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';
import CssClass from '../types/CssClass';

type ColumnSettings = {
  id?: string;
  className?: CssClass;
  text?: string;
  value?: string;
}

type RowObject = { [k: string]: string }
type Row = RowObject | string[]

const TTable = Component.extend({
  name: 'TTable',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    footerData: {
      type: Array,
      default() {
        return [];
      },
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
      windowWidth: null as null | number,
    };
  },

  computed: {
    renderResponsive() {
      const { windowWidth } = this as { windowWidth: null | number };
      return this.responsive && windowWidth && windowWidth < this.responsiveBreakpoint;
    },

    normalizedHeaders(): ColumnSettings[] {
      return (this.headers as ColumnSettings[]).map((header) => {
        if (typeof header === 'string') {
          return {
            text: header,
          };
        }

        return header;
      });
    },

    normalizedFooterData(): ColumnSettings[] {
      return (this.footerData as ColumnSettings[]).map((footer) => {
        if (typeof footer === 'string') {
          return {
            text: footer,
          };
        }

        return footer;
      });
    },

    headersValues(): string[] {
      return (this.headers as ColumnSettings[])
        .filter((h) => h.value)
        .map((h) => h.value) as string[];
    },

    showHeader() {
      return !this.hideHeader;
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
    resizeListener(): void {
      this.windowWidth = window.innerWidth;
    },
    renderTable(createElement: CreateElement) {
      if (!this.ready) {
        return createElement();
      }

      const childElements = [];

      // The responsive version doesnt have header
      if (!this.renderResponsive) {
        childElements.push(this.renderThead(createElement));
      }

      childElements.push(this.renderTbody(createElement));

      if (this.showFooter || this.$scopedSlots.tfoot) {
        childElements.push(this.renderTfoot(createElement));
      }

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
      const trClass = this.getElementCssClass('theadTr');
      const thClass = this.getElementCssClass('theadTh');
      const theadClass = this.getElementCssClass('thead');

      if (this.$scopedSlots.thead) {
        const thead = this.$scopedSlots.thead({
          theadClass,
          trClass,
          thClass,
          data: this.normalizedHeaders,
        });

        if (thead) {
          return thead;
        }
      }

      if (!this.showHeader) {
        return createElement();
      }

      const ths = this.normalizedHeaders.map((header: ColumnSettings) => createElement(
        'th',
        {
          attrs: {
            id: header.id,
          },
          class: header.className ? [thClass, header.className] : thClass,
        },
        header.text,
      ));

      return createElement(
        'thead',
        {
          class: theadClass,
        },
        [
          createElement(
            'tr',
            {
              class: trClass,
            },
            ths,
          ),
        ],
      );
    },

    renderTfoot(createElement: CreateElement) {
      const trClass = this.getElementCssClass('tfootTr');
      const tdClass = this.getElementCssClass('tfootTd');
      const tfootClass = this.getElementCssClass('tfoot');

      if (this.$scopedSlots.tfoot) {
        const tfoot = this.$scopedSlots.tfoot({
          tfootClass,
          trClass,
          tdClass,
          data: this.normalizedFooterData,
          headers: this.normalizedHeaders,
          renderResponsive: this.renderResponsive,
        });

        if (tfoot) {
          return tfoot;
        }
      }

      const tds = this.normalizedFooterData.map((footer: ColumnSettings) => createElement(
        'td',
        {
          attrs: {
            id: footer.id,
          },
          class: footer.className ? [tdClass, footer.className] : tdClass,
        },
        footer.text,
      ));

      return createElement(
        'tfoot',
        {
          class: tfootClass,
        },
        [
          createElement(
            'tr',
            {
              class: trClass,
            },
            tds,
          ),
        ],
      );
    },

    renderTbody(createElement: CreateElement) {
      if (this.$scopedSlots.tbody) {
        const tbody = this.$scopedSlots.tbody({
          tbodyClass: this.getElementCssClass('tbody'),
          trClass: this.getElementCssClass('tr'),
          tdClass: this.getElementCssClass('td'),
          data: this.data,
          headers: this.normalizedHeaders,
          renderResponsive: this.renderResponsive,
        });

        if (tbody) {
          return tbody;
        }
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
          const tableRow = this.$scopedSlots.row({
            rowIndex,
            row,
            trClass: this.getElementCssClass('tr'),
            tdClass: this.getElementCssClass('td'),
          });

          if (tableRow) {
            return tableRow;
          }
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
        return Object.keys(columns as RowObject).map((columnIndex) => {
          const text = (columns as RowObject)[columnIndex];
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
      if (this.$scopedSlots.column) {
        const tableColumn = this.$scopedSlots.column({
          rowIndex,
          columnIndex,
          text,
          tdClass: this.getElementCssClass('td'),
        });

        if (tableColumn) {
          return tableColumn;
        }
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

      if (typeof row === 'object') {
        return pick<RowObject>(row as RowObject, this.headersValues) as RowObject;
      }

      return {};
    },
  },
});

export default TTable;
