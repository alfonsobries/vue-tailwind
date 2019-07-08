<template>
  <input-demo>
    <t-modal
      :shown.sync="show"
      :header="header"
    >
      <p v-html="nl2br(body)" />
      <template v-slot:footer>
        <div v-html="nl2br(footer)" />
      </template>
    </t-modal>

    <t-button @click="show = true">Show modal</t-button>

    <template slot="controls">
      <label class="flex items-center">
        <input 
          v-model="show" 
          type="checkbox"
        >
        <span class="ml-2 text-xs uppercase font-bold text-gray-600">
          Show
        </span>
      </label>

      <p class="flex items-center mt-2">
        <label 
          for="header" 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Header:
        </label>
        <t-input
          id="header"
          v-model="header"
          name="header"
          default-class="p-1 border text-sm"
        />
      </p>

      <p class="flex flex-col mt-2">
        <label 
          for="body" 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Body:
        </label>
        <t-textarea
          id="body"
          v-model="body"
          name="body"
          rows="8"
          default-class="p-1 border text-sm"
        />
      </p>

      <p class="flex items-center mt-2">
        <label 
          for="footer" 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
          Footer:
        </label>
        <t-input
          id="footer"
          v-model="footer"
          name="footer"
          default-class="p-1 border text-sm"
        />
      </p>
    </template>
  </input-demo>
</template>

<script>
export default {
  name: 'ModalPlayground',

  data () {
    return {
      header: 'Title of the modal',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed sit sint, aliquam tenetur aut doloribus eos, eligendi suscipit.',
      footer: 'footer content',
      show: false,
    }
  },

  methods: {
    nl2br (str) {
      if (typeof str === 'undefined' || str === null) {
          return '';
      }
      var breakTag = '<br />';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
  }
}
</script>
