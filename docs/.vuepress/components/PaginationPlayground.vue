<template>
  <input-demo col>
    <t-pagination
      :total-rows="totalRows"
      :per-page="perPage"
      :limit="limit"
      :disabled="disabled"
      v-model="currentPage"
    />

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <p class="flex items-center mt-2">
        <label 
          for="rows" 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Total rows:
        </label>
        <t-input
          v-model.number="totalRows"
          default-class="p-1 border text-sm"
          type="number"
          min="0"
        />
      </p>

      <p class="flex items-center mt-2">
        <label 
          for="rows" 
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
          for="rows" 
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
          for="rows" 
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

    <!-- <template slot="classes">
      <p>
        Rendered class: 
        <pre class="text-white">{{ renderedClass }}</pre>
      </p>
    </template> -->
  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'PaginationPlayground',

  mixins: [getRenderedClass],

  data () {
    return {
      totalRows: 100,
      perPage: 10,
      limit: 5,
      currentPage: 2,
      disabled: false
    }
  },
}
</script>
