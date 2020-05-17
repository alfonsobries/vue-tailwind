import Vue from 'vue';
// import { Prop } from 'vue-property-decorator';

const HtmlInput = Vue.extend({
  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
  },
});

export default HtmlInput;
// export default abstract class HtmlInput extends Vue {
//   @Prop()
//   readonly id?: string

//   @Prop()
//   readonly name?: string

//   @Prop()
//   readonly disabled?: boolean

//   @Prop()
//   readonly readonly?: boolean

//   @Prop()
//   readonly autofocus?: boolean

//   @Prop()
//   readonly required?: boolean

//   @Prop()
//   readonly tabindex?: string | number
// }
