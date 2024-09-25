<script setup>
// is user exists fetch the initial user data
const userStore = useUserStore()
await userStore.fetchAndSetUserData()
</script>
<template>
  <div class="min-h-full">
    <TheHeader />
    <main>
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
    <TheFooter />
  </div>
</template>
