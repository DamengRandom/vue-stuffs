<!-- Set example -->
<!-- 1. Unique tags  -->
<script setup>
  const tags = ref(new Set());

  const addTag = (newTag) => {
    if (!tags.value.has(newTag)) {
      tags.value.add(newTag);
    }
  }
</script>
<template>
  <button @click="addTag('agent')">Add Tag</button>
</template>
<!-- 2. Unique value collections -->
<script setup>
  const uniqueCategories = ref(new Set());

  async function loadProducts() {
    const products = await getProducts();

    products.forEach(product => {
      uniqueCategories.value.add(product.category); // product.category is string
    });
  }
</script>
<template>
  <div v-for="category in Array.from(uniqueCategories.value)" :key="category">{{ category }}</div>
</template>


<!-- Map example -->
<!-- 1. Tab Management -->
<template>
  <div>
    <div v-for="[id, tab] in tabs" @click="currentTab = id">
      {{ tab.icon }} {{ id }}
    </div>
    <div>
      <component :is="tabs.get(currentTab).component" />
    </div>
  </div>
</template>

<script setup>
  const tabs = new Map([
    ['eat', { icon: '🥐', component: Eat }],
    ['drink', { icon: '🥤', component: Drink }]
  ]);

  const currentTab = ref('eat');
</script>
<!-- 2. Feature flags -->
<!-- In features.js -->
const featureFlags = new Map();
featureFlags.set('darkMode', import.meta.env.VITE_DARK_MODE === 'true');
featureFlags.set('testFlag', false);
<!-- In component, use it ~ -->
<script>
  const showTestFlag = computed(() => featureFlags.get('testFlag'));
</script>
<script>
  // <!-- Why Map? because dynmically enable/disable the features at the runtime -->
  function toggleFeatures(feature, value) {
    featureFlags.set(feature, value);
  }
</script>
<!-- 3. For translation -->
<script>
  const translations = new Map([
    ['welcome', { 
      en: 'Hello', 
      es: 'Hola',
      fr: 'Bonjour'
    }],
    ['button', {
      en: 'Submit',
      es: 'Enviar'
    }]
  ]);

  const currentLang = ref('en');
  const t = (key) => translations.get(key)?.[currentLang.value] || key;
</script>
