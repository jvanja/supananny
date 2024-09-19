<script setup lang="ts">
definePageMeta({
  middleware: 'is-logged-in'
})
const step = ref(1)
const signUp = ref({
  isParent: false
})
const stepChange = (newStep: number) => {
  step.value = newStep
}

const toggleParent = (isParent: boolean) => {
  signUp.value.isParent = isParent
}
</script>

<template>
  <div class="min-h-screen bg-white flex -mt-6">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <template v-if="step === 1">
        <RegisterStepOne @is-parent="toggleParent" />
      </template>
      <template v-else>
        <RegisterStepTwo :is-parent="signUp.isParent" />
      </template>
      <RegisterFormNavigation :current-step="step" :total-steps="2" :is-next-button-disabled="false" @step-change="stepChange" />
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="">
    </div>
  </div>
</template>
