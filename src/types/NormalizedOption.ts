import InputOption from './InputOption';

type NormalizedOption = {
  value: null | string | number | symbol | boolean;
  text: string | number | boolean;
  children?: Array<NormalizedOption>;
  raw?: InputOption;
  disabled?: boolean | 'disabled';
}

export default NormalizedOption;
