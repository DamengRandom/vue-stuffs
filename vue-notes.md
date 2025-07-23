# Vue notes

## Good conventions from Vue doc

```
components/
|- TodoList.js
|- TodoItem.js

<!-- Or -->

components/
|- TodoList.vue
|- TodoItem.vue
```

```
components/
|- MyComponent.vue

<!-- Or -->

components/
|- my-component.vue
```

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue

<!-- Or -->

components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue

<!-- Or -->

components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

```
<!-- In Single-File Components, string templates, and JSX -->
<MyComponent/>

<!-- In in-DOM templates -->
<my-component></my-component>
```

```vue
app.component('MyComponent', {
  // ...
})

app.component('my-component', {
  // ...
})

import MyComponent from './MyComponent.vue'

export default {
  name: 'MyComponent'
  // ...
}
```

```
<!-- Multiple lines for multiple attributes, eg: -->
<MyComponent
  :title="title"
  :description="description"
/>
```

```
<!-- Component define once should have `The` -->
TheHeader.vue
TheFooter.vue
```

## Vue rules

1. Avoid using v-if & v-for at same element

```html
<!-- This is ❌❌❌ -->
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```html
<!-- This is ✅✅✅ -->
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

2. Using component scoped styling please

```html
<!-- This is ✅✅✅ -->
<style scoped>
  /* styles */
</style>
```

3. Using `ref` for primitive (eg: string, number, boolean, etc) + reference typed data, using `reactive` ONLY for reference typed (eg: array, object) data

```js
import { ref, reactive } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const user = reactive({ name: 'John', age: 30 });

    function increment() {
      count.value++;
    }

    return { count, user, increment };
  }
};
```

4. Using `computed` for derived state that `depends on` other reactive data, eg:

```js
import { ref, computed } from 'vue';

export default {
  setup() {
    const price = ref(100);
    const quantity = ref(2);
    const total = computed(() => price.value * quantity.value);

    return { price, quantity, total };
  }
};
```

5. Place `side effects` inside `lifecycle` hook functions, eg: onMounted, onUnmounted

```js
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const data = ref(null);

    onMounted(async () => {
      const response = await fetch('https://api.example.com/data');
      data.value = await response.json();
    });

    return { data };
  }
};
```

6. Use `watch` to react to changes in reactive data

```js
import { ref, watch } from 'vue';

export default {
  setup() {
    const count = ref(0);

    watch(count, (newCount) => {
      console.log("Count changed to: ", newCount);
    });

    return count;
  }
}
```

7. Use validator for the `props` definition

```js
export default {
  props: {
    status: {
      type: String,
      required: true,
      validator(value) {
        return ['syncing', 'synced', 'version-conflict', 'error'].includes(value);
      }
    }
  }
}
```

8. DO NOT call a method on created and watch at the same time !!! (Guess just memeo so far)

```js
<script>
  export default {
    created: () { ❌
      this.handleChange();
    },
    methods: {
      handleChange() {}
    },
    watch() { ❌
      property() {
        this.handleChange();
      }
    }
  }
</script>
```

## Some basics memo

1. # is short for `v-slot`

2. TO BE ADDED ~
