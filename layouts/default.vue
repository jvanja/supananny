<script setup></script>
<template>
  <div>
    <UNotifications />
    <div class="min-h-full">
      <TheHeader class="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-8" />
      <main class="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-8">
        <slot />
      </main>
      <TheFooter class="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-8" b />
    </div>
  </div>
</template>
