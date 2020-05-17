import { Prop } from 'vue-property-decorator';
import TextInput from './TextInput';

export default class Textarea extends TextInput {
  @Prop()
  readonly rows?: number

  @Prop()
  readonly cols?: number

  @Prop({ default: 'soft' })
  readonly wrap?: 'hard' | 'soft'
}
