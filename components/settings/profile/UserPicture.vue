<template>
  <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
    <p class="text-sm font-medium text-gray-700" aria-hidden="true">Photo</p>
    <div class="mt-1 lg:hidden">
      <div class="flex items-center">
        <div class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12" aria-hidden="true">
          <img class="rounded-full h-full w-full object-cover" :src="userPicture" alt="" />
        </div>
        <div class="ml-5 rounded-md shadow-sm">
          <div
            class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500">
            <label for="user_photo" class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
              <span>Change</span>
              <span class="sr-only">user photo</span>
            </label>
            <button type="button" class="user-photo-input absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </div>

    <div class="hidden relative rounded-full overflow-hidden lg:block">
      <img class="relative rounded-full w-40 h-40 object-cover" :src="userPicture" alt="" />
      <label
        for="user-photo"
        class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
        <span>Change</span>
        <span class="sr-only">user photo</span>
        <button type="button" class="user-photo-input absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
      </label>
    </div>
    <!-- Uppy Dashboard for file uploads -->
    <div ref="uppyDashboard"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'

const emit = defineEmits(['setPictureUrl'])
const uppyDashboard = ref()
let uppyInstance

const props = defineProps({
  userPicture: {
    type: String,
    required: true,
    default: 'https://img.freepik.com/premium-vector/default-female-user-profile-icon-vector-illustration_276184-169.jpg',
  },
})

const userPicture = ref(props.userPicture)

const setPictureUrl = (url: string) => {
  userPicture.value = url
}

onMounted(() => {
  // Initialize Uppy with Dashboard, Webcam and XHRUpload plugins
  uppyInstance = new Uppy().use(Dashboard, { inline: false, target: uppyDashboard.value, trigger: '.user-photo-input' })

  // Add the Webcam plugin to Uppy
  uppyInstance.use(Webcam, {
    modes: ['picture'], 
    mirror: true,
  })

  // Add the XHRUpload plugin to send the file to the backend
  uppyInstance.use(XHRUpload, {
    endpoint: '/api/uploader', // API route for file uploading
    fieldName: 'picture', // Name of the form field
  })

  uppyInstance.on('upload-success', (file, response) => {
    console.log(file!.name, response.uploadURL)

    if (response.status === 200) {
      emit('setPictureUrl', response.body!.path)
      setPictureUrl(response.body!.path)
    }
  })
})
</script>

<style>
/* Optional styling */
@import url('~/assets/css/libs/uppy.min.css');
</style>
