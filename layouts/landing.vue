<script setup></script>
<template>
  <div>
    <UNotifications />
    <div class="min-h-full">
      <TheHeader />
      <main>
        <slot />
      </main>
      <TheFooter />
    </div>
  </div>
</template>
