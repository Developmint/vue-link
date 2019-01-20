const slashOptions = {
  STRIP: 'strip',
  ADD: 'add'
}

const modifySlashes = (option, url) => {
  if (!option) {
    return url
  }

  if (option === slashOptions.ADD) {
    // Hash with slash before is already present
    if (/\/#/.test(url)) {
      return url
    }
    // Just a hash, it should add slash before
    if (/[^/]#/.test(url)) {
      return url.replace(/([^/])#/, '$1/#')
    }

    // Has a trailing slash? If not, add one
    return /\/$/.test(url) ? url : `${url}/`
  }

  // Strip
  return /\/$/.test(url) ? url.slice(0, -1) : url.replace('/#', '#')
}

// If no `to` is set, treat as "external" to remove "link style" and bindings.
// Quite useful if you want to bind a link dynamically and don't want to have it clicked and styled when not bound
const isExternal = props => !props.to ||
  /^(http|\/\/)/.test(props.to) ||
  props.external

const vueLinkFactory = (slashes, isNuxt) => ({
  functional: true,
  render: (h, { data, children, props }) => {
    data.props = props
    data.props.slashes = data.props.slashes || slashes

    const isLinkedToExternal = isExternal(data.props)

    if (!isLinkedToExternal) {
      data.props.to = modifySlashes(data.props.slashes, data.props.to)
    }

    const linkComponent = isNuxt ? 'NuxtLink' : 'RouterLink'

    return isLinkedToExternal
      ? h('a', {
        ...data,
        attrs: {
          ...data.attrs,
          href: data.props.to || undefined,
          rel: data.props.rel || 'noopener',
          target: data.props.target || (data.props.newTab ? '_blank' : undefined)
        }
      }, children)
      : h(linkComponent, data, children)
  }
})

export const VueLink = vueLinkFactory()
export const ForNuxt = vueLinkFactory(undefined, true)
export const ForNuxtAddSlash = vueLinkFactory(slashOptions.ADD, true)
export const ForNuxtStripSlash = vueLinkFactory(slashOptions.STRIP, true)
export const VueLinkAddSlash = vueLinkFactory(slashOptions.ADD)
export const VueLinkStripSlash = vueLinkFactory(slashOptions.STRIP)

export default VueLink
