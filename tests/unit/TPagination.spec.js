import { shallowMount } from '@vue/test-utils';
import TPagination from '../../src/components/TPagination';

describe('TPagination', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(TPagination);

    expect(wrapper.get('ul')).toBeTruthy();
  });

  it('renders the component with custom wrapper tag', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        tagName: 'div',
      },
    });

    expect(wrapper.get('div')).toBeTruthy();
  });

  it('renders every item according to the totalItems, perPage and limit', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
      },
    });

    // 5 rows + 4 controls
    expect(wrapper.findAll('li').length).toBe(5 + 4);

    expect(wrapper.findAll('li').at(0).text()).toBe('«');
    expect(wrapper.findAll('li').at(1).text()).toBe('‹');
    expect(wrapper.findAll('li').at(2).text()).toBe('1');
    expect(wrapper.findAll('li').at(3).text()).toBe('2');
    expect(wrapper.findAll('li').at(4).text()).toBe('3');
    expect(wrapper.findAll('li').at(5).text()).toBe('4');
    expect(wrapper.findAll('li').at(6).text()).toBe('…');
    expect(wrapper.findAll('li').at(7).text()).toBe('›');
    expect(wrapper.findAll('li').at(8).text()).toBe('»');
  });

  it('when ellipsis is hidden still show the number of items according to the limit', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
        hideEllipsis: true,
      },
    });

    // 5 rows + 4 controls
    expect(wrapper.findAll('li').length).toBe(5 + 4);

    expect(wrapper.findAll('li').at(0).text()).toBe('«');
    expect(wrapper.findAll('li').at(1).text()).toBe('‹');
    expect(wrapper.findAll('li').at(2).text()).toBe('1');
    expect(wrapper.findAll('li').at(3).text()).toBe('2');
    expect(wrapper.findAll('li').at(4).text()).toBe('3');
    expect(wrapper.findAll('li').at(5).text()).toBe('4');
    expect(wrapper.findAll('li').at(6).text()).toBe('5');
    expect(wrapper.findAll('li').at(7).text()).toBe('›');
    expect(wrapper.findAll('li').at(8).text()).toBe('»');
  });

  it('When init the current page is the same as the value', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        value: 3,
      },
    });

    expect(wrapper.vm.currentPage).toBe(3);
  });

  it('When the value change it change the current page', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        value: 3,
      },
    });

    wrapper.setProps({ value: 1 });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentPage).toBe(1);
  });

  it('when click a page it change the current value', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
        value: 1,
      },
    });

    // third item plus two
    wrapper.findAll('button').at(3 + 2).trigger('click');

    await wrapper.vm.$nextTick();

    // 3 is the index 4 is the page
    expect(wrapper.vm.currentPage).toBe(4);

    expect(wrapper.emitted('input')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([4]);

    expect(wrapper.emitted('change')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([4]);
  });

  it('limit the number of pages buttons', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
      },
    });

    // More pages set the limit
    expect(wrapper.vm.pageButtons.length).toBe(5);

    // Exact number of pages
    await wrapper.setProps({ totalItems: 50, perPage: 10 });
    expect(wrapper.vm.pageButtons.length).toBe(5);

    // Less pages
    await wrapper.setProps({ totalItems: 23, perPage: 10 });
    expect(wrapper.vm.pageButtons.length).toBe(3);

    // One more for fun
    await wrapper.setProps({ totalItems: 10, perPage: 3 });
    expect(wrapper.vm.pageButtons.length).toBe(4);
  });

  it('calculate the number of pages', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
      },
    });

    expect(wrapper.vm.totalPages).toBe(10);

    await wrapper.setProps({ perPage: 49 });
    expect(wrapper.vm.totalPages).toBe(3);

    await wrapper.setProps({ perPage: 50 });
    expect(wrapper.vm.totalPages).toBe(2);

    await wrapper.setProps({ perPage: 51 });
    expect(wrapper.vm.totalPages).toBe(2);

    await wrapper.setProps({ perPage: 99 });
    expect(wrapper.vm.totalPages).toBe(2);

    await wrapper.setProps({ perPage: 100 });
    expect(wrapper.vm.totalPages).toBe(1);

    await wrapper.setProps({ perPage: 101 });
    expect(wrapper.vm.totalPages).toBe(1);

    await wrapper.setProps({ totalItems: 0, perPage: 0 });
    expect(wrapper.vm.totalPages).toBe(0);

    await wrapper.setProps({ totalItems: 0, perPage: 0 });
    expect(wrapper.vm.totalPages).toBe(0);
  });

  it('add the more button when it have more items', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
      },
    });

    expect(wrapper.vm.pageButtons).toEqual(['1', '2', '3', '4', 'more']);
  });

  it('add the less button when it have less items', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
        value: 5,
      },
    });

    expect(wrapper.vm.pageButtons).toEqual(['less', '4', '5', '6', 'more']);
  });

  it('add the less button until after the half range', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
        value: 3,
      },
    });

    expect(wrapper.vm.pageButtons).toEqual(['1', '2', '3', '4', 'more']);

    wrapper.setProps({ value: 4 });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pageButtons).toEqual(['less', '3', '4', '5', 'more']);
  });

  it('the limit of the range is the last page', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 10,
        perPage: 1,
        value: 7,
        limit: 5,
      },
    });

    expect(wrapper.vm.pageButtons).toEqual(['less', '6', '7', '8', 'more']);

    wrapper.setProps({ value: 8 });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pageButtons).toEqual(['less', '7', '8', '9', '10']);
  });

  it('doesnt add more or less buttons when doesnt has enough pages', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 10,
        perPage: 2,
        value: 3,
      },
    });

    expect(wrapper.vm.pageButtons).toEqual(['1', '2', '3', '4', '5']);
  });


  it('hides the end/last controlls when configured', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
      },
    });

    // 5 rows + 4 controls
    expect(wrapper.findAll('li').length).toBe(5 + 4);

    expect(wrapper.findAll('li').at(0).text()).toBe('«');
    expect(wrapper.findAll('li').at(1).text()).toBe('‹');
    expect(wrapper.findAll('li').at(7).text()).toBe('›');
    expect(wrapper.findAll('li').at(8).text()).toBe('»');

    wrapper.setProps({ hideFirstLastControls: true });
    await wrapper.vm.$nextTick();
    // 5 rows (just 2 controls)
    expect(wrapper.findAll('li').length).toBe(5 + 2);

    expect(wrapper.findAll('li').at(0).text()).toBe('‹');
    expect(wrapper.findAll('li').at(1).text()).toBe('1');
    expect(wrapper.findAll('li').at(6).text()).toBe('›');
  });

  it('hides the prev/last controlls when configured', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
      },
    });

    // 5 rows + 4 controls
    expect(wrapper.findAll('li').length).toBe(5 + 4);

    expect(wrapper.findAll('li').at(0).text()).toBe('«');
    expect(wrapper.findAll('li').at(1).text()).toBe('‹');
    expect(wrapper.findAll('li').at(7).text()).toBe('›');
    expect(wrapper.findAll('li').at(8).text()).toBe('»');

    wrapper.setProps({ hidePrevNextControls: true });
    await wrapper.vm.$nextTick();
    // 5 rows (just 2 controls)
    expect(wrapper.findAll('li').length).toBe(5 + 2);

    expect(wrapper.findAll('li').at(0).text()).toBe('«');
    expect(wrapper.findAll('li').at(1).text()).toBe('1');
    expect(wrapper.findAll('li').at(6).text()).toBe('»');
  });

  it('accepts different labels in controls', async () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalItems: 100,
        perPage: 10,
        limit: 5,
      },
    });

    expect(wrapper.findAll('li').at(0).text()).toBe('«');
    expect(wrapper.findAll('li').at(1).text()).toBe('‹');
    expect(wrapper.findAll('li').at(6).text()).toBe('…');
    expect(wrapper.findAll('li').at(7).text()).toBe('›');
    expect(wrapper.findAll('li').at(8).text()).toBe('»');

    wrapper.setProps({
      firstLabel: 'principio',
      lastLabel: 'último',
      nextLabel: 'siguiente',
      prevLabel: 'antes',
      ellipsisLabel: 'más...',
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('li').at(0).text()).toBe('principio');
    expect(wrapper.findAll('li').at(1).text()).toBe('antes');
    expect(wrapper.findAll('li').at(6).text()).toBe('más...');
    expect(wrapper.findAll('li').at(7).text()).toBe('siguiente');
    expect(wrapper.findAll('li').at(8).text()).toBe('último');
  });
});
