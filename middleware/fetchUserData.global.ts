export default defineNuxtRouteMiddleware(async () => {
  const supabase = useSupabaseClient()
  const { data } = await supabase.auth.getSession()
  const userStore = useUserStore()
  if (data.session && userStore.getUserData == null) {
    await userStore.fetchAndSetUserData()
  }
})
