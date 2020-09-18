import { shallowMount } from '@vue/test-utils';

import TInput from '../../src/inputs/TInput';
import TAlert from '../../src/components/TAlert';

describe('ComponentClasses', () => {
  it('usually will return the default classes', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        classes: ['bg-red-200'],
        variants: {
          v1: 'bg-blue-100',
          v2: 'bg-yellow-100',
        },
      },
    });

    expect(wrapper.vm.$el.className).toBe('bg-red-200');
  });

  it('will return the active variant classes', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        classes: 'bg-red-200',
        variants: {
          v1: 'bg-blue-100',
          v2: 'bg-yellow-100',
        },
        variant: 'v1',
      },
    });

    expect(wrapper.vm.$el.className).toBe('bg-blue-100');
  });

  it('will return the classes for an element in a collection of classes', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
        classes: {
          wrapper: 'wharever',
          body: 'text-blue-500',
          close: 'border',
          closeIcon: 'wharever',
        },
      },
    });

    const { className } = wrapper.vm.$refs.body;

    expect(className).toBe('text-blue-500');
  });

  it('will return the active variant classes for collection of classes', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
        classes: {
          wrapper: 'wharever',
          body: 'text-blue-500',
          close: 'border',
          closeIcon: 'wharever',
        },
        variants: {
          error: {
            wrapper: 'wharever',
            body: 'text-red-500',
            close: 'border-red-500',
            closeIcon: 'wharever',
          },
        },
        variant: 'error',
      },
    });

    const { className } = wrapper.vm.$refs.body;

    expect(className).toBe('text-red-500');
  });

  it('switch active variant and default classes', async () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        classes: 'bg-red-200',
        variants: {
          v1: 'bg-blue-100',
          v2: 'bg-yellow-100',
        },
      },
    });

    expect(wrapper.vm.$el.className).toBe('bg-red-200');

    wrapper.setProps({ variant: 'v2' });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$el.className).toBe('bg-yellow-100');
  });

  it('doesnt return classes if invalid variant', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        classes: 'bg-red-200',
        variants: {
          v1: 'bg-blue-100',
          v2: 'bg-yellow-100',
        },
        variant: 'invalid',
      },
    });

    expect(wrapper.vm.$el.className).toBe('');
  });

  it('will include both fixed and default classes always', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: 'transition',
        classes: 'bg-red-200',
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });

  it('will include both fixed and default classes merging array and string', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: ['transition'],
        classes: 'bg-red-200',
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });

  it('will include both fixed and default classes merging string and array', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: 'transition',
        classes: ['bg-red-200'],
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });

  it('will include both fixed and default classes merging array and array', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: ['transition'],
        classes: ['bg-red-200'],
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });

  it('will include both fixed and default classes merging object and object', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: { transition: true },
        classes: { 'bg-red-200': true },
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });

  it('will include both fixed and default classes merging array and object', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: ['transition'],
        classes: { 'bg-red-200': true },
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });

  it('will include both fixed and default classes merging object and array', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: { transition: true },
        classes: ['bg-red-200'],
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });

  it('will include both fixed and default classes merging object and string', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: { transition: true },
        classes: 'bg-red-200',
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });
  it('will include both fixed and default classes merging string and object', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: 'transition',
        classes: { 'bg-red-200': true },
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-red-200', 'transition']);
  });

  it('will include both fixed and active variant classes always', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: 'transition',
        classes: 'bg-red-200',
        variants: {
          v1: 'bg-blue-100',
          v2: 'bg-yellow-100',
        },
        variant: 'v1',
      },
    });

    const { className } = wrapper.vm.$el;

    expect(className.split(' ').sort()).toEqual(['bg-blue-100', 'transition']);
  });

  it('will include both fixed and classes always for collection of classes ', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
        fixedClasses: {
          body: 'transition',
        },
        classes: {
          wrapper: 'wharever',
          body: 'text-blue-500',
          close: 'border',
          closeIcon: 'wharever',
        },

      },
    });

    const { className } = wrapper.vm.$refs.body;
    const { className: className2 } = wrapper.vm.$refs.close;

    expect(className.split(' ').sort()).toEqual(['text-blue-500', 'transition']);
    expect(className2).toBe('border');
  });

  it('will include both fixed and active variant classes always for collection of classes', () => {
    const wrapper = shallowMount(TAlert, {
      propsData: {
        show: true,
        fixedClasses: {
          body: 'transition',
        },
        classes: {
          wrapper: 'wharever',
          body: 'text-blue-500',
          close: 'border',
          closeIcon: 'wharever',
        },
        variants: {
          error: {
            wrapper: 'wharever',
            body: 'text-red-500',
            close: 'border-red-500',
            closeIcon: 'wharever',
          },
        },
        variant: 'error',
      },
    });

    const { className } = wrapper.vm.$refs.body;
    const { className: className2 } = wrapper.vm.$refs.close;

    expect(className.split(' ').sort()).toEqual(['text-red-500', 'transition']);
    expect(className2).toBe('border-red-500');
  });

  it('will merge fixed class string to classes string as a string ', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: 'transition',
        classes: 'bg-red-200',
      },
    });

    expect(wrapper.vm.getElementCssClass()).toBe('transition bg-red-200');
  });

  it('will convert an array of strings into a single string', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: 'transition',
        classes: ['bg-red-200'],
      },
    });

    expect(wrapper.vm.getElementCssClass()).toBe('transition bg-red-200');
  });

  it('will convert an array of strings into a single string B', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: ['transition'],
        classes: 'bg-red-200',
      },
    });

    expect(wrapper.vm.getElementCssClass()).toBe('transition bg-red-200');
  });

  it('will convert an array of strings into a single string C', () => {
    const wrapper = shallowMount(TInput, {
      propsData: {
        fixedClasses: ['transition'],
        classes: ['bg-red-200'],
      },
    });

    expect(wrapper.vm.getElementCssClass()).toBe('transition bg-red-200');
  });
});
