# Vue good practices

## Trying ~

Thinking about put some good practice codes in here ~

### Embrace Vue 3 Composition API

```js
<script setup>
  {/* 
    instead of using setup() {
      return { ... };
    }

    directly using setup please ~
  */}
</script>
```

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

### Component Design Patterns

#### Use Proper `Prop` Definitions with TypeScript-style Syntax

```vue
<script setup>
interface ComponentNameProps {
  title: string
  items: Array<{ id: number; name: string }>
  isLoading?: boolean
  maxItems?: number
}

const componentNameProps = withDefaults(defineProps<ComponentNameProps>(), {
  title: '',
  items: [],
  isLoading: false,
  maxItems: 10
})

// Or with runtime validation
const componentNameProps = defineProps({
  title: {
    type: String,
    default: ''
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
    required: true,
    validator: (items) => items.every(item => item.id && item.name)
  },
  isLoading: {
    type: Boolean,
    default: false,
    required: false
  },
  maxItems: {
    type: Number,
    default: 10,
    required: false
  }
})
</script>
```

#### Implement Proper `Event` Handling

```vue
<script setup>
import { ref, computed } from 'vue';

interface User {
  id: number
  name: string
  email: string
}

interface ComponentNameEmits {
  userUpdated: [user: User]
  userDeleted: [userId: number]
  searchChanged: [term: string]
}

const componentNameEmit = defineEmits<ComponentNameEmits>();

const searchTerm = ref('');
const users = ref<User[]>([]);

const filteredUsers = computed(() =>
  users.value.filter(user =>
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

const handleSearch = () => {
  componentNameEmit('searchChanged', searchTerm.value);
}

const handleEdit = (user: User) => {
  componentNameEmit('userUpdated', user);
}

const handleDelete = (userId: number) => {
  users.value = users.value.filter(u => u.id !== userId);
  componentNameEmit('userDeleted', userId);
}
</script>
```


### State Management Best Practices

#### Use `Pinia` for Complex State Management

```js
// stores/user.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref([]);
  const currentUser = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  // Getters
  const userCount = computed(() => users.value.length);
  const activeUsers = computed(() => 
    users.value.filter(user => user.isActive)
  );
  // Actions
  const fetchUsers = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch('/api/users');
      users.value = await response.json();
    } catch (error) {
      error.value = 'Failed to fetch users ..';
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  const addNewUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const newUser = await response.json();
      users.value.push(newUser);
      return newUser;
    } catch (error) {
      error.value = 'Failed to add a new user ..'
      throw error;
    }
  }

  const setCurrentUser = (user) => {
    currentUser.value = user;
  }

  return {
    // State
    users,
    currentUser,
    isLoading,
    error,
    // Getters
    userCount,
    activeUsers,
    // Actions
    fetchUsers,
    addNewUser,
    setCurrentUser
  }
});
```

### Using `v-memo` for memorize the hooks

Use conditions:

- You have large static components or expensive DOM updates
- You want to manually control when a template block re-renders


#### Explaination

```vue
<div v-memo="[dep1, dep2]">
  <!-- This block won't update unless dep1 or dep2 change -->
  <!-- It looks very similar like React useMemo/ useCallback hooks -->
  {{ someData }}
</div>
```

#### Example

```vue
<template>
  <div>
    <div v-memo="[count]">
      <!-- This part only re-renders when 'count' changes -->
      <p>Count: {{ count }}</p>
      <p>Expensive render: {{ expensiveComputation() }}</p>
    </div>

    <button @click="increment">Increment</button>
    <button @click="toggle">Toggle</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const show = ref(true)

function increment() {
  count.value++
}

function toggle() {
  show.value = !show.value
}

function expensiveComputation() {
  console.log('recomputing...')
  return count.value * 1000
}
</script>
```


### Using Lazy loading with Suspense

- Thanks for React ~

```vue
<template>
  <Suspense>
    <template #default>
      <UserList />
    </template>
    <template #fallback>
      <div class="loading">
        <p>Loading users...</p>
        <div class="spinner"></div>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const UserList = defineAsyncComponent(() =>
  import('./components/UserList.vue'); // lzay loading the component (render when needed)
)
</script>
```

### Error handling & debugging

#### Global error handling

```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err);
  console.error('Component:', instance);
  console.error('Error info:', info);
  
  // Send to error reporting service
  // errorReportingService.report(err, { instance, info })
}

app.mount('#app');
```

#### Component Error Boundaries

```vue
<!-- ErrorBoundary.vue -->
<template>
  <div>
    <div v-if="error" class="error-boundary">
      <h2>Something went wrong</h2>
      <p>{{ error.message }}</p>
      <button @click="retry">Try Again</button>
    </div>
    <slot v-else />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';

const error = ref(null);

const retry = () => {
  error.value = null;
}

onErrorCaptured((err) => {
  error.value = err;
  return false; // Prevent error from propagating
})
</script>
```
