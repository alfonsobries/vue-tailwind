const getRenderedClass = {
  data () {
    return {
      status: undefined,
      size: undefined,
      disabled: false,
      renderedClass: null,
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
  },

  mounted() {
    this.getRenderedClassWhenInputIsReady()
  },

  methods: {
    getRenderedClassWhenInputIsReady () {
      const isReady = !! this.$refs.input
      if (!isReady) {
        setTimeout(() => {
          this.getRenderedClassWhenInputIsReady()
        }, 50)  
      } else {
        this.updateRenderedClass()
      }
    },
    updateRenderedClass() {
      this.renderedClass = this.$refs.input.currentClass
    }
  }
}

export default getRenderedClass
