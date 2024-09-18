<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  to: {
    type: [String, Object],
    default: undefined
  },
  href: {
    type: String,
    default: ''
  }
})
// state
const href = toRef(props, 'href')
const to = toRef(props, 'to')

const defaultStyle = 'transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline'
const selectedStyle = computed(() => props.type === 'button' ? 'cursor-pointer border transition-color duration-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:dark:ring-offset-gray-50 focus:dark:ring-gray-400 focus:ring-gray-600/[0.6] focus:ring-offset-gray-800/[0.6] flex items-center justify-center font-semibold text-white bg-primary-500 hover:bg-primary-400 hover:text-white hover:no-underline border-primary-500 h-9 px-4 text-sm rounded mr-2' : '')
</script>

<template>
  <NuxtLink
    v-if="to"
    tag="a"
    :to="to"
    :class="`${defaultStyle} ${selectedStyle}`"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a
    v-else
    :class="`${defaultStyle} ${selectedStyle}`"
    :href="href"
  >
    <slot>{{ text }}</slot>
  </a>
</template>
