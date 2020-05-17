import { Prop } from 'vue-property-decorator';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import map from 'lodash/map';
import HtmlInput from './HtmlInput';
import InputOption from '../types/InputOption';
import InputOptions from '../types/InputOptions';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';

export default abstract class MultipleInput extends HtmlInput {
  @Prop()
  readonly value?: InputOptions

  @Prop()
  readonly multiple?: boolean

  @Prop()
  readonly valueAttribute?: string

  @Prop()
  readonly textAttribute?: string

  @Prop()
  readonly options?: InputOptions

  public localValue?: InputOptions = this.value

  get normalizedOptions(): NormalizedOptions {
    console.log(':D');
    const { options } = this;


    if (!options) {
      return [];
    }

    if (Array.isArray(options)) {
      return options.map((option) => this.normalizeOption(option));
    }

    return map<object, NormalizedOption>(options, (option, key) => ({
      value: key,
      text: option,
    }));
  }

  get flattenedOptions() {
    return flatten(this.normalizedOptions.map((option) => {
      if (option.children) {
        return option.children;
      }

      return option;
    }));
  }

  guessOptionValue(option: InputOption) {
    if (this.valueAttribute) {
      return get(option, this.valueAttribute);
    }
    return get(option, 'value', get(option, 'id', get(option, 'text')));
  }

  guessOptionText(option: InputOption) {
    if (this.textAttribute) {
      return get(option, this.textAttribute);
    }
    return get(option, 'text', get(option, 'label'));
  }

  normalizeOption(option: InputOption): NormalizedOption {
    if (
      typeof option === 'string'
      || typeof option === 'number'
      || typeof option === 'boolean'
    ) {
      return {
        value: option,
        text: option,
      };
    }

    return {
      value: this.guessOptionValue(option),
      text: this.guessOptionText(option),
    };
  }
}
