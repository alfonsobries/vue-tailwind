const getRenderedClass = {
  data () {
    return {
      status: null,
      size: null,
      variant: null,
      disabled: false,
      renderedClass: null,
      triesToGetRenderedClass: 0,
      ready: false,
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
      this.ready = true
    }
  }
}

export default getRenderedClass
