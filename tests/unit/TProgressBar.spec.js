import { shallowMount } from '@vue/test-utils'

import TProgressBar from '@/components/TProgressBar.vue'

describe('TProgressBar.vue', () => {
  it('it renders the progress bar', () => {
    const wrapper = shallowMount(TProgressBar)

    expect(wrapper.contains('div')).toBe(true)
  })
})
