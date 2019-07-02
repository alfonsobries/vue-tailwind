<template>
  <div>
    <t-file-input
      v-model="files"
      base-class="shadow border block rounded inline-flex items-center justify-center uppercase text-sm font-bold"
      default-class="bg-gray-100 border-gray-100 hover:shadow-lg cursor-pointer"
      size="sm"
      multiple
      accept="image/*"
      :max="max"
      :maxSize="1 * 1024 ** 2"
      :variant="hasError ? 'danger' : null"
      @error="onError"
      @input="onInput"
    >
      <template v-slot:icon>
          <svg style="width:24px;height:24px" fill="currentColor" class="mr-2" viewBox="0 0 24 24">
              <path fill="#000000" d="M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6" />
          </svg>
      </template>
      Select pictures ({{ max }} max)
    </t-file-input>

    <ul v-if="hasError" class="text-red-600 text-sm">
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <div class="mt-2">
      <div v-if="files && files.length > 0 && filesPreview" class="flex flex-row">
        <t-card
          v-for="(file, index) in files"
          :key="index"
          :class="files.length > 1 ? `w-1/${files.length}` : 'w-full'"
          body-class="p-0"
          footer-class="p-2 border-t"
        >
          <div
            class="bg-cover bg-center h-24"
            :style="`background-image: url(${filesPreview[index]})`"
          ></div>
          <template v-slot:footer>
            <p class="text-xs text-gray-600">{{ file.name }}</p>
          </template>
        </t-card>
      </div>
      <t-alert v-else show variant="warning" :dismissible="false">
        No file
      </t-alert>
    </div>
  </div>
</template>

<script>
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default {
  name: 'FileInputCustom',

  data: () => ({
    max: 4,
    errors: null,
    files: null,
    filesPreview: null
  }),

  computed: {
    hasError () {
      return this.errors && this.errors.length > 0
    }
  },

  methods: {
    onError (errors) {
      this.files = null
      this.errors = errors
    },
    onInput (files) {
      this.setFilesPreview(value)
      this.errors = null
    },

  /**
   * Files preview is a method
   * because computed not support Promise by default
   * However you can use this package :
   * https://github.com/foxbenjaminfox/vue-async-computed
   */
    async setFilesPreview(files) {
      if (!files) {
        return
      }
      const promises = Array.from(files).map(file => readFileAsync(file))
      const filesPreview = await Promise.all(promises)
      this.filesPreview = filesPreview
    }
  }
}
</script>
