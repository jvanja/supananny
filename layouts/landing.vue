<script setup></script>
<template>
  <div>
    <UNotifications />
    <div class="min-h-full">
      <TheHeader class="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-8" />
      <main>
        <slot />
      </main>
      <TheFooter class="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-8" />
    </div>
  </div>
</template>
