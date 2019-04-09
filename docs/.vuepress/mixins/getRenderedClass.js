const getRenderedClass = {
  data () {
    return {
      status: undefined,
      size: undefined,
      variant: undefined,
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
    getRenderedClassWhenInputIsReady () {
      this.triesToGetRenderedClass++
      const isReady = !! this.$refs.input
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
      this.renderedClass = this.$refs.input.currentClass
    }
  }
}

export default getRenderedClass
