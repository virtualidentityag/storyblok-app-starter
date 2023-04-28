import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { setup } from '@nuxt/test-utils'
import Component from './Component.vue'

describe('Component.vue', async () => {
  await setup()

  it('increments count when button is clicked', async () => {
    const wrapper = mount(Component)
    const button = wrapper.find('sbbutton')
    const count = wrapper.find('h1')

    expect(count.text()).toBe('Count: 0')
    await button.trigger('click')
    expect(count.text()).toBe('Count: 1')
  })
})
