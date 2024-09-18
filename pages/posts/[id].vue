<script setup lang="ts">
import type { Database } from '~/types/database.types'
type Post = Database['public']['Tables']['posts']['Row']
type Message = Database['public']['Tables']['messages']['Row']
type PostWithMessages = Post & {
  messages: Message[]
}
const supabase = useSupabaseClient<Database>()

definePageMeta({
  middleware: 'auth'
  // layout: 'dashboard'
})

const route = useRoute()
const postId = Number(route.params.id[0])

const { data: posts } = await useAsyncData('post', async () => {
  const { data } = await supabase.from('posts')
    .select('*, messages(*)')
    .eq('id', postId)
  return data as PostWithMessages[]
})

const post = posts.value![0]

const dateFull = (d: string) => {
  const date = new Date(d)
  return date.toLocaleDateString('en-RS', { year: 'numeric', month: 'short', day: 'numeric' })
}
console.log(post)
</script>
<template>
  <div>
    <p>{{ post.post }}</p>
    <p>{{ dateFull(post.created_at) }}</p>
    <div class="my-2" />
    <hr>
    <div class="my-2" />
    <h3>messages:</h3>
    <ul>
      <li v-for="message in post.messages" :key="message.id">
        {{ message.message }}
      </li>
    </ul>
  </div>
</template>
