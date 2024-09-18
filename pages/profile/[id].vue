<script setup lang="ts">
import type { Database } from '~/types/database.types'
const supabase = useSupabaseClient<Database>()

definePageMeta({
  middleware: 'auth'
  // layout: 'dashboard'
})

const route = useRoute()
const userId = Number(route.params.id[0])

const { data: users } = await useAsyncData('users_meta', async () => {
  const { data } = await supabase.from('users_meta').select('*').eq('id', userId)
  return data
})
</script>
<template>
  <div>
    <p>{{ $route.params.id }}</p>
    <ul>
      <li v-for="user of users" :key="user.id" class="row">
        <div class="col">
          <div class="ma-2 pa-2">
            {{ user.name }}
          </div>
        </div>
        <div class="col">
          <div class="ma-2 pa-2">
            {{ user.created_at }}
          </div>
        </div>
        <div class="col">
          <div class="ma-2 pa-2">
            {{ user.about }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
