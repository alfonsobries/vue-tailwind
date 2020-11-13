import _Vue from 'vue';
import get from 'lodash/get';
import ComponentSettings from '../types/ComponentSettings';
import { DialogType } from '../types/Dialog';
import CssClasses from '../types/CssClasses';
import TDialog from '../components/TDialog';

export type DialogOptions = {
  titleTag?: string;
  title?: string;
  icon?: string;
  textTag?: string;
  text?: string;
  clickToClose?: boolean;
  escToClose?: boolean;
  cancelButtonText?: string;
  cancelButtonAriaLabel?: string;
  okButtonText?: string;
  okButtonAriaLabel?: string;
  showCloseButton?: boolean;
  disableBodyScroll?: boolean;
  focusOnOpen?: boolean;
  target?: string;
  fixedClasses?: CssClasses;
  classes?: CssClasses;
  variant?: string;
  inputAttributes?: { [key: string]: string; };
}

export type DialogProps = {
  titleTag: string;
  title?: string;
  icon?: string;
  textTag: string;
  text?: string;
  clickToClose: boolean;
  escToClose: boolean;
  cancelButtonText: string;
  cancelButtonAriaLabel?: string;
  okButtonText: string;
  okButtonAriaLabel?: string;
  showCloseButton: boolean;
  disableBodyScroll: boolean;
  focusOnOpen: boolean;
  fixedClasses?: CssClasses;
  classes?: CssClasses;
  variant?: string
  inputAttributes?: { [key: string]: string; };
  type: DialogType
}

const parseDialogOptions = (type: DialogType, settings?: ComponentSettings, titleOrDialogOptions?: DialogOptions | string, text?: string, icon?: string) => {
  type DialogComponent = typeof TDialog & {
    options: {
      props: {
        [key in keyof DialogProps]: {
          default: {
            default: string | boolean | undefined | null | CssClasses
          };
        };
      }
    }
  }

  const { props } = (TDialog as DialogComponent).options;

  const propsData: Partial<DialogProps> = {
    type,
    ...settings,
  };

  let target = 'body';

  if (titleOrDialogOptions) {
    if (typeof titleOrDialogOptions === 'object') {
      Object.keys(props).forEach((propName) => {
        if (propName in titleOrDialogOptions) {
          const defaultValue = get(props, `${propName}.default`);
          propsData[propName as keyof DialogProps] = get(titleOrDialogOptions, propName, defaultValue);
        }
      });

      if (titleOrDialogOptions.target) {
        target = titleOrDialogOptions.target;
      }
    } else if (typeof titleOrDialogOptions === 'string') {
      propsData.title = titleOrDialogOptions;
      if (typeof text !== 'undefined') {
        propsData.text = text;
      }
      if (typeof icon !== 'undefined') {
        propsData.icon = icon;
      }
    }
  }

  return {
    propsData,
    target,
  };
};

const buildDialog = (target: string, propsData: Partial<DialogProps>) => {
  const domTarget = document.querySelector(target);

  if (!domTarget) {
    throw new Error('Target not found!');
  }

  const instance = new TDialog({
    propsData,
  });

  instance.$mount();

  domTarget.appendChild(instance.$el);

  instance.show();

  return new Promise((resolve, reject) => {
    instance.resolve = resolve;
    instance.reject = reject;
  });
};

const configureDialogGlobals = (Vue: typeof _Vue, settings: ComponentSettings): void => {
  if (!Vue.prototype.$dialog) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$dialog = new Vue({
      methods: {
        alert(titleOrDialogOptions?: DialogOptions | string, text?: string | undefined, icon?: string | undefined) {
          const { propsData, target } = parseDialogOptions(
            DialogType.Alert,
            settings,
            titleOrDialogOptions,
            text,
            icon,
          );

          return buildDialog(target, propsData);
        },
        confirm(titleOrDialogOptions?: DialogOptions | string, text?: string | undefined, icon?: string | undefined) {
          const { propsData, target } = parseDialogOptions(
            DialogType.Confirm,
            settings,
            titleOrDialogOptions,
            text,
            icon,
          );

          return buildDialog(target, propsData);
        },
        prompt(titleOrDialogOptions?: DialogOptions | string, text?: string | undefined, icon?: string | undefined) {
          const { propsData, target } = parseDialogOptions(
            DialogType.Prompt,
            settings,
            titleOrDialogOptions,
            text,
            icon,
          );

          return buildDialog(target, propsData);
        },
        show(name: string, params = undefined) {
          return new Promise((resolve, reject) => {
            this.$emit(`show-${name}`, resolve, reject, params);
          });
        },
        hide(name: string) {
          this.$emit(`hide-${name}`);
        },
      },
    });
  }

  if (!Vue.prototype.$alert) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$alert = Vue.prototype.$dialog.alert;
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$confirm = Vue.prototype.$dialog.confirm;
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$prompt = Vue.prototype.$dialog.prompt;
  }
};

export default configureDialogGlobals;
