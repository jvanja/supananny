<template>
  <div class="bg-slate-50 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
    <div class="relative max-w-xl mx-auto">
      <div class="text-center">
        <h2
          class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >
          Contact us
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">
          Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
          massa dictumst amet. Sapien tortor lacus arcu.
        </p>
      </div>
      <div class="mt-12">
        <form
          action="#"
          method="POST"
          class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
        >
          <div>
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
              >First name</label
            >
            <div class="mt-1">
              <input
                id="first_name"
                v-model="first_name"
                type="text"
                name="first_name"
                autocomplete="given-name"
                class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
              >Last name</label
            >
            <div class="mt-1">
              <input
                id="last_name"
                v-model="last_name"
                type="text"
                name="last_name"
                autocomplete="family-name"
                class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Message</label
            >
            <div class="mt-1">
              <textarea
                id="message"
                v-model="message"
                name="message"
                rows="4"
                class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Switch
                  v-model="agreed"
                  :class="[
                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                  ]"
                >
                  <span class="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    :class="[
                      agreed ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                    ]"
                  />
                </Switch>
              </div>
              <div class="ml-3">
                <p class="text-base text-gray-500">
                  By selecting this, you agree to the
                  {{ ' ' }}
                  <a href="#" class="font-medium text-gray-700 underline"
                    >Privacy Policy</a
                  >
                  {{ ' ' }}
                  and
                  {{ ' ' }}
                  <a href="#" class="font-medium text-gray-700 underline"
                    >Cookie Policy</a
                  >.
                </p>
              </div>
            </div>
          </div>
          <div class="sm:col-span-2">
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click.prevent="submitForm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const message = ref('')
const agreed = ref(false)

const submitForm = () => {
  // Here would go the code to send the form data to a server
  console.log('Name:', first_name.value + ' ' + last_name.value)
  console.log('Email:', email.value)
  console.log('Message:', message.value)
  console.log('Agreed:', agreed.value)

}
</script>
