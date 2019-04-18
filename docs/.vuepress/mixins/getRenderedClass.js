const getRenderedClass = {
  data () {
    return {
      status: 'error',
      size: null,
      variant: null,
      disabled: false,
      renderedClass: null,
      triesToGetRenderedClass: 0
    }
  },

  watch: {
    status () {
      this.updateRenderedClass();
    },
    disabled () {
      this.updateRenderedClass();
    },
    size () {
      this.updateRenderedClass();
    },
    variant () {
      this.updateRenderedClass();
    },
  },

  mounted() {
    this.getRenderedClassWhenInputIsReady()
  },

  methods: {
    getInputToParseClass () {
      return this.$refs.input;
    },

    getRenderedClassWhenInputIsReady () {
      this.triesToGetRenderedClass++
      const isReady = !! this.getInputToParseClass()

      
      if (this.triesToGetRenderedClass > 10) {
        console.warn('The inputs is not loaded')
      } else if (!isReady) {
        setTimeout(() => {
          this.getRenderedClassWhenInputIsReady()
        }, 50)  
      } else {
        this.updateRenderedClass()
      }
    },

    async updateRenderedClass() {
      await this.$nextTick()
      this.renderedClass = this.getInputToParseClass().currentClass
    }
  }
}

export default getRenderedClass
