<script setup lang="ts">
import BackArrow from '~icons/eva/arrow-ios-back-fill'

const emit = defineEmits(['stepChange'])

const props = defineProps<{
  currentStep: number,
  totalSteps: number,
  isNextButtonDisabled: boolean
}>()

const isFirstStep = computed(() => props.currentStep === 1)
const nextButtonText = computed(() => props.currentStep === props.totalSteps ? 'Finish' : 'Next')

const navigateBack = () => {
  if (props.currentStep > 1) {
    emit('stepChange', props.currentStep - 1)
  }
}

const navigateNext = () => {
  if (props.currentStep < props.totalSteps) {
    emit('stepChange', props.currentStep + 1)
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      :class="{ 'opacity-50 cursor-not-allowed': isFirstStep }"
      qa-ref="back-button"
      @click="navigateBack"
    >
      <BackArrow class="mr-2 -ml-2 h-5 w-5" aria-hidden="true" /> Back
    </button>

    <span
      class="text-xs"
      qa-ref="navigation-steps"
    >
      {{ props.currentStep }} / {{ props.totalSteps }}
    </span>

    <button
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      :class="{ 'opacity-50 cursor-not-allowed': props.isNextButtonDisabled }"
      qa-ref="next-button"
      @click="navigateNext"
    >
      {{ nextButtonText }} <BackArrow class="ml-2 -mr-1 h-5 w-5 rotate-180" aria-hidden="true" />
    </button>
  </div>
</template>
