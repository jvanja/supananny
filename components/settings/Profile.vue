<script setup lang="ts">
import { computed } from 'vue'
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const userStore = useUserStore()
const userData = computed(() => userStore.getUserData)
const videoDialog = ref()

async function updateUserProfile(e: Event) {
  e.preventDefault()
  const result = await userStore.updateUser()
  const toast = useToast()
  if (result) {
    toast.add({
      title: 'Profile updated!',
      description: 'Your profile has been successfully updated.',
      timeout: 3000,
      icon: 'i-heroicons-check-circle',
    })
  } else {
    toast.add({
      title: 'Profile update failed!',
      description: 'Your profile could not be updated.',
      timeout: 3000,
      icon: 'i-heroicons-x-circle-16-solid',
      color: 'red',
    })
  }
}

const setVideoUrl = (url: string) => {
  userData.value!.video_url = url
}

const setPictureUrl = (url: string) => {
  console.log(url)
  userData.value!.picture = url
}
</script>
<template>
  <form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
    <!-- Profile section -->
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 class="text-lg leading-6 font-medium text-gray-900">
          {{ userData?.user_type === 1 ? 'Nanny' : 'Admin' }}
          profile
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <div class="mt-6 flex flex-col lg:flex-row">
        <div class="flex-grow space-y-6">
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">About</label>
            <div class="mt-1">
              <textarea
                id="about"
                v-model="userData!.about"
                name="about"
                rows="3"
                class="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
            </div>
          </div>
        </div>

        <SettingsProfileUserPicture :user-picture="userData!.picture || ''" @set-picture-url="setPictureUrl" />
      </div>

      <div class="mt-6 grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-6">
          <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="first_name"
            v-model="userData!.first_name"
            type="text"
            name="first_name"
            autocomplete="given-name"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm" />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
          <input
            id="last_name"
            v-model="userData!.last_name"
            type="text"
            name="last_name"
            autocomplete="family-name"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm" />
        </div>

        <div class="col-span-12">
          <div class="py-4">
            <h2 class="text-lg leading-6 font-medium text-gray-900">Your video presentation</h2>
            <div class="py-2">
              <SettingsProfileUserVideo v-if="!userData!.video_url" @set-video-url="setVideoUrl" />
              <div v-else>
                <Button type="none" class="text-slate-700 pl-4" @click.prevent="videoDialog.open = true">
                  <UIcon
                    name="heroicons-solid-play"
                    class="w-8 h-8 text-nn_secondary hover:text-nn_primary mr-2"
                    aria-hidden="true" />
                  Play video
                </Button>
                <TheDialog ref="videoDialog" title="Your video presentation">
                  <video :src="userData!.video_url" controls></video>
                </TheDialog>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12">
          <SwitchGroup as="li" class="py-4 flex items-center justify-between">
            <div class="flex flex-col">
              <SwitchLabel as="p" class="block text-sm font-medium text-gray-700" passive>
                Full or part-time
              </SwitchLabel>
              <SwitchDescription class="text-sm text-gray-500">
                I am looking for full-time or part-time work.
              </SwitchDescription>
            </div>
            <Switch
              v-model="userData!.full_time_or_part_time"
              :class="[
                userData!.full_time_or_part_time ? 'bg-teal-500' : 'bg-gray-200',
                'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500',
              ]">
              <span class="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                :class="[
                  userData!.full_time_or_part_time ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                ]" />
            </Switch>
          </SwitchGroup>
        </div>

        <div class="col-span-12">
          <SwitchGroup as="li" class="py-4 flex items-center justify-between">
            <div class="flex flex-col">
              <SwitchLabel as="p" class="block text-sm font-medium text-gray-700" passive>Can I drive?</SwitchLabel>
              <SwitchDescription class="text-sm text-gray-500">
                I have a valid driver's license and I am over 18 years old.
              </SwitchDescription>
            </div>
            <Switch
              v-model="userData!.can_drive"
              :class="[
                userData!.can_drive ? 'bg-teal-500' : 'bg-gray-200',
                'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500',
              ]">
              <span class="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                :class="[
                  userData!.can_drive ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                ]" />
            </Switch>
          </SwitchGroup>
        </div>

        <div class="col-span-12 sm:col-span-6">
          <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
          <input
            id="company"
            type="text"
            name="company"
            autocomplete="organization"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm" />
        </div>
      </div>
    </div>

    <!-- Privacy section -->
    <div class="pt-6 divide-y divide-gray-200">
      <div class="px-4 sm:px-6">
        <div>
          <h2 class="text-lg leading-6 font-medium text-gray-900">Privacy</h2>
          <p class="mt-1 text-sm text-gray-500">This is where you can control your privacy settings</p>
        </div>
        <ul class="mt-2 divide-y divide-gray-200">
          <SwitchGroup as="li" class="py-4 flex items-center justify-between">
            <div class="flex flex-col">
              <SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>Available to hire</SwitchLabel>
              <SwitchDescription class="text-sm text-gray-500">
                If this is unchecked, you will not be visible to employers
              </SwitchDescription>
            </div>
            <Switch
              v-model="userData!.available_to_hire"
              :class="[
                userData!.available_to_hire ? 'bg-teal-500' : 'bg-gray-200',
                'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500',
              ]">
              <span class="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                :class="[
                  userData!.available_to_hire ? 'translate-x-5' : 'translate-x-0',
                  'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                ]" />
            </Switch>
          </SwitchGroup>
        </ul>
      </div>
      <div class="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <button
          type="button"
          class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
          Cancel
        </button>
        <button
          type="submit"
          class="ml-5 bg-emerald-900 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
          @click.prevent="updateUserProfile">
          Save
        </button>
      </div>
    </div>
  </form>
</template>
