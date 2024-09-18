<script setup lang="ts">
const emit = defineEmits(['isParent'])
const isParent = ref()

const toggleParent = (isPar:boolean) => {
  isParent.value = isPar
  emit('isParent', isPar)
}
</script>
<template>
  <Transition
    name="fade"
    mode="out-in"
    appear
  >
    <div class="mx-auto w-full max-w-sm lg:w-96 mb-4">
      <h1 class="mb-4">
        I am a...
      </h1>
      <div class="flex">
        <button
          class="grow bg-transparent hover:bg-cyan-500 text-blue-700
            font-semibold hover:text-white py-2 px-4 border border-blue-500
            hover:border-transparent rounded mr-2"
          :class="{'bg-cyan-500 text-white border-transparent': isParent === true}"
          @click="toggleParent(true)"
        >
          Parent
        </button>
        <button
          class="grow bg-transparent hover:bg-pink-500 text-blue-700
            font-semibold hover:text-white py-2 px-4 border border-blue-500
            hover:border-transparent rounded ml-2"
          :class="{'bg-pink-500 text-white border-transparent': isParent === false}"
          @click="toggleParent(false)"
        >
          Nanny
        </button>
      </div>
    </div>
  </Transition>
</template>
