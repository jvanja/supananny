<template>
  <div class="max-w-3xl mx-auto py-10">
    <h2 class="text-2xl font-semibold mb-6">Upload a Video</h2>

    <!-- Uppy Dashboard for file uploads -->
    <div ref="uppyDashboard"></div>

    <button class="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" @click.prevent="uploadFiles">
      Upload Video
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Webcam from '@uppy/webcam'
import XHRUpload from '@uppy/xhr-upload'

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
    endpoint: '/api/upload-video', // API route for file uploading
    fieldName: 'video', // Name of the form field
  })
})

// Handle the file upload process
const uploadFiles = () => {
  uppyInstance.upload().then((result) => {
  console.log(result)
    if (result.successful.length > 0) {
      alert('Video uploaded successfully!')
    } else if (result.failed.length > 0) {
      alert('Upload failed!')
    }
  })
}

// Clean up Uppy instance on component unmount
onBeforeUnmount(() => {
  uppyInstance.close()
})
</script>

<style>
/* Optional styling */
@import url('~/assets/css/libs/uppy.min.css');
.uppy-Dashboard-inner {
  height: auto !important;
}
</style>
