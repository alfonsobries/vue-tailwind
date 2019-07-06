<template>
  <component
    :is="tagName"
    :class="currentClass"
  >
    <component
      :is="elementTagName"
      v-if="!hideEndLastControls"
      key="first"
      :class="pageClass"
    >
      <button
        :class="[buttonClass, prevIsDisabled ? disabledControlButtonClass : controlButtonClass]"
        :disabled="prevIsDisabled"
        @click="goToFirstPage"
        v-html="firstLabel"
      />
    </component>
    <component
      :is="elementTagName"
      v-if="!hidePrevLastControls"
      key="prev"
      :class="pageClass"
    >
      <button
        :class="[buttonClass, prevIsDisabled ? disabledControlButtonClass : controlButtonClass]"
        :disabled="prevIsDisabled"
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
        v-html="moreLabel"
      />
      <button
        v-else
        :class="[
          buttonClass,
          disabled
            ? disabledButtonClass
            : (isPageActive(page) ? activeButtonClass : inactiveButtonClass)
        ]"
        :disabled="disabled"
        @click="selectPage(page)"
      >
        {{ page }}
      </button>
    </component>
    <component
      :is="elementTagName"
      v-if="!hidePrevLastControls"
      key="next"
      :class="pageClass"
    >
      <button
        :class="[buttonClass, nextIsDisabled ? disabledControlButtonClass : controlButtonClass]"
        :disabled="nextIsDisabled"
        @click="goToNextPage"
        v-html="nextLabel"
      />
    </component>
    <component
      :is="elementTagName"
      v-if="!hideEndLastControls"
      key="last"
      :class="pageClass"
    >
      <button
        :class="[buttonClass, nextIsDisabled ? disabledControlButtonClass : controlButtonClass]"
        :disabled="nextIsDisabled"
        @click="goToLastPage"
        v-html="lastLabel"
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
  disabledButtonClass,
  controlButtonClass,
  disabledControlButtonClass,
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
    disabled: {
      type: Boolean,
      default: false
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
    moreLabel: {
      type: String,
      default: '&hellip;'
    },
    hideEndLastControls: {
      type: Boolean,
      default: false
    },
    hidePrevLastControls: {
      type: Boolean,
      default: false
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
    disabledButtonClass: {
      type: [String, Object, Array],
      default: disabledButtonClass
    },
    controlButtonClass: {
      type: [String, Object, Array],
      default: controlButtonClass
    },
    disabledControlButtonClass: {
      type: [String, Object, Array],
      default: disabledControlButtonClass
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

    prevIsDisabled () {
      return this.disabled || this.currentPage <= 1
    },

    nextIsDisabled () {
      return this.disabled || this.currentPage >= this.totalPages
    },
    /**
     * 
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
