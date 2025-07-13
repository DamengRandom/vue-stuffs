# Vue concepts & codes

- This is a quick note for marking how vue important concepts

## Reactivity

One word: Vue using `setter` and `getter` to make it reactive.

`reactivity` in Vue means: vue is able to update the DOM when the data changes (track the data changes !!).

Example inside `reactivity.html`.


## Write some plugins in Vue

Eg: `Vue.use(plugin)`

- Build some high level functions which can be used across the Vue app ~

`$options` is the object that contains the options passed to Vue when creating an instance.


## Render Function in Vue

- is a function to return virtual dom (Template -> `Compiler` -> Render function)

- Using the h (`hyperscript`) function to create the VNodes, like below code shown

- When old dom gets updated, the new dom will be created and then replace the old dom, and render function is the `caller` which deliver the latest dom to the browser ~

```js
// Template approach
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>
// BTW, in Vue, template === JSX

// Render function approach
render() {
  return h('div', [
    h('h1', this.title),
    h('p', this.message)
  ]);
}
// This is also how template has been read/converted as render function
```

## Virtual DOM

- Creating 1k virtual nodes (javascript object) is much more `cheaper` than creating 1k of real DOM elements in browser !!! (Thats why we need virtual dom). Thats also explained why we better generate the virual dom snaphot and update the specific elements, and then update the real dom tree, which is so efficient.

- Virtual DOM is a `mirror` of a real DOM tree

- Virtual DOM can also be used for mobile, server side (`non-browser environments`) rendering too (Real DOM tree will be workable for web browsers) ~
