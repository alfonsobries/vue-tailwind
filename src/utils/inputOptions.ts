import get from 'lodash/get';
import map from 'lodash/map';
import NormalizedOption from '../types/NormalizedOption';
import InputOptions from '../types/InputOptions';
import NormalizedOptions from '../types/NormalizedOptions';
import InputOption from '../types/InputOption';

const guessOptionValue = (option: InputOption, valueAttribute?: string): string | symbol | null => {
  if (valueAttribute) {
    return get(option, valueAttribute);
  }
  return get(option, 'value', get(option, 'id', get(option, 'text')));
};

const guessOptionText = (option: InputOption, textAttribute?: string): string => {
  if (textAttribute) {
    return get(option, textAttribute);
  }
  return get(option, 'text', get(option, 'label'));
};

const normalizeOption = (option: InputOption, textAttribute?: string, valueAttribute?: string): NormalizedOption => {
  if (
    typeof option === 'string'
    || typeof option === 'number'
    || typeof option === 'boolean'
  ) {
    return {
      value: option,
      text: option,
      raw: option,
    };
  }

  if (option.children) {
    const children = option.children.map((childOption) => normalizeOption(childOption));
    return {
      value: guessOptionValue(option, valueAttribute),
      text: guessOptionText(option, textAttribute),
      children,
    };
  }

  const normalizedOption: Partial<NormalizedOption> = {
    value: guessOptionValue(option, valueAttribute),
    text: guessOptionText(option, textAttribute),
    raw: option,
  };

  if (option.disabled !== undefined) {
    normalizedOption.disabled = option.disabled;
  }

  return normalizedOption as NormalizedOption;
};

const normalizeOptions = (options: InputOptions, textAttribute?: string, valueAttribute?: string): NormalizedOptions => {
  if (!options) {
    return [];
  }

  if (Array.isArray(options)) {
    return options.map((option) => normalizeOption(option, textAttribute, valueAttribute));
  }

  return map(options, (option, key) => ({
    value: key,
    text: option,
  })) as NormalizedOptions;
};

export {
  guessOptionValue, guessOptionText, normalizeOption, normalizeOptions,
};
