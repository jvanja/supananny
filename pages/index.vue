<script setup lang="ts">
// Resources:
// https://www.nounou-top.fr/
// https://www.youtube.com/watch?v=XwCjVZZGiO8&t=81s
definePageMeta({
  layout: 'landing'
})
useHead({
  title: 'Supa Nanny',
  meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
<template>
  <div class="bg-gray-50">
    <div class="relative overflow-hidden">
      <div class="absolute inset-y-0 h-full w-full" aria-hidden="true">
        <div class="relative h-full">
          <svg
            class="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)" />
          </svg>
          <svg
            class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)" />
          </svg>
        </div>
      </div>

      <div class="relative pt-6 pb-16 sm:pb-24">
        <div class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
          <div class="text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block">Welcome to [Babysitters Network],</span>
              <span class="block text-indigo-600">your trusted source for finding reliable babysitters.</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Our platform makes it easy for you to find and book a babysitter that fits your needs, whether it be
              special needs experience, language fluency, or CPR certification.
              <br />
              We prioritize safety with thorough background checks and in-person interviews for all of our babysitters.
              <br />
              Our customer service is top-notch and our platform utilizes technology to streamline the booking process.
              <br />
              We also encourage a sense of community among our families and babysitters through feedback and
              recommendations.
              <br />
              Thank you for choosing [Babysitters Network].
            </p>
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="absolute inset-0 flex flex-col" aria-hidden="true">
          <div class="flex-1" />
          <div class="flex-1 w-full bg-gray-800" />
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <img
            class="relative rounded-lg shadow-lg"
            src="https://tailwindui.com/plus/img/component-images/top-nav-with-multi-column-layout-screenshot.jpg"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
  </div>
</template>
