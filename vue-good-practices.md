# Vue good practices

## Trying ~

Thinking about put some good practice codes in here ~

### Use `shallowRef` and `shallowReactive` for Performance

```js
import { shallowRef, shallowReactive } from 'vue'

// For large arrays or objects that change as a whole
const largeDataset = shallowRef([])
const updateDataset = (newData) => {
  largeDataset.value = newData // Triggers reactivity
}

// For objects with many nested properties you don't need to track
const config = shallowReactive({
  api: { baseUrl: 'https://api.example.com' },
  features: { darkMode: true, notifications: false }
})
```

### Using `slot` please for customized functionality backdoor 🚪

```vue
<!-- Create a file called BaseButton.vue -->
<template>
  <button type="button" class="nice-button">
    <slot />
  </button>
</template>
<!-- Now, using BaseButton in another component with customized button logics -->
<template>
  <BaseButton>
    <span>Customized Button Text</span>
    <PulseLoader v-if="isLoading" color="lime" size="sm" />
    <AppIcon v-else icon="arrow-right" />
  </BaseButton>
</template>
```
