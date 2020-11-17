import { CreateElement, VNode, VNodeChildren } from 'vue';
import { guessOptionText } from '../utils/inputOptions';
import TRichSelectInterface from '../types/TRichSelect';
import NormalizedOptions from '../types/NormalizedOptions';
import NormalizedOption from '../types/NormalizedOption';
import Key from '../types/Key';

export default class TRichSelectRenderer {
  createElement: CreateElement

  component: TRichSelectInterface

  constructor(createElement: CreateElement, component: TRichSelectInterface) {
    this.createElement = createElement;
    this.component = component;
  }

  render(): VNode {
    return this.createWrapper();
  }

  /**
   * Div that wraps the whole component
   */
  createWrapper(): VNode {
    return this.createElement(
      'div',
      {
        ref: 'wrapper',
        class: this.component.getElementCssClass('wrapper'),
      },
      [
        this.createSelectButtonWrapper(),
        this.createDropdown(),
      ],
    );
  }

  /**
   * Div that wraps the button that is used as a select box
   */
  createSelectButtonWrapper(): VNode {
    const subElements = [this.createSelectButton()];

    if (this.component.clearable && this.component.selectedOption && !this.component.disabled) {
      subElements.push(this.createSelectButtonClearButton());
    }

    return this.createElement(
      'div',
      {
        ref: 'buttonWrapper',
        class: this.component.getElementCssClass('buttonWrapper'),
      },
      subElements,
    );
  }

  /**
   * The button that is used a select box
   */
  createSelectButton(): VNode {
    const subElements = [];

    if (this.component.selectedOption) {
      if (this.component.$scopedSlots.label) {
        subElements.push(this.component.$scopedSlots.label({
          query: this.component.query,
          option: this.component.selectedOption,
          className: this.component.getElementCssClass('selectButtonLabel'),
        }));
      } else {
        subElements.push(this.createSelectButtonLabel());
      }
    } else {
      subElements.push(this.createSelectButtonPlaceholder());
    }

    if (!(this.component.clearable && this.component.selectedOption) && !this.component.disabled) {
      subElements.push(this.createSelectButtonIcon());
    }

    return this.createElement(
      'button',
      {
        ref: 'selectButton',
        attrs: {
          type: 'button',
          value: this.component.localValue,
          id: this.component.id,
          autofocus: this.component.autofocus,
          disabled: this.component.disabled,
          name: this.component.name,
        },
        class: this.component.getElementCssClass('selectButton'),
        on: {
          click: this.component.clickHandler,
          focus: this.component.focusHandler,
          keydown: (e: KeyboardEvent) => {
            if (e.keyCode === Key.DOWN) {
              this.component.arrowDownHandler(e);
            } else if (e.keyCode === Key.UP) {
              this.component.arrowUpHandler(e);
            } else if (e.keyCode === Key.ENTER) {
              this.component.enterHandler(e);
            } else if (e.keyCode === Key.ESC) {
              this.component.escapeHandler(e);
            }
          },
          blur: this.component.blurHandler,
          mousedown: (e: MouseEvent) => {
            e.preventDefault();
          },
        },
      },
      subElements,
    );
  }

  createSelectButtonLabel(): VNode {
    return this.createElement(
      'span',
      {
        ref: 'selectButtonLabel',
        class: this.component.getElementCssClass('selectButtonLabel'),
      },
      (this.component.selectedOption ? this.component.selectedOption.text : '') as VNodeChildren,
    );
  }

  createSelectButtonPlaceholder(): VNode {
    const domProps: {innerHTML?: string} = {};
    if (!this.component.placeholder) {
      domProps.innerHTML = '&nbsp;';
    }
    return this.createElement(
      'span',
      {
        ref: 'selectButtonPlaceholder',
        class: this.component.getElementCssClass('selectButtonPlaceholder'),
        domProps,
      },
      this.component.placeholder || undefined,
    );
  }

  createSelectButtonIcon(): VNode {
    return this.createElement(
      'svg',
      {
        ref: 'selectButtonIcon',
        attrs: {
          fill: 'currentColor',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 20 20',
        },
        class: this.component.getElementCssClass('selectButtonIcon'),
      },
      [
        this.createElement('path', {
          attrs: {
            'clip-rule': 'evenodd',
            'fill-rule': 'evenodd',
            d: 'M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
          },
        }),
      ],
    );
  }

  createSelectButtonClearButton(): VNode {
    return this.createElement(
      'button',
      {
        ref: 'selectButtonClearButton',
        class: this.component.getElementCssClass('selectButtonClearButton'),
        attrs: {
          type: 'button',
          tabindex: -1,
        },
        on: {
          click: this.component.clearButtonClickHandler,
        },
      },
      [
        this.createElement(
          'svg',
          {
            attrs: {
              fill: 'currentColor',
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 20 20',
            },
            class: this.component.getElementCssClass('selectButtonClearIcon'),
          },
          [
            this.createElement('polygon', {
              attrs: {
                points: '10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644',
              },
            }),
          ],
        ),
      ],
    );
  }

  /**
   * Div that wraps the search box
   */
  createSearchBoxWrapper(): VNode {
    return this.createElement(
      'div',
      {
        ref: 'searchWrapper',
        class: this.component.getElementCssClass('searchWrapper'),
      },
      [
        this.createSearchBox(),
      ],
    );
  }

  /**
   * Filter search box
   */
  createSearchBox() : VNode {
    return this.createElement(
      'input',
      {
        ref: 'searchBox',
        class: this.component.getElementCssClass('searchBox'),
        domProps: {
          value: this.component.query,
        },
        attrs: {
          placeholder: this.component.searchBoxPlaceholder,
        },
        on: {
          keydown: (e: KeyboardEvent) => {
            if (e.keyCode === Key.DOWN) {
              this.component.arrowDownHandler(e);
            } else if (e.keyCode === Key.UP) {
              this.component.arrowUpHandler(e);
            } else if (e.keyCode === Key.ENTER) {
              this.component.enterHandler(e);
            } else if (e.keyCode === Key.ESC) {
              this.component.escapeHandler(e);
            }
          },
          blur: this.component.blurHandler,
          input: this.component.searchInputHandler,
        },
      },
    );
  }

  getMinimumInputLengthText(): string {
    if (typeof this.component.minimumInputLengthText === 'function') {
      return this.component.minimumInputLengthText(
        this.component.minimumInputLength as number,
        this.component.query,
      );
    }

    return this.component.minimumInputLengthText;
  }

  /**
   * The div used as dropdown with the options and the search box
   */
  createDropdown(): VNode {
    const subElements = [];

    if (this.component.shouldShowSearchbox) {
      subElements.push(this.createSearchBoxWrapper());
    }

    if (this.component.$scopedSlots.dropdownUp) {
      subElements.push(this.component.$scopedSlots.dropdownUp({
        query: this.component.query,
        selectedOption: this.component.selectedOption,
        options: this.component.filteredOptions,
      }));
    }

    if (this.component.searching && !this.component.nextPage) {
      if (this.component.$scopedSlots.searchingText) {
        subElements.push(this.component.$scopedSlots.searchingText({
          text: this.component.searchingText,
          query: this.component.query,
          className: this.component.getElementCssClass('dropdownFeedback'),
        }));
      } else {
        subElements.push(this.createDropdownFeedback(this.component.searchingText));
      }
    } else if (this.component.minimumInputLength !== undefined
        && this.component.query.length < this.component.minimumInputLength) {
      const minInputLengthText = this.getMinimumInputLengthText();
      subElements.push(this.createDropdownFeedback(minInputLengthText));
    } else if (!this.component.filteredOptions.length) {
      if (this.component.$scopedSlots.noResults) {
        subElements.push(this.component.$scopedSlots.noResults({
          text: this.component.noResultsText,
          query: this.component.query,
          className: this.component.getElementCssClass('dropdownFeedback'),
        }));
      } else {
        subElements.push(this.createDropdownFeedback(this.component.noResultsText));
      }
    }

    if (this.component.filteredOptions.length) {
      subElements.push(this.createOptionsList(this.component.filteredOptions));
    }

    if (this.component.searching && this.component.nextPage) {
      if (this.component.$scopedSlots.loadingMoreResultsText) {
        subElements.push(this.component.$scopedSlots.loadingMoreResultsText({
          text: this.component.loadingMoreResultsText,
          nextPage: this.component.nextPage,
          query: this.component.query,
          className: this.component.getElementCssClass('loadingMoreResults'),
        }));
      } else {
        subElements.push(this.createLoadingMoreResults(this.component.loadingMoreResultsText));
      }
    }

    if (this.component.$scopedSlots.dropdownDown) {
      subElements.push(this.component.$scopedSlots.dropdownDown({
        query: this.component.query,
        selectedOption: this.component.selectedOption,
        options: this.component.filteredOptions,
      }));
    }

    return this.createElement(
      'transition',
      {
        props: {
          enterClass: this.component.getElementCssClass('enterClass'),
          enterActiveClass: this.component.getElementCssClass('enterActiveClass'),
          enterToClass: this.component.getElementCssClass('enterToClass'),
          leaveClass: this.component.getElementCssClass('leaveClass'),
          leaveActiveClass: this.component.getElementCssClass('leaveActiveClass'),
          leaveToClass: this.component.getElementCssClass('leaveToClass'),
        },
      },
      this.component.show ? [
        this.createElement(
          'div',
          {
            ref: 'dropdown',
            class: this.component.getElementCssClass('dropdown'),
          },
          subElements,
        ),
      ] : undefined,
    );
  }

  /**
   * Options list wrapper
   */
  createOptionsList(options: NormalizedOptions): VNode {
    return this.createElement(
      'ul',
      {
        ref: 'optionsList',
        class: this.component.getElementCssClass('optionsList'),
        style: {
          maxHeight: this.component.normalizedHeight,
        },
        on: {
          scroll: this.component.listScrollHandler,
        },

      },
      this.createOptions(options),
    );
  }

  /**
   * Dropdown feedback
   * @param text
   */
  createDropdownFeedback(text: string): VNode {
    return this.createElement(
      'div',
      {
        ref: 'dropdownFeedback',
        class: this.component.getElementCssClass('dropdownFeedback'),
      },
      text,
    );
  }

  /**
   * Dropdown feedback
   * @param text
   */
  createLoadingMoreResults(text: string): VNode {
    return this.createElement(
      'div',
      {
        ref: 'loadingMoreResults',
        class: this.component.getElementCssClass('loadingMoreResults'),
      },
      text,
    );
  }

  /**
   * List of options
   */
  createOptions(options: NormalizedOptions): VNode[] {
    let index = -1;
    return options
      .map((option: NormalizedOption) => {
        if (option.children) {
          return [
            option,
            ...option.children,
          ];
        }

        return option;
      })
      .flat()
      .map((option: NormalizedOption) => {
        if (option.children) {
          return this.createOptgroup(option);
        }
        index += 1;
        return this.createOption(option, index);
      });
  }

  /**
   * Creates an optgroup element
   * @param option
   * @param index
   */
  createOptgroup(
    optgroup: NormalizedOption,
  ): VNode {
    return this.createElement(
      'li',
      {
        attrs: {
          'data-type': 'optgroup',
        },
        class: this.component.getElementCssClass('optgroup'),
      },
      guessOptionText(optgroup, this.component.textAttribute),
    );
  }

  /**
   * Builds an option element
   * @param option
   * @param index
   */
  createOption(
    option: NormalizedOption,
    index: number,
  ): VNode {
    const isSelected = this.component.optionHasValue(
      option, this.component.localValue,
    );
    const isHighlighted = this.component.highlighted === index;

    let className;

    if (option.disabled) {
      className = this.component.getElementCssClass('disabledOption');
    } else if (isHighlighted && isSelected) {
      className = this.component.getElementCssClass('selectedHighlightedOption');
    } else if (isHighlighted) {
      className = this.component.getElementCssClass('highlightedOption');
    } else if (isSelected) {
      className = this.component.getElementCssClass('selectedOption');
    } else {
      className = this.component.getElementCssClass('option');
    }

    const subElements = [];

    if (this.component.$scopedSlots.option) {
      subElements.push(this.component.$scopedSlots.option({
        index,
        isHighlighted,
        isSelected,
        option,
        query: this.component.query,
        className: this.component.getElementCssClass('optionContent'),
      }));
    } else {
      subElements.push(this.createOptionContent(option, isSelected));
    }

    return this.createElement(
      'li',
      {
        ref: 'option',
        class: className,
        attrs: {
          'data-type': 'option',
        },
        on: {
          mouseover: () => {
            this.component.highlighted = index;
          },
          mouseleave: () => {
            this.component.highlighted = null;
          },
          mousedown: (e: MouseEvent) => {
            e.preventDefault();
          },
          click: (e: MouseEvent) => {
            e.preventDefault();

            if (option.disabled) {
              return;
            }

            this.component.selectOption(option);
          },
        },
      },
      subElements,
    );
  }

  createOptionContent(option: NormalizedOption, isSelected: boolean): VNode {
    const subElements = [
      this.createOptionLabel(option),
    ];

    if (isSelected) {
      subElements.push(this.createOptionSelectedIcon());
    }

    return this.createElement(
      'div',
      {
        ref: 'optionContent',
        class: this.component.getElementCssClass('optionContent'),
      },
      subElements,
    );
  }

  createOptionLabel(option: NormalizedOption): VNode {
    return this.createElement(
      'span',
      {
        ref: 'optionLabel',
        class: this.component.getElementCssClass('optionLabel'),
      },
      option.text as VNodeChildren,
    );
  }

  createOptionSelectedIcon(): VNode {
    return this.createElement(
      'svg',
      {
        ref: 'selectedIcon',
        attrs: {
          fill: 'currentColor',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 20 20',
        },
        class: this.component.getElementCssClass('selectedIcon'),
      },
      [
        this.createElement('polygon', {
          attrs: {
            points: '0 11 2 9 7 14 18 3 20 5 7 18',
          },
        }),
      ],
    );
  }
}
