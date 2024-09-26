<script setup lang="ts">
// import { computed } from 'vue'
import UserCircleIcon from '~icons/heroicons/user-circle'
import CogIcon from '~icons/heroicons/cog'
import CreditCardIcon from '~icons/heroicons/credit-card'

definePageMeta({
  middleware: 'auth',
})

const subNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
]

const currentTab = ref('Profile')

const changeTab = (tab: string) => {
  subNavigation.map((item) => (item.name === tab) ? item.current = true : item.current = false)
  currentTab.value = tab
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
              @click="changeTab(item.name)"
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

        <SettingsProfile v-if="currentTab === 'Profile'" />
        <SettingsAccount v-if="currentTab === 'Account'" />
        <SettingsBilling v-if="currentTab === 'Billing'" />
      </div>
    </div>
  </div>
</template>
