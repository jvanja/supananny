export const useSearchStore = defineStore('search', {
  state: () => ({
    search: 0,
    nannyType: 0,
    date: 0,
    schedule: '',
    children: 1,
    hasLicence: false,
    location: ''
  }),
  actions: {
    setSearch(search: any) {
      this.search = search.search,
        this.nannyType = search.nannyType,
        this.date = search.date
    }
  },
})

