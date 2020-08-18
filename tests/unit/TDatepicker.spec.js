import { mount, shallowMount } from '@vue/test-utils';
import TDatepicker from '@/components/TDatepicker';
import { wrap } from 'lodash';

describe('TDatepicker', () => {
  it('renders the date picker text and hidden input', () => {
    const wrapper = mount(TDatepicker);
    expect(wrapper.get('input[type=text]')).toBeTruthy();
    expect(wrapper.get('input[type=hidden]')).toBeTruthy();
  });

  it('accepts a date as string in the default format', () => {
    const date = '1987-02-18';
    const expectedDate = new Date(1987, 1, 18);

    const wrapper = shallowMount(TDatepicker, {
      propsData: {
        value: date,
      },
    });

    expect(wrapper.vm.localValue).toEqual(expectedDate);
    expect(wrapper.vm.formatedDate).toEqual(date);
  });

  it('accepts a date as date object', () => {
    const date = new Date(1987, 1, 18);
    const expectedDate = new Date(1987, 1, 18);
    const formatedDate = '1987-02-18';

    const wrapper = shallowMount(TDatepicker, {
      propsData: {
        value: date,
      },
    });

    expect(wrapper.vm.localValue).toEqual(expectedDate);
    expect(wrapper.vm.formatedDate).toEqual(formatedDate);
  });

  it('accepts a date with custom format', () => {
    const date = '02/18/1987';
    const expectedDate = new Date(1987, 1, 18);

    const wrapper = shallowMount(TDatepicker, {
      propsData: {
        value: date,
        dateFormat: 'm/d/Y',
      },
    });

    expect(wrapper.vm.localValue).toEqual(expectedDate);
    expect(wrapper.vm.formatedDate).toEqual(date);
  });

  it('fill the inputs with the user date and formatted date as expected', () => {
    const date = '02/18/1987';
    const userFormatedDate = 'Wed, 18 of February 1987';
    const expectedDate = new Date(1987, 1, 18);

    const wrapper = mount(TDatepicker, {
      propsData: {
        value: date,
        dateFormat: 'm/d/Y',
        userFormat: 'D, d of F Y',
      },
    });

    expect(wrapper.vm.localValue).toEqual(expectedDate);
    expect(wrapper.vm.formatedDate).toBe(date);
    expect(wrapper.vm.userFormatedDate).toBe(userFormatedDate);

    expect(wrapper.vm.$el.querySelector('input[type=text]').value).toBe(userFormatedDate);
    expect(wrapper.vm.$el.querySelector('input[type=hidden]').value).toBe(date);
  });

  it('opens the calendar picker when input is focus', () => {
    const wrapper = mount(TDatepicker);
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(false);
    wrapper.vm.focus();
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(true);
  });

  it('opens/close the calendar picker when input is focus/blur alt test', () => {
    const wrapper = mount(TDatepicker);

    const input = wrapper.vm.$el.querySelector('input[type=text]');
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(false);

    input.dispatchEvent(new Event('focus'));
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(true);

    input.dispatchEvent(new Event('blur'));
    expect(wrapper.vm.$refs.dropdown.localShow).toBe(false);
  });
});
