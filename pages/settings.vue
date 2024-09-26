<script setup lang="ts">
import { computed } from 'vue'
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from '@headlessui/vue'
import UserCircleIcon from '~icons/heroicons/user-circle'
import CogIcon from '~icons/heroicons/cog'
import KeyIcon from '~icons/heroicons/key'
import BellIcon from '~icons/heroicons/bell'
import CreditCardIcon from '~icons/heroicons/credit-card'
import type { Database } from '~~/types/database.types'

definePageMeta({
  middleware: 'auth',
})

const subNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Password', href: '#', icon: KeyIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
]

type User = Database['public']['Tables']['users_meta']['Row']
const userStore = useUserStore()
const userData = computed(() => userStore.getUserData)

// - TODO:
// Use below to et the email and name from
// const supabase = useSupabaseClient()
// const { data: { user }} = await supabase.auth.getUser()
// console.log(user)

const userPicture = computed(
  () =>
    userData.value?.picture ||
    'https://img.freepik.com/premium-vector/default-female-user-profile-icon-vector-illustration_276184-169.jpg'
)

function updateUserField(field: Partial<User>) {
  console.log(field)
  // userStore.updateUserField(field)
}

function updateUserProfile(e) {
  e.preventDefault()
  console.log(userData.value)
  // userStore.updateUserField(field)
}
</script>
<template>
  <div class="relative">
    <div class="max-w-screen-xl mx-auto pb-6 px-4 lg:pb-16">
      <div
        class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x"
      >
        <aside class="py-6 lg:col-span-3">
          <nav class="space-y-1">
            <a
              v-for="item in subNavigation"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                  : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-teal-500 group-hover:text-teal-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                ]"
                aria-hidden="true"
              />
              <span class="truncate">
                {{ item.name }}
              </span>
            </a>
          </nav>
        </aside>

        <form
          class="divide-y divide-gray-200 lg:col-span-9"
          action="#"
          method="POST"
        >
          <!-- Profile section -->
          <div class="py-6 px-4 sm:p-6 lg:pb-8">
            <div>
              <h2 class="text-lg leading-6 font-medium text-gray-900">
                {{ userData?.user_type === 1 ? 'Nanny' : 'Admin' }}
                profile
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div class="mt-6 flex flex-col lg:flex-row">
              <div class="flex-grow space-y-6">
                <div>
                  <label
                    for="about"
                    class="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="about"
                      v-model="userData!.about"
                      name="about"
                      rows="3"
                      class="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      @change="updateUserField({ about: $event.target!.value })"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div
                class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0"
              >
                <p class="text-sm font-medium text-gray-700" aria-hidden="true">
                  Photo
                </p>
                <div class="mt-1 lg:hidden">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                      aria-hidden="true"
                    >
                      <img
                        class="rounded-full h-full w-full"
                        :src="userPicture"
                        alt=""
                      />
                    </div>
                    <div class="ml-5 rounded-md shadow-sm">
                      <div
                        class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500"
                      >
                        <label
                          for="user_photo"
                          class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                        >
                          <span>Change</span>
                          <span class="sr-only"> user photo</span>
                        </label>
                        <input
                          id="user_photo"
                          name="user_photo"
                          type="file"
                          class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="hidden relative rounded-full overflow-hidden lg:block"
                >
                  <img
                    class="relative rounded-full w-40 h-40"
                    :src="userPicture"
                    alt=""
                  />
                  <label
                    for="user-photo"
                    class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                  >
                    <span>Change</span>
                    <span class="sr-only"> user photo</span>
                    <input
                      id="user-photo"
                      type="file"
                      name="user-photo"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-12 gap-6">
              <div class="col-span-12 sm:col-span-6">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-700"
                  >First Name</label
                >
                <input
                  id="first_name"
                  v-model="userData!.first_name"
                  type="text"
                  name="first_name"
                  autocomplete="given-name"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <label
                  for="last_name"
                  class="block text-sm font-medium text-gray-700"
                  >Last name</label
                >
                <input
                  id="last_name"
                  v-model="userData!.last_name"
                  type="text"
                  name="last_name"
                  autocomplete="family-name"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
              </div>

              <div class="col-span-12">
                <SwitchGroup
                  as="li"
                  class="py-4 flex items-center justify-between"
                >
                  <div class="flex flex-col">
                    <SwitchLabel
                      as="p"
                      class="block text-sm font-medium text-gray-700"
                      passive
                    >
                      Full or part-time
                    </SwitchLabel>
                    <SwitchDescription class="text-sm text-gray-500">
                      I am looking for full-time or part-time work.
                    </SwitchDescription>
                  </div>
                  <Switch
                    v-model="userData!.full_time_or_part_time"
                    :class="[
                      userData!.full_time_or_part_time
                        ? 'bg-teal-500'
                        : 'bg-gray-200',
                      'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500',
                    ]"
                    @click="
                      updateUserField({
                        full_time_or_part_time:
                          !userData!.full_time_or_part_time,
                      })
                    "
                  >
                    <span class="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      :class="[
                        userData!.full_time_or_part_time
                          ? 'translate-x-5'
                          : 'translate-x-0',
                        'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      ]"
                    />
                  </Switch>
                </SwitchGroup>
              </div>

              <div class="col-span-12">
                <SwitchGroup
                  as="li"
                  class="py-4 flex items-center justify-between"
                >
                  <div class="flex flex-col">
                    <SwitchLabel
                      as="p"
                      class="block text-sm font-medium text-gray-700"
                      passive
                    >
                      Can I drive?
                    </SwitchLabel>
                    <SwitchDescription class="text-sm text-gray-500">
                      I have a valid driver's license and I am over 18 years
                      old.
                    </SwitchDescription>
                  </div>
                  <Switch
                    v-model="userData!.can_drive"
                    :class="[
                      userData!.can_drive ? 'bg-teal-500' : 'bg-gray-200',
                      'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500',
                    ]"
                    @click="
                      updateUserField({ can_drive: !userData!.can_drive })
                    "
                  >
                    <span class="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      :class="[
                        userData!.can_drive ? 'translate-x-5' : 'translate-x-0',
                        'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      ]"
                    />
                  </Switch>
                </SwitchGroup>
              </div>

              <div class="col-span-12 sm:col-span-6">
                <label
                  for="company"
                  class="block text-sm font-medium text-gray-700"
                  >Company</label
                >
                <input
                  id="company"
                  type="text"
                  name="company"
                  autocomplete="organization"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Privacy section -->
          <div class="pt-6 divide-y divide-gray-200">
            <div class="px-4 sm:px-6">
              <div>
                <h2 class="text-lg leading-6 font-medium text-gray-900">
                  Privacy
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  This is where you can control your privacy settings
                </p>
              </div>
              <ul class="mt-2 divide-y divide-gray-200">
                <SwitchGroup
                  as="li"
                  class="py-4 flex items-center justify-between"
                >
                  <div class="flex flex-col">
                    <SwitchLabel
                      as="p"
                      class="text-sm font-medium text-gray-900"
                      passive
                    >
                      Available to hire
                    </SwitchLabel>
                    <SwitchDescription class="text-sm text-gray-500">
                      If this is unchecked, you will not be visible to employers
                    </SwitchDescription>
                  </div>
                  <Switch
                    v-model="userData!.available_to_hire"
                    :class="[
                      userData!.available_to_hire
                        ? 'bg-teal-500'
                        : 'bg-gray-200',
                      'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500',
                    ]"
                    @click="
                      updateUserField({
                        available_to_hire: !userData!.available_to_hire,
                      })
                    "
                  >
                    <span class="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      :class="[
                        userData!.available_to_hire
                          ? 'translate-x-5'
                          : 'translate-x-0',
                        'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      ]"
                    />
                  </Switch>
                </SwitchGroup>
              </ul>
            </div>
            <div class="mt-4 py-4 px-4 flex justify-end sm:px-6">
              <button
                type="button"
                class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="ml-5 bg-emerald-900 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                @click="updateUserProfile"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
