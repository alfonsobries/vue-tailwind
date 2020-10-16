import Vue, { CreateElement, VNode } from 'vue';

const TDialogOverlayWrapperTransitionDialogLoader = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialogLoader',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    busy: {
      type: Boolean,
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
    if (!this.busy) {
      return createElement();
    }

    if (this.$scopedSlots.loader) {
      return createElement(
        'div',
        {
          class: this.getElementCssClass('busyWrapper'),
        },
        [
          this.$scopedSlots.loader({}),
        ],
      );
    }

    return createElement(
      'div',
      {
        class: this.getElementCssClass('busyWrapper'),
      },
      [
        createElement(
          'svg',
          {
            attrs: {
              xmlns: 'http://www.w3.org/2000/svg',
              width: 32,
              height: 32,
              viewBox: '0 0 32 32',
            },
            class: this.getElementCssClass('busyIcon'),
          },
          [
            createElement('g', {
              attrs: {
                transform: 'scale(0.03125 0.03125)',
              },
            },
            [
              createElement('path', {
                attrs: {
                  d: 'M512 1024c-136.76 0-265.334-53.258-362.040-149.96-96.702-96.706-149.96-225.28-149.96-362.040 0-96.838 27.182-191.134 78.606-272.692 50-79.296 120.664-143.372 204.356-185.3l43 85.832c-68.038 34.084-125.492 86.186-166.15 150.67-41.746 66.208-63.812 142.798-63.812 221.49 0 229.382 186.618 416 416 416s416-186.618 416-416c0-78.692-22.066-155.282-63.81-221.49-40.66-64.484-98.114-116.584-166.15-150.67l43-85.832c83.692 41.928 154.358 106.004 204.356 185.3 51.422 81.558 78.604 175.854 78.604 272.692 0 136.76-53.258 265.334-149.96 362.040-96.706 96.702-225.28 149.96-362.040 149.96z',
                },
              }),
            ]),
          ],
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialogLoader;
