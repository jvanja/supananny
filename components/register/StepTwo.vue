<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
// import type { Database } from '~/types/database.types'
const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: 'This is required' })
      .email({ message: 'Must be a valid email' }),
    password: zod
      .string()
      .min(1, { message: 'This is required' })
      .min(8, { message: 'Too short' }),
  })
)
defineProps<{
  isParent: boolean
}>()

// const supabase = useSupabaseClient<Database>()
const errorMessage = ref('')
const onSubmit = async (values: { email: string; password: string }) => {

  try {
    const response = await useAuthUser().register(values)
    if (response.meta.job_type === 3) {
      await navigateTo('/welcome')
    } else {
      await navigateTo('/dashboard')
    }
  } catch (error) {
    errorMessage.value = String(error)
  }
}
</script>
<template>
  <Transition name="fade" mode="out-in" appear>
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Join 1300 large community in Supa Nanny
        </h2>
      </div>

      <div class="mt-8">
        <div class="mt-6">
          <Form
            class="space-y-6"
            :validation-schema="validationSchema"
            @submit="onSubmit"
          >
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div class="mt-1">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="email" class="text-sm text-red-600" />
              </div>
            </div>
            <div class="space-y-1">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div class="mt-1">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  v-slot="{ message }"
                  as="div"
                  name="password"
                  class="text-sm text-red-600"
                >
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <p v-html="message" />
                </ErrorMessage>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  for="remember_me"
                  class="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
              <div class="text-red-600 text-sm">
                {{ errorMessage }}
              </div>
            </div>
          </Form>
        </div>

        <div>
          <div class="my-4">
            <div class="w-full border-t border-gray-300 mb-4" />
            <div class="relative text-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
              <div class="text-sm text-gray-500">
                <button @click="$bus.emit('OPEN_LOGIN_DIALOG')">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
