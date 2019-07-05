<template>
  <component
    :is="tagName"
    :class="currentClass"
  >
    <component
      :is="elementTagName"
      key="first"
      :class="pageClass"
    >
      <button
        :class="[buttonClass, controlButtonClass]"
        @click="goToFirstPage"
        v-html="firstLabel"
      />
    </component>
    <component
      :is="elementTagName"
      key="prev"
      :class="pageClass"
    >
      <button
        :class="[buttonClass, controlButtonClass]"
        @click="goToPrevPage"
        v-html="prevLabel"
      />
    </component>
    <component
      :is="elementTagName"
      v-for="page in pagesButtons"
      :key="page"
      :class="pageClass"
    >
      <span
        v-if="page === 'less' || page === 'more'"
        :class="[buttonClass, moreLabelClass]"
        v-text="'...'"
      />
      <button
        v-else
        :class="[buttonClass, isPageActive(page) ? activeButtonClass : inactiveButtonClass]"
        @click="selectPage(page)"
      >
        {{ page }}
      </button>
    </component>
    <component
      :is="elementTagName"
      key="next"
      :class="pageClass"
    >
      <button
        :class="[buttonClass, controlButtonClass]"
        @click="goToNextPage"
        v-html="nextLabel"
      />
    </component>
    <component
      :is="elementTagName"
      key="last"
      :class="pageClass"
    >
      <button
        :class="[buttonClass, controlButtonClass]"
        @click="goToLastPage"
        v-html="nextLabel"
      />
    </component>
  </component>
</template>

<script>
import TPaginationTheme from '../themes/default/TPagination'
import range from 'lodash/range'

const {
  wrapperClass,
  pageClass,
  buttonClass,
  activeButtonClass,
  inactiveButtonClass,
  controlButtonClass,
  moreLabelClass,
} = TPaginationTheme

export default {
  name: 'TPagination',

  props: {
    value: {
      type: [String, Number],
      default: null
    },
    tagName: {
      type: String,
      default: 'ul'
    },
    elementTagName: {
      type: String,
      default: 'li'
    },
    perPage: {
      type: [String, Number],
      default: 20,
      validator: (value) => Number(value) > 0
    },
    totalRows: {
      type: [String, Number],
      default: 0,
      validator: (value) => Number(value) >= 0
    },
    limit: {
      type: [String, Number],
      default: 5,
      validator: (value) => Number(value) >= 0
    },
    prevLabel: {
      type: String,
      default: '&lsaquo;'
    },
    nextLabel: {
      type: String,
      default: '&rsaquo;'
    },
    firstLabel: {
      type: String,
      default: '&laquo;'
    },
    lastLabel: {
      type: String,
      default: '&raquo;'
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: wrapperClass
    },
    pageClass: {
      type: [String, Object, Array],
      default: pageClass
    },
    buttonClass: {
      type: [String, Object, Array],
      default: buttonClass
    },
    inactiveButtonClass: {
      type: [String, Object, Array],
      default: inactiveButtonClass
    },
    activeButtonClass: {
      type: [String, Object, Array],
      default: activeButtonClass
    },
    controlButtonClass: {
      type: [String, Object, Array],
      default: controlButtonClass
    },
    moreLabelClass: {
      type: [String, Object, Array],
      default: moreLabelClass
    },
  },

  data () {
    return {
      currentPage: this.value
    }
  },

  computed: {
    totalPages () {
      if (this.perPage <= 0 ) {
        return 0
      }

      return Math.ceil(this.totalRows / this.perPage)
    },

    pagesButtons() {
      const from = Math.max(
        Math.min(
          this.currentPage - Math.round(this.limit/2) + 1,
          this.totalPages + 1 - this.limit
        ), 1
      )

      const to = Math.min(from + this.limit - 1, this.totalPages)
      
      return range(from, to + 1).map(page => {
        if (page === from && from > 1) {
          return 'less'
        }
        
        if (page === to && to < this.totalPages) {
          return 'more'
        }

        return page
      })
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

      if (this.wrapperClass) {
        classes.push(this.wrapperClass)
      }

      return classes
    }
  },

  watch: {
    value (value) {
      this.currentPage = value
    },
    currentPage (currentPage) {
      this.$emit('input', currentPage)
      this.$emit('change', currentPage)
    },
  },

  methods: {
    selectPage (page) {
      this.currentPage = page
    },
    goToPrevPage (page) {
      this.currentPage = Math.max(this.currentPage-1, 1)
    },
    goToNextPage (page) {
      this.currentPage = Math.min(this.currentPage+1, this.totalPages)
    },
    goToFirstPage (page) {
      this.currentPage = 1
    },
    goToLastPage (page) {
      this.currentPage = this.totalPages
    },
    isPageActive (page) {
      return Number(page) === Number(this.currentPage)
    }
  }
}
</script>
