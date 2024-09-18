<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({
  middleware: 'auth',
})

const lookingFor = ref()
const isFullTime = ref('full-time')
const startDate = ref()
const workingHours = ref()
const canDrive = ref(false)
const languages = ref([])

const defaultLocation = { lat: 44.8125, lng: 20.4612 } // Belgrade

type Nanny = Database['public']['Tables']['users_meta']['Row']
const supabase = useSupabaseClient<Database>()

const { data: nannys } = await useAsyncData('users_meta', async () => {
  const { data } = await supabase
    .from('users_meta')
    .select(`*`)
    .neq('location', null)
  return data as Nanny[]
})

const handleSubmit = () => {
  console.log(
    lookingFor.value,
    isFullTime.value,
    startDate.value,
    workingHours.value,
    canDrive.value,
    languages.value
  )
}
</script>
<template>
  <div class="flex">
    <form class="p-6 max-w-sm" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="looking-for"
          >What are you looking for?</label
        >
        <select
          id="looking-for"
          v-model="lookingFor"
          class="form-select block w-full bg-gray-200 px-4 py-3 rounded-lg focus:bg-white focus:outline-none focus:shadow-outline"
          required
        >
          <option value="" />
          <option value="nanny">Nanny</option>
          <option value="babysitter">
            Babysitter for the exact time (an evening, weekend etc.)
          </option>
          <option value="shared-nanny">Shared nanny (multiple families)</option>
          <option value="live-in-nanny">Live with family housemade</option>
        </select>
      </div>

      <div v-if="['nanny', 'shared-nanny'].includes(lookingFor)" class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="working-days"
          >Full time / Part time</label
        >
        <select
          id="working-days"
          v-model="isFullTime"
          class="form-select block w-full bg-gray-200 px-4 py-3 rounded-lg focus:bg-white focus:outline-none focus:shadow-outline"
        >
          <option value="full-time">Full time</option>
          <option value="part-time">Part time</option>
        </select>

        <div v-if="isFullTime === 'part-time'">
          <label class="block text-gray-700 font-bold mb-2" for="working-hours"
            >The working hours</label
          >
          <input
            id="working-hours"
            v-model="workingHours"
            class="form-input block w-full bg-gray-200 px-4 py-3 rounded-lg focus:bg-white focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Type your prefered hours. e.g. 9-5"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="start-date"
          >For what date? Select a date for when the nanny should start.</label
        >
        <input
          id="start-date"
          v-model="startDate"
          class="form-input block w-full bg-gray-200 px-4 py-3 rounded-lg focus:bg-white focus:outline-none focus:shadow-outline"
          type="date"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="children-number"
          >How many children will she guard?</label
        >
        <select
          id="children-number"
          class="form-select block w-full bg-gray-200 px-4 py-3 rounded-lg focus:bg-white focus:outline-none focus:shadow-outline"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="can-drive"
          >Will nanny have to drive children? (from school etc.)</label
        >
        <div class="mt-2">
          <div class="inline-flex items-center">
            <input
              id="can-drive"
              v-model="canDrive"
              type="radio"
              class="form-radio"
              value="yes"
            />
            <span class="ml-2">Yes</span>
          </div>
          <div class="inline-flex items-center ml-6">
            <input
              v-model="canDrive"
              type="radio"
              class="form-radio"
              value="no"
              checked
            />
            <span class="ml-2">No</span>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <ClientOnly>
          <GAutoComplete />
        </ClientOnly>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="languages"
          >Languages spoken (you can select multiple)</label
        >
        <select
          id="languages"
          v-model="languages"
          class="form-select block w-full bg-gray-200 px-4 py-3 rounded-lg focus:bg-white focus:outline-none focus:shadow-outline"
          multiple
        >
          <option value="1">English</option>
          <option value="2">German</option>
          <option value="3">Russian</option>
          <option value="4">French</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="needs-reviews"
          >Other</label
        >
        <select
          id="needs-reviews"
          class="form-select block w-full bg-gray-200 px-4 py-3 rounded-lg focus:bg-white focus:outline-none focus:shadow-outline"
        >
          <option value="1">Confidence (has reviews)</option>
          <option value="2">Training and certificates</option>
          <option value="4">Additional services (can cook, clean etc.)</option>
        </select>
      </div>

      <input type="submit" />
    </form>
    <SearchMap
      :center="defaultLocation as google.maps.LatLngLiteral"
      :nannys="nannys!"
    />
  </div>
</template>
