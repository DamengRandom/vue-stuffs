<!-- The basic fetch data structure component -->
<template>
  <div>
    <div v-if="isLoading">
      <!-- Show loading web content, eg: Spinner, Loading skeleton screen and etc -->
    </div>
    <div v-else>
      <div v-if="products.length">
        <!-- Show products list logics -->
        <!-- Assuming we bave a refresh button for refetching the products list -->
        <button @click="fetchProducts">Refresh</button>
      </div>
      <div v-else>
        <!-- Show error message during fetching products -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const loading = ref(false);
  const products = ref([]);

  const fetchProducts = async () => {
    try {
      loading.value = true;
      products.value = await getProducts();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    await fetchProducts();
  });
</script>
