<script setup lang="ts">
// async function updateUserBilling() {
//   const result = await userStore.updateUser()
//   const toast = useToast()
//   if (result) {
//     toast.add({
//       title: 'Profile updated!',
//       description: 'Your profile has been successfully updated.',
//       timeout: 3000,
//       icon: 'i-heroicons-check-circle',
//     })
//   } else {
//     toast.add({
//       title: 'Profile update failed!',
//       description: 'Your profile could not be updated.',
//       timeout: 3000,
//       icon: 'i-heroicons-x-circle-16-solid',
//       color: 'red',
//     })
//   }
// }
import { ref, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'

// Ref for billing details
const billingDetails = ref({
  name: '',
  email: '',
  address: {
    line1: '',
    city: '',
    state: '',
  },
  card: {
    last4: '', // To show last 4 digits of the card
    paymentMethodId: '', // To update the payment method
  },
})

// Replace with actual customerId from authentication context or store
const customerId = 'your-stripe-customer-id'

// Fetch billing details and card information on component mount
onMounted(async () => {
  const { data, error } = await useFetch(`/api/stripe/customer`, {
    params: { customerId },
  }).json()

  if (data.value) {
    billingDetails.value = {
      name: data.value.name || '',
      email: data.value.email || '',
      address: data.value.address || { line1: '', city: '', state: '' },
      card: {
        last4:
          data.value.invoice_settings.default_payment_method?.card?.last4 || '',
        paymentMethodId: '', // Empty for new input if the user wants to update
      },
    }
  } else if (error.value) {
    console.error('Error fetching billing details:', error.value)
  }
})

// Update billing and card information
const updateBilling = async () => {
  try {
    const response = await $fetch(`/api/stripe/customer`, {
      method: 'POST',
      params: { customerId },
      body: {
        ...billingDetails.value,
        paymentMethodId: billingDetails.value.card.paymentMethodId, // Update payment method
      },
    })

    if (response) {
      alert('Billing information updated successfully.')
    }
  } catch (error) {
    console.error('Error updating billing information:', error)
    alert('Failed to update billing information.')
  }
}
</script>
<template>
  <div class="divide-y divide-gray-200 lg:col-span-9 py-6 px-4 sm:p-6 lg:pb-8">
    <h2 class="text-xl font-semibold text-gray-700 mb-6">
      Billing Information
    </h2>

    <form class="space-y-4" @submit.prevent="updateBilling">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          id="name"
          v-model="billingDetails.name"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          id="email"
          v-model="billingDetails.email"
          type="email"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Address -->
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700"
          >Address</label
        >
        <input
          id="address"
          v-model="billingDetails.address.line1"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div class="flex space-x-4">
        <input
          v-model="billingDetails.address.city"
          type="text"
          placeholder="City"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <input
          v-model="billingDetails.address.state"
          type="text"
          placeholder="State"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Credit Card Section -->
      <div>
        <label for="card" class="block text-sm font-medium text-gray-700"
          >Credit Card</label
        >
        <div class="flex items-center">
          <span v-if="billingDetails.card.last4" class="mr-2 text-gray-500">
            **** **** **** {{ billingDetails.card.last4 }}
          </span>
          <input
            id="card"
            v-model="billingDetails.card.paymentMethodId"
            type="text"
            placeholder="Payment Method ID"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <p class="text-sm text-gray-500 mt-1">
          Enter the new payment method ID if you want to update your card.
        </p>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Billing Information
        </button>
      </div>
    </form>
  </div>
</template>
