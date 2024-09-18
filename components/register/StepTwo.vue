<script setup lang="ts">
import { configure, Field, Form, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
// import GoogleIcon from '~icons/ant-design/google-circle-filled'
import { type Database } from '~/types/database.types'

const supabase = useSupabaseClient<Database>()

const errorMessage = ref('')

configure({
  validateOnBlur: true,
  validateOnChange: true,
  // validateOnInput: true,
  validateOnModelUpdate: true
})

const formObject = zod.object({
  // firstName: zod.string(),
  // lastName: zod.string(),
  email: zod.string()
    .min(1, { message: 'This is required' })
    .email({ message: 'Must be a valid email' }),
  password: zod.string()
    .min(6, { message: 'Too short. Min 6 characters' })
    .max(32, { message: 'Too long. Max 32 characters' })
    .regex(/^[.*[*.!@$%^&(){}[\]:;<>,.?/\\|~_+-=\w]*$/,
    `Allowed characters: <br>
    1. Uppercase [A-Z] and lowercase characters [a-z] <br>
    2. Special characters [*.!@#$%^&(){}[]:;<>,.?/~_+-=|] <br>
    3. At least 6 characters in length, but no more than 32.`)
})

const validationSchema = toTypedSchema(
  formObject
)

const signup = async (values: {email: string, password: string}) => {
  const { error } = await supabase.auth.signUp(values)
  if (error) {
    errorMessage.value = error.message
  }
}
</script>
<template>
  <Transition
    name="fade"
    mode="out-in"
    appear
  >
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Join 1300 large community in Supa Nanny
        </h2>
      </div>

      <div class="mt-8">
        <div class="mt-6">
          <Form v-slot="{ handleSubmit }" :validation-schema="validationSchema">
            <form class="space-y-6" @submit="handleSubmit($event, signup)">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div class="mt-1">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    class="appearance-none block w-full px-3 py-2 border
              border-gray-300 rounded-md shadow-sm placeholder-gray-400
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              sm:text-sm"
                  />
                  <ErrorMessage name="email" class="text-sm text-red-600" />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div class="mt-1">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage v-slot="{ message }" as="div" name="password" class="text-sm text-red-600">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <p v-html="message" />
                  </ErrorMessage>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                  <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign in
                </button>
                <div class="text-red-600 text-sm">
                  {{ errorMessage }}
                </div>
              </div>
            </form>
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
                <button @click="$bus.emit('OPEN_LOGIN_DIALOG')">
                  Login
                </button>
              </div>
            </div>

            <!-- <div class="mt-1 grid grid-cols-2 gap-3"> -->
            <!--   <div> -->
            <!--     <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"> -->
            <!--       <span class="sr-only">Sign in with Facebook</span> -->
            <!--       <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"> -->
            <!--         <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" /> -->
            <!--       </svg> -->
            <!--     </a> -->
            <!--   </div> -->

            <!--   <div> -->
            <!--     <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"> -->
            <!--       <span class="sr-only">Sign in with Google</span> -->
            <!--       <GoogleIcon style="font-size: 1.23em" /> -->
            <!--     </a> -->
            <!--   </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
