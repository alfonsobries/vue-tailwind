<template>
  <component
    :is="tagName"
    :class="currentClass"
  >
    <component
      :is="elementTagName"
      v-if="!hideFirstLastControls"
      key="first"
      :class="[itemClass, prevIsDisabled ? disabledControlClass : controlClass]"
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
      v-if="!hidePrevNextControls"
      key="prev"
      :class="[itemClass, prevIsDisabled ? disabledControlClass : controlClass]"
    >
      <button
        :class="[buttonClass, prevIsDisabled ? disabledControlButtonClass : controlButtonClass]"
        :disabled="prevIsDisabled"
        @click="goToPrevPage"
        v-html="prevLabel"
      />
    </component>
    <template v-for="page in pageButtons">
      <component
        :is="elementTagName"
        v-if="page === 'less' || page === 'more' ? ellipsisClass : ''"
        :key="page"
        :class="[itemClass, ellipsisClass]"
      >
        <span
          :class="[buttonClass, ellipsisButtonClass]"
          v-html="ellipsisLabel"
        />
      </component>
      <component
        :is="elementTagName"
        v-else
        :key="page"
        :class="[itemClass, pageClass]"
      >
        <button
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
    </template>
    <component
      :is="elementTagName"
      v-if="!hidePrevNextControls"
      key="next"
      :class="[itemClass, nextIsDisabled ? disabledControlClass : controlClass]"
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
      v-if="!hideFirstLastControls"
      key="last"
      :class="[itemClass, nextIsDisabled ? disabledControlClass : controlClass]"
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
  itemClass,
  pageClass,
  buttonClass,
  activeButtonClass,
  inactiveButtonClass,
  disabledButtonClass,
  controlClass,
  disabledControlClass,
  controlButtonClass,
  disabledControlButtonClass,
  ellipsisClass,
  ellipsisButtonClass,
} = TPaginationTheme

export default {
  name: 'TPagination',

  props: {
    value: {
      type: Number,
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
      type: Number,
      default: 20,
      validator: (value) => Number(value) > 0
    },
    totalItems: {
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
    ellipsisLabel: {
      type: String,
      default: '&hellip;'
    },
    hideFirstLastControls: {
      type: Boolean,
      default: false
    },
    hidePrevNextControls: {
      type: Boolean,
      default: false
    },
    hideEllipsis: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: wrapperClass
    },
    itemClass: {
      type: [String, Object, Array],
      default: itemClass
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
    ellipsisClass: {
      type: [String, Object, Array],
      default: ellipsisClass
    },
    ellipsisButtonClass: {
      type: [String, Object, Array],
      default: ellipsisButtonClass
    },
    controlClass: {
      type: [String, Object, Array],
      default: controlClass
    },
    disabledControlClass: {
      type: [String, Object, Array],
      default: disabledControlClass
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

      return Math.ceil(this.totalItems / this.perPage)
    },

    pageButtons() {
      const from = Math.max(
        Math.min(
          this.currentPage - Math.round(this.limit/2) + 1,
          this.totalPages + 1 - this.limit
        ), 1
      )

      const to = Math.min(from + this.limit - 1, this.totalPages)
      
      return range(from, to + 1).map(page => {
        if (!this.hideEllipsis && page === from && from > 1) {
          return 'less'
        }
        
        if (!this.hideEllipsis && page === to && to < this.totalPages) {
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
