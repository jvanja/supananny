<script setup lang="ts">
import type { Database } from '~/types/database.types'
type Post = Database['public']['Tables']['posts']['Row']
type Message = Database['public']['Tables']['messages']['Row']

defineProps({
  posts: {
    type: Array<Post & { messages: Message[] }>,
    default: () => []
  }
})

const dateFull = (d: string) => {
  const date = new Date(d)
  return date.toLocaleDateString('en-RS', { year: 'numeric', month: 'short', day: 'numeric' })
}

const simpleDate = (d: string) => {
  const date = new Date(d)
  return date.toLocaleDateString('en-RS', { year: 'numeric', month: 'numeric', day: 'numeric' })
}
</script>
<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      <li v-for="post in posts" :key="post.id">
        <NuxtLink :to="'/posts/' + post.id.toString()" class="block hover:bg-gray-50">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-indigo-600 truncate">
                {{ post.post }}
              </p>
              <div class="ml-2 flex-shrink-0 flex">
                <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Job Post
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <UIcon name="heroicons-users" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ post.messages.length }} messages
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <UIcon name="heroicons-map-pin-solid" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  New York, NY
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <UIcon name="heroicons-calendar" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <p>
                  Closing on
                  {{ ' ' }}
                  <time :datetime="simpleDate(post.created_at!)">{{ dateFull(post.created_at!) }}</time>
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
