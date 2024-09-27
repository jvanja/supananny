<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const user = useSupabaseUser()
const { $bus } = useNuxtApp()

// state
const theDialog = ref()

// event handlers
$bus.on('OPEN_LOGIN_DIALOG', () => {
  if (theDialog.value) theDialog.value.open = true
})
$bus.on('CLOSE_LOGIN_DIALOG', () => {
  if (theDialog.value) theDialog.value.open = false
})
</script>
<template>
  <Disclosure v-slot="{ open }" as="nav" class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open main menu</span>
              <UIcon v-if="!open" name="heroicons-bars-3" class="block h-6 w-6" aria-hidden="true" />
              <UIcon v-else name="heroicons-x-mark" class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <NuxtLink to="/" class="flex-shrink-0 flex items-center">
            <nuxt-img class="block lg:hidden h-8 w-auto" src="/workflow-mark-indigo-600.svg" alt="Workflow" />
            <nuxt-img
              class="hidden lg:block h-8 w-auto"
              src="/workflow-logo-indigo-600-mark-gray-800-text.svg"
              alt="Workflow" />
          </NuxtLink>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <!-- Current: "", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <NuxtLink
              v-if="user"
              to="/home"
              active-class="border-indigo-500 text-gray-900"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              About
            </NuxtLink>
          </div>
        </div>

        <!-- user menu desktop -->
        <UserMenu v-if="user" />

        <div v-else class="flex items-center">
          <Button size="sm" type="none" class="mr-2" @click="theDialog.open = true">Login</Button>
          <Anchor size="sm" type="button" href="/signup">Join</Anchor>
          <TheDialog ref="theDialog" title="">
            <LogIn />
          </TheDialog>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink
          v-if="user"
          to="/home"
          active-class="bg-indigo-50 border-indigo-500 text-indigo-700"
          class="bg-gray-50 border-gray-500 text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6">
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/about"
          active-class="bg-indigo-50 border-indigo-500 text-indigo-700"
          class="bg-gray-50 border-gray-500 text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6">
          About
        </NuxtLink>
      </div>

      <!-- user menu mobile -->
      <UserMenu v-if="user" :is-desktop="false" />
    </DisclosurePanel>
  </Disclosure>
</template>
