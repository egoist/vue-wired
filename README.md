# vue-wired

[![NPM version](https://img.shields.io/npm/v/vue-wired.svg?style=flat)](https://npmjs.com/package/vue-wired) [![NPM downloads](https://img.shields.io/npm/dm/vue-wired.svg?style=flat)](https://npmjs.com/package/vue-wired) [![CircleCI](https://circleci.com/gh/egoist/vue-wired/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/vue-wired/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

Inspired by [wiretie](https://github.com/synacor/wiretie).

## Install

```bash
yarn add vue-wired
```

## Usage

Instead of writing:

```vue
<template>
  <div>{{ loading ? 'Loading...' : user.name }}</div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      user: null
    }
  },
  created() {
    Promise.resolve({ name: 'EGOIST' }) // mock API call
      .then(user => {
        this.user = user
        this.loading = false
      })
  }
}
</script>
```

You write:

**User.vue**:

```vue
<template>
  <div>{{ pending.user ? 'Loading...' : user.name }}</div>
</template>
```

**WiredUser.js**:

```js
import wired from 'vue-wired'
import User from './User.vue'

export default wired({
  user: Promise.resolve({ name: 'EGOIST' }),
  // Use a function if you want to access component instance
  // via `this` or `vm` in arrow function
  // user: vm => Promise.resolve({ name: 'EGOIST' })
})(User)
```

Now async API logic is extracted from your `User` component.

<img src="https://rawgit.com/egoist/vue-wired/master/media/wired.svg" width="500" alt="gram" />

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**vue-wired** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/vue-wired/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
