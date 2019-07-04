import { shallowMount, mount } from '@vue/test-utils'
import TTable from '@/components/TTable.vue'
import map from 'lodash/map'

describe('TTable.vue', () => {
  it('renders the table', () => {
    const wrapper = shallowMount(TTable)

    expect(wrapper.contains('table')).toBe(true)
  })

  it('renders the headers using only labels', () => {
    const headers = ['Name', 'Email', 'Sales']
    const wrapper = shallowMount(TTable, {
      propsData: {
        headers
      }
    })

    expect(wrapper.findAll('table > thead > tr > th').length).toBe(3)
    
    const ths = wrapper.findAll('table > thead > tr > th')
    headers.forEach((header, index) => {
      expect(ths.at(index).text()).toBe(header)
    })
  })

  it('renders the headers using objects', () => {
    const headers = [{ text: 'Name' }, { text: 'Email'}, { text: 'Sales' }]
    const wrapper = shallowMount(TTable, {
      propsData: {
        headers
      }
    })

    expect(wrapper.findAll('table > thead > tr > th').length).toBe(3)
    
    const ths = wrapper.findAll('table > thead > tr > th')
    headers.forEach((header, index) => {
      expect(ths.at(index).text()).toBe(header.text)
    })
  })

  it('handle empty text in headers', () => {
    const headers = [{ }, { }, { }]
    const wrapper = shallowMount(TTable, {
      propsData: {
        headers
      }
    })

    expect(wrapper.findAll('table > thead > tr > th').length).toBe(3)
    
    const ths = wrapper.findAll('table > thead > tr > th')
    headers.forEach((header, index) => {
      expect(ths.at(index).text()).toBe('')
    })
  })

  it('hide the headers when hide-header is set', () => {
    const headers = ['Name', 'Email', 'Sales']
    const wrapper = shallowMount(TTable, {
      propsData: {
        headers,
        hideHeader: true
      }
    })

    expect(wrapper.vm.showHeader).toBe(false)
    expect(wrapper.find('table > thead').exists()).toBe(false)
  })

  it('renders the data by default when is only text', () => {
    const data = [
      ['Alfonso', 'alfonso@vexilo.com', '$9,999'],
      ['Saida', 'saida@gmail.com', '$1,999'],
      ['Fátima', 'fatima.134@gmail.com', '$0'],
    ]
    
    const wrapper = shallowMount(TTable, {
      propsData: {
        data
      }
    })

    expect(wrapper.findAll('table > tbody > tr').length).toBe(3)
    
    expect(wrapper.findAll('table > tbody > tr').at(0).findAll('td').length).toBe(3)
    
    data.forEach((row, r) => {
      row.forEach((td, c) => {
        expect(wrapper.findAll('table > tbody > tr').at(r).findAll('td').at(c).text()).toBe(td)  
      })
    })
  })

  it('show the footer when show-footer is set', () => {
    const wrapper = shallowMount(TTable)

    expect(wrapper.find('table > tfoot').exists()).toBe(false)

    wrapper.setProps({ showFooter: true })

    expect(wrapper.find('table > tfoot').exists()).toBe(true)
  })

  it('renders the footer using only labels', () => {
    const footerData = ['Name', 'Email', 'Sales']
    const wrapper = shallowMount(TTable, {
      propsData: {
        footerData,
        showFooter: true
      }
    })

    expect(wrapper.findAll('table > tfoot > tr > td').length).toBe(3)
    
    const ths = wrapper.findAll('table > tfoot > tr > td')
    footerData.forEach((header, index) => {
      expect(ths.at(index).text()).toBe(header)
    })
  })
})
