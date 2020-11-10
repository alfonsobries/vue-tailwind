import Vue, { PropOptions } from 'vue';

type CustomProp = {
  [key: string]: undefined | string | number | boolean | Array<CustomProp> | (() => CustomProp) | CustomProp
}

type ComponentSettings = {
  component: typeof Vue & {
    options?: {
      props?: {
        [key: string]: PropOptions
      }
    }
  },
  props: CustomProp
}

export default ComponentSettings;
