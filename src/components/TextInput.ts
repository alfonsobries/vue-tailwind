import { Prop } from 'vue-property-decorator';
import HtmlInput from './HtmlInput';


export default class TextInput extends HtmlInput {
  @Prop()
  readonly value?: string | null

  @Prop()
  readonly autocomplete?: boolean

  @Prop()
  readonly max?: string | number

  @Prop()
  readonly maxlength?: string | number

  @Prop()
  readonly min?: string | number

  @Prop()
  readonly minlength?: string | number

  @Prop()
  readonly multiple?: boolean

  @Prop()
  readonly pattern?: string

  @Prop()
  readonly placeholder?: string

  @Prop({ default: 'text' })
  type?: string

  public localValue?: string | null = this.value

  public valueWhenFocus?: string | null = null
}
