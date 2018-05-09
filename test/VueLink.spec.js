/* eslint-disable no-console */
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VueLink from '@/VueLink'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('VueLink', () => {
  describe('route-link', () => {
    it('does link to the correct internal page', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        context: {
          props: {
            to: '/test'
          }
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.contains(RouterLinkStub)).toBe(true)

      const link = wrapper.find(RouterLinkStub)

      expect(link.vm.$props.to).toBe('/test')
    })
  })
  describe('external', () => {
    it('does trigger external on http link', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        context: {
          props: {
            to: 'http://example.com/'
          }
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toBe('<a href="http://example.com/"><div>Hi</div></a>')
    })
    it('does trigger external on https link', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        context: {
          props: {
            to: 'https://example.com/'
          }
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toBe('<a href="https://example.com/"><div>Hi</div></a>')
    })
    it('does trigger external on external prop set', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        context: {
          props: {
            to: '/far-away',
            external: true
          }
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toBe('<a href="/far-away"><div>Hi</div></a>')
    })
    it('does set rel correctly', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        context: {
          props: {
            to: 'http://example.com',
            rel: 'nofollow'
          }
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toBe('<a href="http://example.com" rel="nofollow"><div>Hi</div></a>')
    })
    it('does set target on newTab correctly', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        context: {
          props: {
            to: 'http://example.com',
            newTab: true
          }
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toBe('<a href="http://example.com" target="_blank"><div>Hi</div></a>')
    })
    it('does set target on prop correctly', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        context: {
          props: {
            to: 'https://example.com',
            target: '_parent'
          }
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toBe('<a href="https://example.com" target="_parent"><div>Hi</div></a>')
    })
    it('does not bind href if unset', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toBe('<a><div>Hi</div></a>')
    })
  })
})
