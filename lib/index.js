export default {
  functional: true,
  render (h, { data, children, props }) {
    // If no to is set, treat as "external" to remove "link style" and bindings.
    // Quite useful if you want to bind a link dynamically and don't want to have it clicked and styled when not bound
    const isExternal = props => !props.to ||
      props.to.startsWith('http') ||
      props.to.startsWith('//') ||
      props.external

    return isExternal(props)
      ? h('a', {
        ...data,
        attrs: {
          href: props.to || undefined,
          rel: props.rel || undefined,
          target: props.target || (props.newTab ? '_blank' : undefined)
        }
      }, children)
      : h('router-link', data, children)
  }
}
