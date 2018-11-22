/* eslint-disable no-console */
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import VueRouter from 'vue-router'
import { VueLink, VueLinkAddSlash, VueLinkStripSlash } from '../lib'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('VueLink', () => {
  describe('router-link', () => {
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

      expect(wrapper.isVueInstance()).toBe(false)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
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

      expect(wrapper.isVueInstance()).toBe(false)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
    })
    it('does trigger external on // link', () => {
      const wrapper = mount(VueLink, {
        localVue,
        attachToDocument: true,
        stubs: {
          RouterLink: RouterLinkStub
        },
        context: {
          props: {
            to: '//example.com/'
          }
        },
        slots: {
          default: '<div>Hi</div>'
        }
      })

      expect(wrapper.isVueInstance()).toBe(false)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
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

      expect(wrapper.isVueInstance()).toBe(false)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
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

      expect(wrapper.isVueInstance()).toBe(false)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
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

      expect(wrapper.isVueInstance()).toBe(false)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
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

      expect(wrapper.isVueInstance()).toBe(false)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
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

      expect(wrapper.isVueInstance()).toBe(false)
      expect(wrapper.contains(RouterLinkStub)).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})

describe('VueLinkStripSlash', () => {
  it('strips slashes', () => {
    const wrapper = mount(VueLinkStripSlash, {
      localVue,
      attachToDocument: true,
      stubs: {
        RouterLink: RouterLinkStub
      },
      context: {
        props: {
          to: '/test/'
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
  it('strips from link with hash', () => {
    const wrapper = mount(VueLinkStripSlash, {
      localVue,
      attachToDocument: true,
      stubs: {
        RouterLink: RouterLinkStub
      },
      context: {
        props: {
          to: '/test/'
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
  it('does not strip anything if no slash present', () => {
    const wrapper = mount(VueLinkStripSlash, {
      localVue,
      attachToDocument: true,
      stubs: {
        RouterLink: RouterLinkStub
      },
      context: {
        props: {
          to: '/test#abc'
        }
      },
      slots: {
        default: '<div>Hi</div>'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.contains(RouterLinkStub)).toBe(true)

    const link = wrapper.find(RouterLinkStub)

    expect(link.vm.$props.to).toBe('/test#abc')
  })
  it('does not strip anything from link with hash without slash', () => {
    const wrapper = mount(VueLinkStripSlash, {
      localVue,
      attachToDocument: true,
      stubs: {
        RouterLink: RouterLinkStub
      },
      context: {
        props: {
          to: '/test#abc'
        }
      },
      slots: {
        default: '<div>Hi</div>'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.contains(RouterLinkStub)).toBe(true)

    const link = wrapper.find(RouterLinkStub)

    expect(link.vm.$props.to).toBe('/test#abc')
  })
})

describe('VueLinkAddSlash', () => {
  it('adds slashes', () => {
    const wrapper = mount(VueLinkAddSlash, {
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

    expect(link.vm.$props.to).toBe('/test/')
  })
  it('adds slashes before hash', () => {
    const wrapper = mount(VueLinkAddSlash, {
      localVue,
      attachToDocument: true,
      stubs: {
        RouterLink: RouterLinkStub
      },
      context: {
        props: {
          to: '/test#abc'
        }
      },
      slots: {
        default: '<div>Hi</div>'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.contains(RouterLinkStub)).toBe(true)

    const link = wrapper.find(RouterLinkStub)

    expect(link.vm.$props.to).toBe('/test/#abc')
  })
  it('does not add second slash', () => {
    const wrapper = mount(VueLinkAddSlash, {
      localVue,
      attachToDocument: true,
      stubs: {
        RouterLink: RouterLinkStub
      },
      context: {
        props: {
          to: '/test/'
        }
      },
      slots: {
        default: '<div>Hi</div>'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.contains(RouterLinkStub)).toBe(true)

    const link = wrapper.find(RouterLinkStub)

    expect(link.vm.$props.to).toBe('/test/')
  })
  it('adds second slash before hash', () => {
    const wrapper = mount(VueLinkAddSlash, {
      localVue,
      attachToDocument: true,
      stubs: {
        RouterLink: RouterLinkStub
      },
      context: {
        props: {
          to: '/test/#abc'
        }
      },
      slots: {
        default: '<div>Hi</div>'
      }
    })

    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.contains(RouterLinkStub)).toBe(true)

    const link = wrapper.find(RouterLinkStub)

    expect(link.vm.$props.to).toBe('/test/#abc')
  })
})
