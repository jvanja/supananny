<script setup lang="ts">
const supabase = useSupabaseClient()
const {
  data: { user },
} = await supabase.auth.getUser()

// refs
const userData = ref(user)
const email = ref(userData.value?.email)
const newPassword = ref('')

// methods
async function updateUserAccount() {
  console.log(email.value, newPassword.value)
  let user
  if (newPassword.value === '') {
    const { data, error } = await supabase.auth.updateUser({
      email: email.value,
    })
    user = data
    if (error) throw error
  } else {
    const { data, error } = await supabase.auth.updateUser({
      email: email.value,
      password: newPassword.value,
    })
    user = data
    if (error) throw error
  }

  const toast = useToast()
  if (user) {
    toast.add({
      title: 'Account updated!',
      description: 'Your account has been successfully updated.',
      timeout: 3000,
      icon: 'i-heroicons-check-circle',
    })
  } else {
    toast.add({
      title: 'Account update failed!',
      description:
        'Your account could not be updated due to an error. Please try again.',
      timeout: 3000,
      icon: 'i-heroicons-x-circle-16-solid',
      color: 'red',
    })
  }
}
</script>
<template>
  <form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
    <!-- Profile section -->
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 class="text-lg leading-6 font-medium text-gray-900">
          Your account settings
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          This is where you can update your account settings.
        </p>
      </div>

      <div class="mt-6 grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email address</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
          />
        </div>

        <div class="col-span-12">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >New password</label
          >
          <input
            id="new_password"
            v-model="newPassword"
            type="password"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>

    <div class="pt-6 divide-y divide-gray-200">
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
          @click.prevent="updateUserAccount"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>
