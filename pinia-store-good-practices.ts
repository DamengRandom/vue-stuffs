// This is optional approach
// export const useUserStore = defineStore('user', {
//   state: () => ({
//     userId: null as string | null,
//     name: "",
//     email: "",
//     isLoggedIn: false,
//     perfereneces: {
//       theme: "light",
//       notifications: true,
//     }
//   }),
//   getters: {
//     displayName: (state) => state.name || "Guest user",
//     hasCompleteProfile(state) {
//       return Boolean(state.name) && Boolean(state.email);
//     },
//     userPerferences(state) {
//       return state.perfereneces;
//     },
//     isDarkTheme(state) {
//       return state.perfereneces.theme === "dark";
//     },
//   },
//   actions: {
//     login(payload: { userId: string; name: string; email: string }) {
//       this.userId = payload.userId;
//       this.name = payload.name;
//       this.email = payload.email;
//       this.isLoggedIn = true;
//     },
//     logout() {
//       this.userId = null;
//       this.name = "";
//       this.email = "";
//       this.isLoggedIn = false;
//     },
//     updateUserProfile(userData: { name: string; email: string }) {
//       if (userData.name) this.name = userData.name;
//       if (userData.email) this.email = userData.email;
//     },
//     updateUserPerferences(newPerferences: Partial<{ theme: 'light' | 'dark', notifications: boolean }>) {
//       this.perfereneces = { ...this.perfereneces, ...newPerferences };
//     },
//   },
// });

// This is the (composition) setup apporach (Recommanded !!!!!!)

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | null>(null);
  const name = ref("");
  const email = ref("");
  const isLoggedIn = ref(false);
  const perfereneces = ref({
    theme: "light",
    notifications: true,
  });
  
  // getters
  const displayName = computed(() => name.value || "Guest user");
  const hasCompleteProfile = computed(() => Boolean(name) && Boolean(email));
  const userPerferences = computed(() => perfereneces.value);
  const isDarkTheme = computed(() => perfereneces.value.theme === "dark");
  
  // actions
  function login(payload: { userId: string; name: string; email: string }) {
    userId.value = payload.userId;
    name.value = payload.name;
    email.value = payload.email;
    isLoggedIn.value = true;
  }
  
  function logout() {
    userId.value = null;
    name.value = "";
    email.value = "";
    isLoggedIn.value = false;
  }
  
  function updateUserProfile(userData: { name: string; email: string }) {
    if (userData.name) name.value = userData.name;
    if (userData.email) email.value = userData.email;
  }

  function updateUserPerferences(newPerferences: Partial<{ theme: 'light' | 'dark', notifications: boolean }>) {
    perfereneces.value = { ...perfereneces.value, ...newPerferences };
  }

  async function fetchUsers() {
    // we can call fetchUsers asynchornously ~
  }

  return {
    userId,
    name,
    email,
    isLoggedIn,
    perfereneces,
    displayName,
    hasCompleteProfile,
    userPerferences,
    isDarkTheme,
    login,
    logout,
    updateUserProfile,
    updateUserPerferences,
  };
});
