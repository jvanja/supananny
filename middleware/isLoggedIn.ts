export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuthUser()
  if (isLoggedIn()) {
    return navigateTo('/home')
  }
})
