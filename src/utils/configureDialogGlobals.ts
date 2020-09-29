import _Vue from 'vue';
import get from 'lodash/get';
import { DialogType } from '../types/Dialog';
import CssClasses from '../types/CssClasses';
import TDialog from '../components/TDialog';

export type DialogOptions = {
  titleTag?: string;
  title?: string;
  htmlTitle?: string;
  icon?: string;
  htmlIcon?: string;
  textTag?: string;
  text?: string;
  htmlText?: string;
  clickToClose?: boolean;
  escToClose?: boolean;
  dismissButtonText?: string;
  dismissButtonAriaLabel?: string;
  primaryButtonText?: string;
  primaryButtonAriaLabel?: string;
  showCloseButton?: boolean;
  closeButtonHtml?: string;
  disableBodyScroll?: boolean;
  focusOnOpen?: boolean;
  target?: string;
  fixedClasses?: CssClasses;
  classes?: CssClasses;
  variant?: string
} | undefined | string

export type DialogProps = {
  titleTag: string;
  title?: string;
  htmlTitle?: string;
  icon?: string;
  htmlIcon?: string;
  textTag: string;
  text?: string;
  htmlText?: string;
  clickToClose: boolean;
  escToClose: boolean;
  dismissButtonText: string;
  dismissButtonAriaLabel?: string;
  primaryButtonText: string;
  primaryButtonAriaLabel?: string;
  showCloseButton: boolean;
  closeButtonHtml: string;
  disableBodyScroll: boolean;
  focusOnOpen: boolean;
  fixedClasses?: CssClasses;
  classes?: CssClasses;
  variant?: string
  type: DialogType
}

const parseDialogOptions = (type: DialogType, titleOrDialogOptions: DialogOptions, text: string | undefined, icon: string | undefined) => {
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

const buildDialog = (type: DialogType, titleOrDialogOptions: DialogOptions, text: string | undefined, icon: string | undefined) => {
  const { propsData, target } = parseDialogOptions(type, titleOrDialogOptions, text, icon);

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

const configureDialogGlobals = (Vue: typeof _Vue): void => {
  if (!Vue.prototype.$dialog) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$dialog = new Vue({
      methods: {
        alert(titleOrDialogOptions: DialogOptions = undefined, text: string | undefined, icon: string | undefined) {
          return buildDialog(DialogType.Alert, titleOrDialogOptions, text, icon);
        },
        confirm(titleOrDialogOptions: DialogOptions = undefined, text: string | undefined, icon: string | undefined) {
          return buildDialog(DialogType.Confirm, titleOrDialogOptions, text, icon);
        },
        prompt(titleOrDialogOptions: DialogOptions = undefined, text: string | undefined, icon: string | undefined) {
          return buildDialog(DialogType.Prompt, titleOrDialogOptions, text, icon);
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
