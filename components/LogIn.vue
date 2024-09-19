<script setup lang="ts">
import { Field, Form, ErrorMessage } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'
import { Database } from '~/types/database.types'

const router = useRouter()
const supabase = useSupabaseClient<Database>()

const formObject = zod.object({
  email: zod.string().min(1, 'This is required').email({ message: 'Must be a valid email' }),
  password: zod.string().min(6, { message: 'Too short. Min 6 characters' })
})

const validationSchema = toFormValidator(
  formObject
)

// state
const errorMessage = ref('')

// methods
const login = async (values: zod.infer<typeof formObject>) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password
  })
  if (error) {
    errorMessage.value = error.message
  } else {
    // reload page
    router.go(0)
  }
}

const oauthLogin = async (oauthProvider) => {
  const authLogin = await supabase.auth.signInWithOAuth({
    provider: oauthProvider
  })
  if (authLogin.error) {
    errorMessage.value = authLogin.error.message
  } else {
    // router.go(0)
    console.log('google', window)
  }

  console.log(authLogin.data)
  // window.location.href = authLogin.data.url
}

const { $bus } = useNuxtApp()

const openSignupPage = () => {
  $bus.emit('CLOSE_LOGIN_DIALOG')
  router.push('/signup')
}
</script>

<template>
  <div class="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <Anchor href="#" class="font-medium text-indigo-600 hover:text-indigo-500" @click="openSignupPage">
          start your 14-day free trial
        </Anchor>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8">
        <div class="space-y-6">
          <Form v-slot="{ handleSubmit }" :validation-schema="validationSchema">
            <form @submit="handleSubmit($event, login)">
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

              <div class="mb-4">
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
                  <ErrorMessage name="password" class="text-sm text-red-600" />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                  <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div class="flex grow-1 text-sm">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div class="mt-4">
                <Button type="submit" button-type="opposite" class="w-full">
                  Sign In
                </Button>
                <div class="text-red-600 text-sm">
                  {{ errorMessage }}
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
                class="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
                @click="oauthLogin('google')"
              >
                <svg class="mr-2 -ml-1 w-5 h-5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Sign in with Google
              </button>
            </div>
            <div>
              <button
                class="w-full text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
                @click="oauthLogin('facebook')"
              >
                <svg class="mr-2 -ml-2 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z" /></svg>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
