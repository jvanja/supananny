<script setup lang="ts">
// Resources:
// https://www.nounou-top.fr/
// https://www.youtube.com/watch?v=XwCjVZZGiO8&t=81s
// definePageMeta({
//   middleware: 'is-logged-in'
// })
useHead({
  title: 'Supa Nanny',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ]
})

// const user = useSupabaseUser()
//
// watch(user, (user) => {
//   if (user) {
//     navigateTo('/home')
//   }
// })
</script>
<template>
  <div>
    <h2>Welcome to [Babysitters Network], your trusted source for finding reliable babysitters.</h2>

    <h3>Our platform makes it easy for you to find and book a babysitter that fits your needs, whether it be special needs experience, language fluency, or CPR certification.</h3>

    <h3>We prioritize safety with thorough background checks and in-person interviews for all of our babysitters.</h3>

    <h3>Our customer service is top-notch and our platform utilizes technology to streamline the booking process.</h3>

    <h3>We also encourage a sense of community among our families and babysitters through feedback and recommendations.</h3>

    <h3>Thank you for choosing [Babysitters Network].</h3>
  </div>
</template>
