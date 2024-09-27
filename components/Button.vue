<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  }
})
// state:styles
const defaultStyle = `
  cursor-pointer
  border transition-color duration-300
  flex items-center justify-center font-semibold
`
// const styles = reactive<{
//   [key: string]: string
// }>({
const styles:{ [key: string]: string } = {
  none: 'hover:bg-slate-100',
  primary: 'text-white bg-primary-500 hover:bg-primary-400 border-primary-500',
  secondary:
    'text-slate-800 bg-gray-200 border-gray-200 hover:bg-gray-300 dark:text-white dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700',
  opposite:
    'text-white bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-900 dark:text-gray-800 dark:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:border-white'
}
const sizes = reactive<{
  [key: string]: string
}>({
  lg: 'h-13 px-8 text-lg rounded-lg',
  md: 'h-10 px-6 text-base rounded',
  sm: 'h-9 px-4 text-sm rounded',
  xs: 'h-6 px-3 text-xs rounded'
})
// state
const selectedStyle = computed(() => props.type in styles ? styles[props.type] : styles.primary)
const selectedSize = computed(() => sizes[props.size] || sizes.lg)
</script>

<template>
  <button
    :class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
  >
    <slot />
  </button>
</template>
