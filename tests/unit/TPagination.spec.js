import { shallowMount, mount } from '@vue/test-utils'
import TPagination from '@/components/TPagination.vue'
import range from 'lodash/range'

describe('TPagination.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(TPagination)

    expect(wrapper.contains('ul')).toBe(true)
  })

  it('renders the component with custom wrapper tag', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        tagName: 'div'
      }
    })

    expect(wrapper.contains('div')).toBe(true)
  })

  it('renders every item according to the totalRows, perPage and limit', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalRows: 100,
        perPage: 10,
        limit: 5,
      }
    })

    expect(wrapper.findAll('li').length).toBe(5)

    range(5).forEach((i) => {
      expect(wrapper.findAll('li').at(i).text()).toBe(String(i+1))
    })
  })

  it('When init the current page is the same as the value', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        value: 3,
      }
    })

    expect(wrapper.vm.currentPage).toBe(3)
  })

  it('When the value change it change the current page', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        value: 3,
      }
    })

    wrapper.setProps({ value: 1})

    expect(wrapper.vm.currentPage).toBe(1)
  })

  it('When click a page it change the current value', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalRows: 100,
        perPage: 10,
        limit: 5,
        value: 1,
      }
    })

    wrapper.findAll('button').at(3).trigger('click')

    // 3 is the index 4 is the page
    expect(wrapper.vm.currentPage).toBe(4)

    expect(wrapper.emitted('input')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('input').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('input')[0]).toEqual([4])

    expect(wrapper.emitted('change')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted('change').length).toBe(1)

    // assert event payload
    expect(wrapper.emitted('change')[0]).toEqual([4])
  })

  it('limit the number of pages buttons', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalRows: 100,
        perPage: 10,
        limit: 5,
      }
    })

    // More pages set the limit
    expect(wrapper.vm.pagesButtons.length).toBe(5)

    // Exact number of pages
    wrapper.setProps({ totalRows: 50, perPage: 10 })
    expect(wrapper.vm.pagesButtons.length).toBe(5)

    // Less pages
    wrapper.setProps({ totalRows: 23, perPage: 10 })
    expect(wrapper.vm.pagesButtons.length).toBe(3)

    // One more for fun
    wrapper.setProps({ totalRows: 10, perPage: 3 })
    expect(wrapper.vm.pagesButtons.length).toBe(4)
  })

  it('calculate the number of pages', () => {
    const wrapper = shallowMount(TPagination, {
      propsData: {
        totalRows: 100,
        perPage: 10,
        limit: 5,
      }
    })

    expect(wrapper.vm.totalPages).toBe(10)

    wrapper.setProps({ perPage: 49 })
    expect(wrapper.vm.totalPages).toBe(3)

    wrapper.setProps({ perPage: 50 })
    expect(wrapper.vm.totalPages).toBe(2)

    wrapper.setProps({ perPage: 51 })
    expect(wrapper.vm.totalPages).toBe(2)

    wrapper.setProps({ perPage: 99 })
    expect(wrapper.vm.totalPages).toBe(2)

    wrapper.setProps({ perPage: 100 })
    expect(wrapper.vm.totalPages).toBe(1)

    wrapper.setProps({ perPage: 101 })
    expect(wrapper.vm.totalPages).toBe(1)

    wrapper.setProps({ totalRows: 0, perPage: 0 })
    expect(wrapper.vm.totalPages).toBe(0)

    wrapper.setProps({ totalRows: 0, perPage: 0 })
    expect(wrapper.vm.totalPages).toBe(0)
  })
})
