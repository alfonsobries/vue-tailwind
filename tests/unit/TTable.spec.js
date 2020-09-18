import { shallowMount } from '@vue/test-utils';
import TTable from '../../src/components/TTable';

describe('TTable', () => {
  it('renders the table', () => {
    const wrapper = shallowMount(TTable);

    expect(wrapper.get('table')).toBeTruthy();
  });

  it('renders the headers using only labels', () => {
    const headers = ['Name', 'Email', 'Sales'];
    const wrapper = shallowMount(TTable, {
      propsData: {
        headers,
      },
    });

    expect(wrapper.findAll('table > thead > tr > th').length).toBe(3);

    const ths = wrapper.findAll('table > thead > tr > th');
    headers.forEach((header, index) => {
      expect(ths.at(index).text()).toBe(header);
    });
  });

  it('renders the headers using objects', () => {
    const headers = [{ text: 'Name' }, { text: 'Email' }, { text: 'Sales' }];
    const wrapper = shallowMount(TTable, {
      propsData: {
        headers,
      },
    });

    expect(wrapper.findAll('table > thead > tr > th').length).toBe(3);

    const ths = wrapper.findAll('table > thead > tr > th');
    headers.forEach((header, index) => {
      expect(ths.at(index).text()).toBe(header.text);
    });
  });

  it('handle empty text in headers', () => {
    const headers = [{ }, { }, { }];
    const wrapper = shallowMount(TTable, {
      propsData: {
        headers,
      },
    });

    expect(wrapper.findAll('table > thead > tr > th').length).toBe(3);

    const ths = wrapper.findAll('table > thead > tr > th');
    headers.forEach((header, index) => {
      expect(ths.at(index).text()).toBe('');
    });
  });

  it('hide the headers when hide-header is set', () => {
    const headers = ['Name', 'Email', 'Sales'];
    const wrapper = shallowMount(TTable, {
      propsData: {
        headers,
        hideHeader: true,
      },
    });

    expect(wrapper.vm.showHeader).toBe(false);
    expect(wrapper.find('table > thead').exists()).toBe(false);
  });

  it('renders the data by default when is only text', () => {
    const data = [
      ['Alfonso', 'alfonso@vexilo.com', '$9,999'],
      ['Saida', 'saida@gmail.com', '$1,999'],
      ['Regina', 'regina.134@gmail.com', '$0'],
    ];

    const wrapper = shallowMount(TTable, {
      propsData: {
        data,
      },
    });

    expect(wrapper.findAll('table > tbody > tr').length).toBe(3);

    expect(wrapper.findAll('table > tbody > tr').at(0).findAll('td').length).toBe(3);

    data.forEach((row, r) => {
      row.forEach((td, c) => {
        expect(wrapper.findAll('table > tbody > tr').at(r).findAll('td').at(c)
          .text()).toBe(td);
      });
    });
  });

  it('renders all the data attributes attributes when are objects', () => {
    const data = [
      {
        id: 1,
        name: 'Alfonso Bribiesca',
        email: 'alfonso@vexilo.com',
        sales: '$9,999',
      },
      {
        id: 2,
        name: 'Saida',
        email: 'saida@gmail.com',
        sales: '$1,999',
      },
      {
        id: 3,
        name: 'Regina',
        email: 'regina.123@gmail.com',
        sales: '$0',
      },
    ];

    const wrapper = shallowMount(TTable, {
      propsData: {
        data,
      },
    });

    // 3 items
    expect(wrapper.findAll('table > tbody > tr').length).toBe(3);

    // 4 attribues
    expect(wrapper.findAll('table > tbody > tr').at(0).findAll('td').length).toBe(4);

    data.forEach((row, r) => {
      Object.keys(row).forEach((attrib, c) => {
        expect(wrapper.findAll('table > tbody > tr').at(r).findAll('td').at(c)
          .text()).toBe(String(row[attrib]));
      });
    });
  });

  it('renders only the data attributes that are part of the headers values', () => {
    const headers = [{ value: 'name', text: 'Name' }, { value: 'sales', text: 'Sales' }];
    const data = [
      {
        id: 1,
        name: 'Alfonso Bribiesca',
        email: 'alfonso@vexilo.com',
        sales: '$9,999',
      },
      {
        id: 2,
        name: 'Saida',
        email: 'saida@gmail.com',
        sales: '$1,999',
      },
      {
        id: 3,
        name: 'Regina',
        email: 'regina.123@gmail.com',
        sales: '$0',
      },
    ];

    const wrapper = shallowMount(TTable, {
      propsData: {
        headers,
        data,
      },
    });

    // 3 items
    expect(wrapper.findAll('table > tbody > tr').length).toBe(3);

    // 4 attribues
    expect(wrapper.findAll('table > tbody > tr').at(0).findAll('td').length).toBe(2);

    data.forEach((row, r) => {
      headers.forEach(({ value: attrib }, c) => {
        expect(wrapper.findAll('table > tbody > tr').at(r).findAll('td').at(c)
          .text()).toBe(String(row[attrib]));
      });
    });
  });

  it('renders the column using the column slot', () => {
    const data = [
      {
        id: 1,
        name: 'Alfonso Bribiesca',
        email: 'alfonso@vexilo.com',
        sales: '$9,999',
      },
      {
        id: 2,
        name: 'Saida',
        email: 'saida@gmail.com',
        sales: '$1,999',
      },
      {
        id: 3,
        name: 'Regina',
        email: 'regina.123@gmail.com',
        sales: '$0',
      },
    ];

    const wrapper = shallowMount(TTable, {
      propsData: {
        data,
      },
      scopedSlots: {
        column: '<td>{{props.rowIndex}}:{{props.columnIndex}}:{{props.text}}</td>',
      },
    });

    // 3 items
    expect(wrapper.findAll('table > tbody > tr').length).toBe(3);

    // 4 attribues
    expect(wrapper.findAll('table > tbody > tr').at(0).findAll('td').length).toBe(4);

    data.forEach((row, r) => {
      Object.keys(row).forEach((attrib, c) => {
        expect(wrapper.findAll('table > tbody > tr').at(r).findAll('td').at(c)
          .text()).toBe(`${r}:${attrib}:${row[attrib]}`);
      });
    });
  });

  it('renders the row using the row slot', () => {
    const data = [
      {
        id: 1,
        name: 'Alfonso Bribiesca',
        email: 'alfonso@vexilo.com',
        sales: '$9,999',
      },
      {
        id: 2,
        name: 'Saida',
        email: 'saida@gmail.com',
        sales: '$1,999',
      },
      {
        id: 3,
        name: 'Regina',
        email: 'regina.123@gmail.com',
        sales: '$0',
      },
    ];

    const wrapper = shallowMount(TTable, {
      propsData: {
        data,
      },
      scopedSlots: {
        row: `<tr>
          <td :colspan="Object.keys(props.row).length">
            {{props.rowIndex}}:{{props.row.name}}:{{props.row.email}}:{{props.row.sales}}
          </td>
        </tr>`,
      },
    });

    // 3 items
    expect(wrapper.findAll('table > tbody > tr').length).toBe(3);

    // 1 columns (according to my prop)
    expect(wrapper.findAll('table > tbody > tr').at(0).findAll('td').length).toBe(1);
    // Created a colspan with the row length
    expect(wrapper.findAll('table > tbody > tr').at(0).findAll('td').at(0)
      .attributes('colspan')).toBe('4');

    data.forEach((row, r) => {
      expect(wrapper.findAll('table > tbody > tr').at(r).findAll('td').at(0)
        .text())
        .toBe(`${r}:${row.name}:${row.email}:${row.sales}`);
    });
  });

  it('renders the tbody using the tbody prop', () => {
    const data = [
      {
        id: 1,
        name: 'Alfonso Bribiesca',
        email: 'alfonso@vexilo.com',
        sales: '$9,999',
      },
      {
        id: 2,
        name: 'Saida',
        email: 'saida@gmail.com',
        sales: '$1,999',
      },
      {
        id: 3,
        name: 'Regina',
        email: 'regina.123@gmail.com',
        sales: '$0',
      },
    ];

    const wrapper = shallowMount(TTable, {
      propsData: {
        data,
      },
      scopedSlots: {
        tbody: '<tbody>I have {{props.data.length}} items to manually render</tbody>',
      },
    });

    expect(wrapper.findAll('table > tbody').length).toBe(1);

    expect(wrapper.find('table > tbody').html()).toBe('<tbody>I have 3 items to manually render</tbody>');
  });

  it('renders the thead using the thead prop', () => {
    const headers = ['Name', 'Email', 'Sales'];

    const wrapper = shallowMount(TTable, {
      propsData: {
        headers,
      },
      scopedSlots: {
        thead: '<thead>I have {{props.data.length}} items to manually render in the header</thead>',
      },
    });

    expect(wrapper.findAll('table > thead').length).toBe(1);

    expect(wrapper.find('table > thead').html()).toBe('<thead>I have 3 items to manually render in the header</thead>');
  });

  it('renders the tfoot using the tfoot prop', () => {
    const footerData = ['Name', 'Email', 'Sales'];

    const wrapper = shallowMount(TTable, {
      propsData: {
        footerData,
        showFooter: true,
      },
      scopedSlots: {
        tfoot: '<tfoot>I have {{props.data.length}} items to manually render in the footer</tfoot>',
      },
    });

    expect(wrapper.findAll('table > tfoot').length).toBe(1);

    expect(wrapper.find('table > tfoot').html()).toBe('<tfoot>I have 3 items to manually render in the footer</tfoot>');
  });

  it('show the footer when show-footer is set', async () => {
    const wrapper = shallowMount(TTable);

    expect(wrapper.find('table > tfoot').exists()).toBe(false);

    wrapper.setProps({ showFooter: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('table > tfoot').exists()).toBe(true);
  });

  it('renders the footer using only labels', () => {
    const footerData = ['Name', 'Email', 'Sales'];
    const wrapper = shallowMount(TTable, {
      propsData: {
        footerData,
        showFooter: true,
      },
    });

    expect(wrapper.findAll('table > tfoot > tr > td').length).toBe(3);

    const ths = wrapper.findAll('table > tfoot > tr > td');
    footerData.forEach((header, index) => {
      expect(ths.at(index).text()).toBe(header);
    });
  });
});
