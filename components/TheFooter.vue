<template>
  <footer
    class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
  >
    <div class="sm:flex sm:items-center sm:justify-between">
      <NuxtLink to="/" class="flex items-center mb-4 sm:mb-0">
        <img
          src="/logo.png"
          class="mr-3 h-8"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >nanny+</span
        >
      </NuxtLink>
      <ul
        class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
      >
        <li>
          <NuxtLink to="/about" class="mr-4 hover:underline md:mr-6">
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/privacy" class="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="mr-4 hover:underline md:mr-6">
            Contact
          </NuxtLink>
        </li>
      </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
      © 2022
      <a href="https://flowbite.com/" class="hover:underline">Suppa Nanny™</a>.
      All Rights Reserved.
    </span>
  </footer>
</template>
