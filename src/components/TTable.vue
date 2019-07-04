<template>
  <table :class="currentClass">
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
    <tbody :class="tbodyClass.tbody">
      <slot 
        v-for="(row, rowIndex) in normalizedData" 
        :tr-class="tbodyClass.tr"
        :td-class="tbodyClass.td"
        :row="row"
        name="row"
      >
        <tr 
          :key="rowIndex"
          :row-index="rowIndex"
          :class="tbodyClass.tr"
        >
          <slot 
            v-for="(item, columnIndex) in row" 
            :row-index="rowIndex"
            :column-index="columnIndex"
            :td-class="tbodyClass.td"
            :item="item"
            name="column"
          >
            <td
              :key="`${rowIndex}-${columnIndex}`"
              :class="tbodyClass.td" 
            >
              {{ item.text }}
            </td>
          </slot>
        </tr>
      </slot>
    </tbody>
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
  </table>
</template>

<script>
import TTableTheme from '../themes/default/TTable'

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
  },

  computed: {
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

    normalizedData () {
      return this.data.map(row => {
        return row.map(col => {
          if (typeof col === 'string') {
            return {
              text: col
            }
          }

          return col
        })
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
}
</script>
