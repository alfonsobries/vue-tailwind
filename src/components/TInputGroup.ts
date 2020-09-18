import intersection from 'lodash/intersection';
import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';

const TInputGroup = Component.extend({
  name: 'TInputGroup',

  props: {
    inputName: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    feedback: {
      type: String,
      default: undefined,
    },
    sortedElements: {
      type: Array,
      default: (): string[] => (['label', 'default', 'feedback', 'description']),
      validator(value) {
        const expectedValues = ['default', 'description', 'feedback', 'label'];
        return value.length === intersection(value, expectedValues).length;
      },
    },
    classes: {
      type: Object,
      default: undefined,
    },
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },


  computed: {
    /**
     * Only render the elements that has a prop or a slot (always the default prop)
     * @return {Array}
     */
    elementsToRender(): string[] {
      const props = this.$props;
      const slots = this.$slots;
      return (this.sortedElements as string[])
        .filter((e) => e === 'default' || !!props[e] || !!slots[e]);
    },
  },

  methods: {
    render(createElement: CreateElement): VNode {
      return createElement(
        'div',
        {
          ref: 'wrapper',
          class: this.getElementCssClass('wrapper'),
        },
        this.elementsToRender.map((elementName) => createElement(
          this.getTagName(elementName),
          {
            ref: elementName,
            class: this.getElementCssClass(elementName === 'default' ? 'body' : elementName),
            attrs: {
              for: elementName === 'label' ? this.inputName : undefined,
            },
            slot: elementName,
          },
          this.$slots[elementName] || this.$props[elementName],
        )),
      );
    },

    /**
     * Get the tag name according to the slot name
     * @param  {String} slotName
     * @return {String}
     */
    getTagName(slotName: string) {
      switch (slotName) {
        case 'label':
          return 'label';
        default:
          return 'div';
      }
    },
  },
});

export default TInputGroup;
