import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

export default abstract class HtmlInput extends Vue {
  @Prop()
  readonly id?: string

  @Prop()
  readonly name?: string

  @Prop()
  readonly disabled?: boolean

  @Prop()
  readonly readonly?: boolean

  @Prop()
  readonly autofocus?: boolean

  @Prop()
  readonly required?: boolean

  @Prop()
  readonly tabindex?: string | number
}
