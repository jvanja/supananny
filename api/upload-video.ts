// server/api/upload-video.ts
import { defineEventHandler, readMultipartFormData } from 'h3'
import { writeFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)

  if (!files || files.length === 0) {
    return { success: false, message: 'No files uploaded' }
  }

  // Assume only one video file is uploaded, save it to /public/videos
  const videoFile = files[0]
  const videoPath = join(process.cwd(), 'public/users/videos', videoFile.filename!)

  // Save the file to /assets/videos
  writeFileSync(videoPath, videoFile.data)

  return { success: true, message: 'Video uploaded successfully' }
})
