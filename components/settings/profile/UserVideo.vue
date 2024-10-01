<template>
  <div class="max-w-3xl mx-auto py-10">
    <h2 class="text-2xl font-semibold mb-6">Upload a Video</h2>

    <!-- Uppy Dashboard for file uploads -->
    <div ref="uppyDashboard"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Webcam from '@uppy/webcam'
import XHRUpload from '@uppy/xhr-upload'

const emit = defineEmits(['setVideoUrl'])
const uppyDashboard = ref(null)
let uppyInstance

onMounted(() => {
  // Initialize Uppy with Dashboard, Webcam and XHRUpload plugins
  uppyInstance = new Uppy({
    restrictions: {
      maxNumberOfFiles: 1, // Only allow 1 video at a time
      allowedFileTypes: ['video/*'],
    },
    autoProceed: false, // Wait for the user to click the upload button
  })

  // Add the Uppy Dashboard plugin
  uppyInstance.use(Dashboard, {
    target: uppyDashboard.value,
    inline: true,
    showProgressDetails: true,
    proudlyDisplayPoweredByUppy: false,
  })

  // Add the Webcam plugin to Uppy
  uppyInstance.use(Webcam, {
    modes: ['video-audio'], // Allow recording with both video and audio
    mirror: true,
    countdown: true,
  })

  // Add the XHRUpload plugin to send the file to the backend
  uppyInstance.use(XHRUpload, {
    endpoint: '/api/uploader', // API route for file uploading
    fieldName: 'video', // Name of the form field
  })

  uppyInstance.on('upload-success', (file, response) => {
    console.log(file.name, response.uploadURL);

    if(response.status === 200) {
      emit('setVideoUrl', response.body.path)
    }
  })
})
</script>

<style>
/* Optional styling */
@import url('~/assets/css/libs/uppy.min.css');
</style>
