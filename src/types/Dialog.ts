import CssClasses from './CssClasses';

export enum DismissReason {
  Outside = 'outside',
  Close = 'close',
  Esc = 'esc',
}

export enum DialogType {
  Alert = 'alert',
  Confirm = 'confirm',
  Dialog = 'dialog',
}

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
} | undefined

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
