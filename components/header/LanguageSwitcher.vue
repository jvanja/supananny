<script setup>
import { useI18n } from 'vue-i18n'

const { locales, locale } = useI18n()

const switchLocale = (lang) => {
  locale.value = lang
}

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})

const getFlagIcon = (code) => {
  return `cif-${code}`
}
</script>
<template>
  <div
    v-for="locale in availableLocales"
    :key="locale.code"
    class="cursor-pointer flex items-center space-x-2"
    @click="switchLocale(locale.code)">
    <UIcon :name="getFlagIcon(locale.code)" class="h-6 w-4" />
    <!-- <span>{{ locale.name }}</span> -->
  </div>
</template>
