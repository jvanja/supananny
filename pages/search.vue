<script setup lang="ts">
import type { Database } from '~/types/database.types'
import { Loader } from '@googlemaps/js-api-loader'
const config = useRuntimeConfig()
const loader = new Loader({
  apiKey: config.public.googleApiKey,
  libraries: ['places'],
})

definePageMeta({
  middleware: 'auth',
})

const lookingForOptions = [
  { name: 'Nanny', value: 'nanny'},
  { name: 'Babysitter for the exact time (an evening, weekend etc.)', value: 'babysitter'},
  { name: 'Shared nanny (multiple families)',value: 'shared-nanny'},
  { name: 'Live with family housemade', value: 'housemade'},
]
const workingDaysOptions = [
  { name: 'Full time', value: 'full-time'},
  { name: 'Part time', value: 'part-time'},
]
const languageOptions = [
  { name: 'English', value: 'en'},
  { name: 'German', value: 'de'},
  { name: 'Russian', value: 'ru'},
  { name: 'French', value: 'fr'},
]
const confidenceOptions = [
  { name: 'Confidence (has reviews)', value: '1'},
  { name: 'Training and certificates', value: '2'},
  { name: 'Additional services (can cook, clean etc.)', value: '4'},
]
const childrenNumberOptions = ['1', '2', '3', '4']
const lookingFor = ref()
const isFullTime = ref('full-time')
const startDate = ref()
const workingHours = ref()
const childrenNumber = ref(1)
const canDrive = ref(false)
const languages = ref([])
const needsReviews = ref(1)

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
        <USelect id="looking-for" v-model="lookingFor" :options="lookingForOptions" option-attribute="name" />
      </div>

      <div v-if="['nanny', 'shared-nanny'].includes(lookingFor)" class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="working-days"
          >Full time / Part time</label
        >
        <USelect id="working-days" v-model="isFullTime" :options="workingDaysOptions" option-attribute="name" />

        <div v-if="isFullTime === 'part-time'" class="mt-4">
          <label class="block text-gray-700 font-bold mb-2" for="working-hours"
            >The working hours</label
          >
          <UInput
            id="working-hours"
            v-model="workingHours"
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
          class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          type="date"
        >
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="children-number"
          >How many children will she guard?</label
        >
        <USelect id="children-number" v-model="childrenNumber" :options="childrenNumberOptions" option-attribute="name" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="can-drive"
          >Will nanny have to drive children? (from school etc.)</label
        >
        <div class="mt-2">
          <URadioGroup v-model="canDrive" :options="['Yes', 'No']" />
        </div>
      </div>

      <div class="mb-4">
        <ClientOnly>
          <GAutoComplete :loader="loader" />
        </ClientOnly>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="languages"
          >Languages spoken (you can select multiple)</label
        >
        <USelect id="languages" v-model="languages" :options="languageOptions" option-attribute="name" multiple />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="needs-reviews"
          >Other</label
        >
        <USelect id="needs-reviews" v-model="needsReviews" :options="confidenceOptions" option-attribute="name" />
      </div>

      <Button @click="handleSubmit">Submit</Button>
    </form>
    <SearchMap
      :center="defaultLocation as google.maps.LatLngLiteral"
      :nannys="nannys!"
      :loader="loader"
    />
  </div>
</template>
