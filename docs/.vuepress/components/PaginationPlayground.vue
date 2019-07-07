<template>
  <input-demo col>
    <t-pagination
      :total-items="totalItems"
      :per-page="perPage"
      :limit="limit"
      :disabled="disabled"
      :hide-ellipsis="hideEllipsis"
      v-model="currentPage"
    />

    <template slot="controls">
      <disabled-control v-model="disabled" />
      
      <label class="flex items-center">
        <input 
          v-model="hideEllipsis" 
          type="checkbox"
        >
        <span class="ml-2 text-xs uppercase font-bold text-gray-600">
          Hide ellipsis
        </span>
      </label>

      <p class="flex items-center mt-2">
        <label 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Total items:
        </label>
        <t-input
          v-model.number="totalItems"
          default-class="p-1 border text-sm"
          type="number"
          min="0"
        />
      </p>

      <p class="flex items-center mt-2">
        <label 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Per page:
        </label>
        <t-input
          v-model.number="perPage"
          default-class="p-1 border text-sm"
          type="number"
          min="0"
        />
      </p>

      <p class="flex items-center mt-2">
        <label 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Limit pages:
        </label>
        <t-input
          v-model.number="limit"
          default-class="p-1 border text-sm"
          type="number"
          min="0"
        />
      </p>

      <p class="flex items-center mt-2">
        <label 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Current Page:
        </label>
        <t-input
          v-model.number="currentPage"
          default-class="p-1 border text-sm"
          type="number"
          min="0"
        />
      </p>
    </template>
  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'PaginationPlayground',

  mixins: [getRenderedClass],

  data () {
    return {
      totalItems: 100,
      perPage: 10,
      limit: 5,
      currentPage: 2,
      disabled: false,
      hideEllipsis: false,
    }
  },

  watch: {
    perPage (perPage) {
      const num = Number(perPage);
      if (num <= 0 || Number.isNaN(num)) {
        this.perPage = 1
      }
    },
    currentPage (currentPage) {
      const num = Number(currentPage);
      if (num <= 0 || Number.isNaN(num)) {
        this.currentPage = 1
      }
    },
  }
}
</script>
