<template>
  <table 
    v-if="ready" 
    :class="currentClass"
  >
    <slot
      v-if="!renderResponsive"
      :tbody-class="theadClass.thead"
      :tr-class="theadClass.tr"
      :th-class="theadClass.th"
      :data="normalizedHeaders"
      name="thead"
    >
      <thead 
        v-if="showHeader" 
        :class="theadClass.thead"
      >
        <tr :class="theadClass.tr">
          <th 
            v-for="({ text, className, id }, index) in normalizedHeaders" 
            :id="id"
            :key="index"
            :class="[theadClass.th, className]"
          >
            {{ text }}
          </th>
        </tr>
      </thead>
    </slot>
    <slot
      :tbody-class="tbodyClass.tbody"
      :tr-class="tbodyClass.tr"
      :td-class="tbodyClass.td"
      :th-class="theadClass.th"
      :data="data"
      :headers="normalizedHeaders"
      :render-responsive="renderResponsive"
      name="tbody"
    >
      <tbody :class="tbodyClass.tbody">
        <slot
          v-for="(row, rowIndex) in data" 
          :row-index="rowIndex"
          :tr-class="tbodyClass.tr"
          :td-class="tbodyClass.td"
          :row="row"
          name="row"
        >
          <tr 
            :key="rowIndex"
            :class="tbodyClass.tr"
          >
            <slot 
              v-for="(text, columnIndex) in getRowColumns(row)"
              :row-index="rowIndex"
              :column-index="columnIndex"
              :td-class="tbodyClass.td"
              :text="text"
              name="column"
            >
              <td
                :key="`${rowIndex}-${columnIndex}`"
                :class="tbodyClass.td" 
              >
                {{ text }}
              </td>
            </slot>
          </tr>
        </slot>
      </tbody>
    </slot>
    <slot
      :tfoot-class="tfootClass.tfoot"
      :tr-class="tfootClass.tr"
      :td-class="tfootClass.td"
      :data="normalizedFooterData"
      :headers="normalizedHeaders"
      :render-responsive="renderResponsive"
      name="tfoot"
    >
      <tfoot 
        v-if="showFooter" 
        :class="tfootClass.tfoot"
      >
        <tr :class="tfootClass.tr">
          <td 
            v-for="({ text, className, id }, index) in normalizedFooterData" 
            :id="id"
            :key="index"
            :class="[tfootClass.td, className]"
          >
            {{ text }}
          </td>
        </tr>
      </tfoot>
    </slot>
  </table>
</template>

<script>
import TTableTheme from '../themes/default/TTable'
import pick from 'lodash/pick'

const {
  tableClass,
  theadClass,
  tbodyClass,
  tfootClass,
} = TTableTheme

export default {
  name: 'TTable',

  props: {
    data: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    footerData: {
      type: Array,
      default: () => []
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    tableClass: {
      type: [String, Object, Array],
      default: tableClass
    },
    theadClass: {
      type: Object,
      default: () => theadClass
    },
    tbodyClass: {
      type: Object,
      default: () => tbodyClass
    },
    tfootClass: {
      type: Object,
      default: () => tfootClass
    },
    responsive: {
      type: Boolean,
      default: false
    },
    responsiveBreakpoint: {
      type: Number,
      default: 768
    },
  },

  data () {
    return {
      ready: !this.responsive,
      windowWidth: null
    }
  },

  computed: {
    renderResponsive () {
      return this.responsive && this.windowWidth && this.windowWidth < this.responsiveBreakpoint
    },

    normalizedHeaders () {
      return this.headers.map(header => {
        if (typeof header === 'string') {
          return {
            text: header
          }
        }

        return header
      })
    },

    normalizedFooterData () {
      return this.footerData.map(footer => {
        if (typeof footer === 'string') {
          return {
            text: footer
          }
        }

        return footer
      })
    },

    headersValues () {
      return this.headers.filter(h => h.value).map(h => h.value)
    },

    showHeader () {
      return !this.hideHeader
    },

    /**
     * The default classes for the table
     * 
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
      ]

      if (this.tableClass) {
        classes.push(this.tableClass)
      }

      return classes
    }
  },

  mounted () {
    // If responsive we will need to calculate the windowWidth
    if (this.responsive) {
      this.windowWidth = window.innerWidth
      // To prevent double rendering in case of responsive table we will use a ready flag until
      // we know the size of the window
      this.ready = true
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth
      })
    }
  },

  methods: {
    getRowColumns(row) {
      if (! this.headersValues.length) {
        return row;
      }

      return pick(row, this.headersValues);
    }
  }
}
</script>
