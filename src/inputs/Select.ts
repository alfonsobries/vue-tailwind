import { Prop } from 'vue-property-decorator';
import MultipleInput from './MultipleInput';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';
import InputOption from '../types/InputOption';

export default class Select extends MultipleInput {
  @Prop()
  readonly placeholder?: string

  get normalizedOptionsWithPlaceholder(): NormalizedOptions {
    if (typeof this.placeholder === 'undefined') {
      return this.normalizedOptions;
    }

    const { normalizedOptions } = this;
    normalizedOptions.unshift({
      value: null,
      text: this.placeholder,
    });

    return normalizedOptions;
  }

  normalizeOption(option: InputOption): NormalizedOption {
    if (typeof option === 'object' && option.children && Array.isArray(option.children)) {
      return {
        value: this.guessOptionValue(option),
        text: this.guessOptionText(option),
        children: option.children.map((childOption) => this.normalizeOption(childOption)),
      };
    }

    return super.normalizeOption(option);
  }
}
