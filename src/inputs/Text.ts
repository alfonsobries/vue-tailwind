import { Prop } from 'vue-property-decorator';
import TextInput from './TextInput';

export default class Text extends TextInput {
  @Prop({ default: 'text' })
  type?: string

  @Prop()
  readonly max?: string | number

  @Prop()
  readonly min?: string | number
}
