// Vue composable Like the React custom hook functions: encapsulate the reusable code logics !!
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() { // we can use mouse coordinates now ~
  const x = ref(0);
  const y = ref(0); // store the mouse coordinates

  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  onMounted(() => window.addEventListener('mousemove', update));

  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x, y };
}

// Inside the vue template, we can use this useMouse composable function

{/* <template>
  <p>Mouse position is: ({{ x }}, {{ y }})</p>
</template>

<script>
  import { useMouse } from './composable-first-look';

  const { x, y } = useMouse();
</script> */}

// we can use this useMouse composable in many components (reuseable !!!!)



// We could also potentially call one composable with another composable, and pass props into it (advanced usage) ~


// we can also make our composable function to support `.value`, eg:

function myOwnComposeable(text) {
  const word = ref(text); // we add ref reactivity function inside composable function
  // ...
  return {
    word // so now, we can access word.value when calling myOwnComposeable function ~
  }
}

// if we want to make our value stay with primitive type value, we can do this:
function myOwnComposeable(text) {
  const word = unref(text); // we add unref function
  // ...
  return {
    word // so now, we cannot access word.value because unref() will return the primitive type value
  }
}

// Another good example in real life ~

import { ref, computed, readonly } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const doubleCount = computed(() => count.value * 2);

  const isEven = computed(() => count.value % 2 === 0);

  return {
    count: readonly(count), // consumers can only read it cannot mutate the count value directly
    doubleCount,
    isEven
  }
}