import type { Database } from '~~/types/database.types'
type User = Database['public']['Tables']['users_meta']['Row']

type UserState = {
  users: User[]
  userData: User | null
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null
  } as UserState),
  getters: {
    getUserData: (state) => state. userData,
  },
  actions: {
    setUser(user: User) {
      this.userData = user
    }
  }
})
