import type { Database } from '~~/types/database.types'

type User = Database['public']['Tables']['users_meta']['Row']
type UserState = {
  users: User[]
  userData: User | null
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      userData: null,
      users: [],
    }) as UserState,

  getters: {
    getUserData: (state) => state.userData,
  },

  actions: {
    async fetchAndSetUserData() {
      // const userData = await fetchUserData()
      // if (userData) {
      //   this.userData = userData
      // }
      const supabase = useSupabaseClient<Database>()
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        try {
          const userMeta = await useAuthUser().getUserMeta()
          // return userMeta
          this.userData = userMeta as User
        } catch (e) {
          console.log('Error fetching user data:', e)
          // return null
          this.userData = null
        }
      }
    },

    async updateUserField(field: Partial<User>) {
      if (this.userData && this.userData.id) {
        const supabase = useSupabaseClient<Database>()
        try {
          const { error } = await supabase
            .from('users_meta')
            .update(field)
            .match({ id: this.userData.id })

          if (!error) {
            // Merge the updated fields with the current userData
            this.userData = { ...this.userData, ...field }
          } else {
            console.error('Error updating user field', error)
          }
        } catch (e) {
          console.error('Error in updateUserField action', e)
        }
      }
    },
  },
})

// async function fetchUserData() {
//   const supabase = useSupabaseClient<Database>()
//   const { data } = await supabase.auth.getSession()
//   if (data.session) {
//     try {
//       const userMeta = await useAuthUser().getUserMeta()
//       return userMeta
//     } catch (e) {
//       console.log('Error fetching user data:', e)
//       return null
//     }
//   }
// }
