# VueLink - One component to link them all!

<p align="center">
  <a href="https://travis-ci.com/Developmint/vue-link"><img src="https://travis-ci.com/Developmint/vue-link.svg?branch=master" alt="Build Status"></a>
  <a href="https://codecov.io/gh/Developmint/vue-link"><img src="https://codecov.io/gh/Developmint/vue-link/branch/master/graph/badge.svg" alt="Code coverage"></a>
  <a href="https://www.npmjs.com/package/vue-link"><img src="https://img.shields.io/npm/dm/vue-link.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-link"><img src="https://img.shields.io/npm/v/vue-link.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-link"><img src="https://img.shields.io/npm/l/vue-link.svg" alt="License"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="We use Conventional Commits"></a>
  <a href="https://thanks.lichter.io/"><img src="https://img.shields.io/badge/thanks-%E2%99%A5-ff69b4.svg" alt="Thanks badge"></a>
</p>

> Lightweight wrapper component for external and vue-router links.

## :fire:  Features

- **Tiny functional component**
- SSR-safe (works with Nuxt.js)
- Well tested and **documented**
- Compatible with Node 8.0+
- Vue (and vue-router) as the only dependencies
- Highly customizable

## :mag_right: Getting started


### :package: Through NPM

```
$ npm install vue-link
```

#### Synchronous import

```js
import VueLink from 'vue-link'
// or the slash-forcing variants
// import { VueLink, VueLinkAddSlash, VueLinkStripSlash } from 'vue-link'

export default {
  components: {
    VueLink
  }
}

```

#### Async import

```js
export default {
  components: {
    VueLink: () => import('vue-link')
  }
}

```

### :link::x: Using a CDN

Sorry! No CDN available for VueLink right now.

## :hammer_and_wrench: Usage

### Handling

Before going into detail, keep in mind that you can customize the component
as you can do it with a normal `<a>` or `<router-link>`/`<nuxt-link>` tag.

All props will be passed down to the internal implementation of `vue-link`
in case the link is not external.

### Link detection

If the passed link starts with `http`, it'll be treated as external link.
You can use the `external` prop to force treating it as external link as well.

### Prop overview


| Prop  |  External only?  | Comment |
| ---   |       ---        |   ---   |
| to    |  :x:             | The target of the link. If not set, the link will not be bound (no "empty href")|
| rel   |:white_check_mark:| Will be passed as `rel` attribute to the anchor tag|
|newTab |:white_check_mark:| If truthy, set `target` attribute to `_blank`|
|target |:white_check_mark:| Will be passed as `target` attribute to the anchor tag|
|slashes  | Internal only!   | Settings: `'strip'`, `'add'` or `false`(default). Will force slash endings to either strip or add trailing slashes to your url (`/a` -> `/a/` in `add` mode, vice-versa in `strip`. **Only for internal links**! Also, this will not take query strings into account. Please use `router-link`'s `query` option for them|
|external |:white_check_mark:| Force to treat the link as external link (use anchor instead of vue-router tag)|

### Types

With `v1.4.0` two extra components were introduced that reflect the `slashes` settings.
You can import them (like the normal `VueLink` component as named imports).
The `default` export of the package is still the normal `VueLink` component so no breaking changes
have been introduced.

Since `v1.6.0`, a dedicated `ForNuxt` export is available that'll use `NuxtLink` instead of `RouterLink` under the hood 

`import { VueLink, VueLinkAddSlash, VueLinkStripSlash, ForNuxt } from '../lib'`

### Example usage

```js
 <vue-link
          :to="`/feed.xml`"
          :external="true"
          :new-tab="true"
          class="block mt-4 lg:inline-block lg:mt-0 w-6 h-6 mr-6 no-underline">
    This is the link text ;)
</vue-link>
```

## :gear: Contributing

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md)


## :bookmark_tabs: License

[MIT License](./LICENSE.md) - Copyright (c) Developmint - Alexander Lichter
