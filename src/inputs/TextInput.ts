import { Prop } from 'vue-property-decorator';
import HtmlInput from './HtmlInput';
import Classes from '../types/Classes';

export default abstract class TextInput extends HtmlInput {
  @Prop()
  readonly value?: string | null

  @Prop()
  readonly autocomplete?: boolean

  @Prop()
  readonly maxlength?: string | number

  @Prop()
  readonly minlength?: string | number

  @Prop()
  readonly multiple?: boolean

  @Prop()
  readonly pattern?: string

  @Prop()
  readonly placeholder?: string

  @Prop({ default: 'default' })
  variant?: string

  @Prop()
  readonly classes: Classes

  public localValue?: string | null = this.value

  public valueWhenFocus?: string | null = null
}
