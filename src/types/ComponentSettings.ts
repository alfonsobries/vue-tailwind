import Vue, { PropOptions } from 'vue';

export type CustomProp = {
  [key: string]: undefined | string | number | boolean | Array<CustomProp> | (() => CustomProp) | CustomProp
}

export type VTComponent = typeof Vue & {
  options?: {
    props?: {
      [key: string]: PropOptions
    }
  }
}

type ComponentSettings = {
  component: VTComponent,
  props: CustomProp
}

export default ComponentSettings;
