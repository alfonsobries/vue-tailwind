import Vue, { CreateElement, VNode } from 'vue';

const TDialogOverlayWrapperTransitionDialogClose = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialogClose',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    showCloseButton: {
      type: Boolean,
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
    if (!this.showCloseButton) {
      return createElement();
    }

    if (this.$scopedSlots.closeButton) {
      return createElement(
        'button',
        {
          class: this.getElementCssClass('close'),
          attrs: {
            type: 'button',
          },
          on: {
            click: (e: MouseEvent) => this.$emit('hide', e),
          },
        },
        [
          this.$scopedSlots.closeButton({}),
        ],
      );
    }

    return createElement(
      'button',
      {
        class: this.getElementCssClass('close'),
        attrs: {
          type: 'button',
        },
        on: {
          click: (e: MouseEvent) => this.$emit('hide', e),
        },
      },
      [
        createElement(
          'svg',
          {
            attrs: {
              fill: 'currentColor',
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 20 20',
            },
            class: this.getElementCssClass('closeIcon'),
          },
          [
            createElement('path', {
              attrs: {
                'clip-rule': 'evenodd',
                'fill-rule': 'evenodd',
                d: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
              },
            }),
          ],
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialogClose;
