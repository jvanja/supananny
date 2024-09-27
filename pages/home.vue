<script setup lang="ts">
import type { Database } from '~/types/database.types'
type Post = Database['public']['Tables']['posts']['Row']
type Message = Database['public']['Tables']['messages']['Row']

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

definePageMeta({
  // middleware: 'auth'
  // layout: 'dashboard'
})

const { data: posts } = await useAsyncData('posts', async () => {
  const { data } = await supabase.from('posts')
    .select(`
      *,
      messages (*)
    `)
    .eq('user', user.value!.id)
    .order('created_at')
  return data as Array<Post & { messages: Message[] }>
})

const config = useRuntimeConfig()
console.log(config.public.apiBase, config.apiSecret)

</script>
<template>
  <div>
    <h2>Welcome to your dashboard</h2>
    <Jobs :posts="posts!" />
  </div>
</template>
