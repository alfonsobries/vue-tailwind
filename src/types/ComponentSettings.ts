import Vue, { PropOptions } from 'vue';
import ComponentName from './ComponentName';

export type CustomProp = {
  [key: string]: undefined | string | number | boolean | Array<CustomProp> | (() => CustomProp) | CustomProp
}

export type VTComponent = typeof Vue & {
  options?: {
    props?: {
      [key: string]: PropOptions
    },
    name: ComponentName
  }
}

type ComponentSettings = {
  component: VTComponent,
  props: CustomProp
}

export default ComponentSettings;
