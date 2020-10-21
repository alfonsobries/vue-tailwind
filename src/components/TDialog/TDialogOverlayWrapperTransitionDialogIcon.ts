import Vue, { CreateElement, VNode } from 'vue';

export enum IconName {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Question = 'question',
}

type HtmlIcons = {
  [key in IconName]: string
}

function getHtmlSvgPath(iconName?: IconName) {
  if (!iconName) { return undefined; }

  const icons = {} as HtmlIcons;

  icons[IconName.Success] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
  icons[IconName.Error] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
  icons[IconName.Warning] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>';
  icons[IconName.Info] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
  icons[IconName.Question] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';

  return icons[iconName];
}

const TDialogOverlayWrapperTransitionDialogIcon = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialogIcon',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    icon: {
      type: String,
      default: undefined,
    },
  },

  render(createElement: CreateElement): VNode {
    if (this.$scopedSlots.icon) {
      return createElement(
        'div',
        {
          class: this.getElementCssClass('iconWrapper'),
        },
        [
          this.$scopedSlots.icon({}),
        ],
      );
    }

    const htmlSvgPath = getHtmlSvgPath(this.icon as IconName | undefined);

    if (!htmlSvgPath) {
      return createElement();
    }

    return createElement(
      'div',
      {
        class: this.getElementCssClass('iconWrapper'),
      },
      [
        createElement(
          'svg',
          {
            class: this.getElementCssClass('icon'),
            attrs: {
              fill: 'none',
              stroke: 'currentColor',
              viewBox: '0 0 24 24',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            domProps: {
              innerHTML: htmlSvgPath,
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialogIcon;
