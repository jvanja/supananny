<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import type { Database } from '~~/types/database.types'

definePageMeta({
  middleware: 'auth',
})

defineEmits(['logout'])
defineProps({
  isDesktop: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()
const supabase = useSupabaseClient<Database>()

// methods
const signout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  }
  router.push('/')
}

const userStore = useUserStore()
const userData = computed(() => userStore.getUserData)
const userId = computed(() => userData.value?.id)
const userPicture = computed(
  () =>
    userData.value?.picture ||
    'https://img.freepik.com/premium-vector/default-female-user-profile-icon-vector-illustration_276184-169.jpg'
)

</script>
<template>
  <div v-if="isDesktop == true" class="flex items-center">
    <div class="flex-shrink-0">
      <Anchor to="/search" type="button" class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <UIcon name="heroicons-plus-20-solid" class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        <span>New Job</span>
      </Anchor>
    </div>
    <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
      <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="sr-only">View notifications</span>
        <UIcon name="heroicons-bell" class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Profile dropdown -->
      <Menu as="div" class="ml-3 relative z-10">
        <div>
          <MenuButton class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="sr-only">Open user menu</span>
            <img class="h-8 w-8 rounded-full" :src="userPicture" alt="">
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem v-slot="{ active }">
              <NuxtLink :to="'/profile/' + userId" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                Your Profile
              </Nuxtlink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <NuxtLink to="/settings" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                Settings
              </NuxtLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                @click="signout"
              >Sign out</a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>

  <!-- mobile user menu -->
  <div v-else class="pt-4 pb-3 border-t border-gray-200">
    <div class="flex items-center px-4 sm:px-6">
      <div class="flex-shrink-0">
        <img
          class="h-10 w-10 rounded-full"
          :src="userPicture"
          alt=""
        >
      </div>
      <div class="ml-3">
        <div class="text-base font-medium text-gray-800">
          Tom Cook
        </div>
        <div class="text-sm font-medium text-gray-500">
          tom@example.com
        </div>
      </div>
      <button class="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="sr-only">View notifications</span>
        <UIcon name="heroicons-bell" class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <div class="mt-3 space-y-1">
      <NuxtLink :to="'/profile/' + userId" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6">
        Your Profile
      </NuxtLink>
      <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6">Settings</a>
      <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6" @click="signout">Sign out</a>
    </div>
  </div>
</template>
