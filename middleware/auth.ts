export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/')
  } else {
    const userStore = useUserStore()
    await userStore.fetchAndSetUserData()
  }
})
