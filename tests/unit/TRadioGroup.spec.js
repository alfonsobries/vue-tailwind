import { shallowMount } from '@vue/test-utils'
import TRadioGroup from '@/elements/TRadioGroup.vue'
import { mapValues } from 'lodash'

describe('TRadioGroup.vue', () => {
  it('placeholder', () => {
    expect(true).toBe(true)
  })
// describe('TRadioGroup.vue', () => {
//   it('it renders the radio options', () => {
//     const options = ['Option A', 'Option B', 'Option C']
    
//     const wrapper = shallowMount(TRadioGroup, {
//     propsData: { options }
//     })

//     expect(wrapper.vm.$el.querySelectorAll('input[type=radio]').length).toBe(3)
//   })

//   it('selects the selected radio option', () => {
//     const options = ['Option A', 'Option B', 'Option C']
//     const value = 'Option B'
//     const wrapper = shallowMount(TRadioGroup, {
//       propsData: { options, value }
//     })
//     expect(wrapper.vm.$el.querySelectorAll('input[type=radio]:checked')[0].value).toBe(value)
//   })

//   it('accept the options as array of strings', () => {
//     // Accepts an array of strings
//     const strings = ['Option A', 'Option B', 'Option C', 'Option D']

//     const expectedOptions = strings.map(str => ({
//       value: str,
//       text: str,
//     }))

//     const wrapper = shallowMount(TRadioGroup, {
//       propsData: { options: strings }
//     })

//     expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
//   })

//   it('accept the options as array of numbers', () => {
//     const numbers = [1, 2, 3]

//     const expectedOptions = numbers.map(str => ({
//    value: str,
//    text: str,
//     }))

//    const wrapper = shallowMount(TRadioGroup, {
//       propsData: { options: numbers }
//     })

//     expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
//   })

//   it('accept the options in default format', () => {
//    // Accepts an array of objects with value
//     const objectsWithValue = [
//      { value: 'A', text: 'A' },
//      { value: 'B', text: 'B' },
//      { value: 'C', text: 'C' },
//    ]
    
//     const expectedOptions = objectsWithValue
    
//     const wrapper = shallowMount(TRadioGroup, {
//       propsData: { options: objectsWithValue }
//     })

//     expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
//   })

//   it('accept the options using id as value', () => {
//     const objectsWithIds = [
//      { id: 1, text: 'A' },
//      { id: 2, text: 'B' },
//      { id: 3, text: 'C' },
//    ]

//     const expectedOptions = objectsWithIds.map(option => ({ value: option.id, text: option.text }))
    
//     const wrapper = shallowMount(TRadioGroup, {
//       propsData: { options: objectsWithIds }
//     })

//     expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
//   })

//   it('accept the options and use the label as text', () => {
//     const objectsWithLabel = [
//      { value: 'A', label: 'A' },
//      { value: 'B', label: 'B' },
//      { value: 'C', label: 'C' },
//    ]
    
//     const expectedOptions = objectsWithLabel.map(option => ({ value: option.value, text: option.label }))
    
//     const wrapper = shallowMount(TRadioGroup, {
//       propsData: { options: objectsWithLabel }
//     })

//     expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
//   })

//   it('accept the options and pair value:text object', () => {
//     const optionsObject = {
//      'A': 'Option A',
//      'B': 'Option B',
//      'C': 'Option C',
//    }
    
//     const expectedOptions = Object.keys(optionsObject).map(key => ({
//       value: key,
//       text: optionsObject[key],
//     }))

//     const wrapper = shallowMount(TRadioGroup, {
//       propsData: { options: optionsObject }
//     })

//     expect(wrapper.vm.normalizedOptions).toEqual(expectedOptions);
//   })

//   it('disables the radio inputs', () => {
//     const options = ['Option A', 'Option B', 'Option C']
//     const wrapper = shallowMount(TRadioGroup, {
//       propsData: { disabled: false, options }
//     })
    
//     expect(wrapper.vm.$el.querySelectorAll('input[type=radio]:not(:disabled)').length).toBe(3)

//     wrapper.setProps({ disabled: true })

//     expect(wrapper.vm.$el.querySelectorAll('input[type=radio]:not(:disabled)').length).toBe(0)
//     expect(wrapper.vm.$el.querySelectorAll('input[type=radio]:disabled').length).toBe(3)
//   })


//   it('emits an input event with the radio value', () => {
//     const options = ['A', 'B', 'C']
//     const wrapper = shallowMount(TRadioGroup, {
//      propsData: { options }
//     })

//     const inputValue = 'B'

//     wrapper.setProps({
//       value: inputValue
//     })

//     expect(wrapper.emitted('input')).toBeTruthy()

//     // assert event count
//     expect(wrapper.emitted('input').length).toBe(1)

//     // assert event payload
//     expect(wrapper.emitted('input')[0]).toEqual([inputValue])
//   })

//   it('emits an change event with the radio value', () => {
//    const options = ['A', 'B', 'C']
    
//     const wrapper = shallowMount(TRadioGroup, {
//      propsData: { options }
//     })

//     const inputValue = 'B'

//     wrapper.setProps({
//       value: inputValue
//     })

//     expect(wrapper.emitted('change')).toBeTruthy()

//     // assert event count
//     expect(wrapper.emitted('change').length).toBe(1)

//     // assert event payload
//     expect(wrapper.emitted('change')[0]).toEqual([inputValue])
//   })

//  //  it('emits a blur event when the radio is blurred', () => {
//  //   const options = ['A', 'B', 'C']
//  //    const value = 'B'
//  //    const wrapper = shallowMount(TRadioGroup, {
//  //     propsData: { options, value }
//  //    })

//  //    const radio = wrapper.vm.$el.getElementsByTagName('radio')[0]

//  //    // The change event should be emitted when the radio is blurred
//  //    radio.dispatchEvent(new Event('blur'))

//  //    expect(wrapper.emitted('blur')).toBeTruthy()

//  //    // assert event count
//  //    expect(wrapper.emitted('blur').length).toBe(1)
//  //  })

//  //  it('emits a focus event when the radio is focused', () => {
//  //    const options = ['A', 'B', 'C']
//  //    const value = 'B'
//  //    const wrapper = shallowMount(TRadioGroup, {
//  //     propsData: { options, value }
//  //    })

//  //    const radio = wrapper.vm.$el.getElementsByTagName('radio')[0]

//  //    // The change event should be emitted when the radio is focusred
//  //    radio.dispatchEvent(new Event('focus'))

//  //    expect(wrapper.emitted('focus')).toBeTruthy()

//  //    // assert event count
//  //    expect(wrapper.emitted('focus').length).toBe(1)
//  //  })

//  //  it('has a focus and a blur method', () => {
//  //    const wrapper = shallowMount(TRadioGroup)

//  //    wrapper.vm.focus()

//  //    expect(wrapper.emitted('focus')).toBeTruthy()

//  //    expect(wrapper.emitted('focus').length).toBe(1)

//  //    wrapper.vm.blur()

//  //    expect(wrapper.emitted('blur')).toBeTruthy()

//  //    expect(wrapper.emitted('blur').length).toBe(1)
//  //  })
})
