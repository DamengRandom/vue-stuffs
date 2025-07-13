<template>
  <div>
    <!-- This is a bit Nuxt API call practices -->
  </div>
</template>
<script setup lang="ts">
  const userStore = useUserStore();
  // ❌ not recomanded approach
  await useAsyncData(async () => { // Automatically caches the result
    const response = await userStore.fetchUser();
    // hanele data, eg:
    // const users = response.data;
    // return users;
  });
  
  // ✅ recommended approach: avoid duplicate calls
  await callOnce(async () => { // Helps avoid redundant calls, and only get triggered once
    const response = await userStore.fetchUser();
    // hanele data, eg:
    // const users = response.data;
    // return users;
  }, { mode: "navigation" });
  // { mode: "navigation" } changes the scope to per navigation, meaning the function can re-run when the user fully reloads the page (but not on internal route changes).
</script>
