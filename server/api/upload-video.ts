import { defineEventHandler, readMultipartFormData } from 'h3'
import { writeFileSync } from 'fs'
import { join } from 'path'
// import { v4 as uuidv4 } from 'uuid' // For generating unique filenames

export default defineEventHandler(async (event) => {
  // Read multipart form data
  const files = await readMultipartFormData(event)

  // Check if files are uploaded
  if (!files || files.length === 0) {
    return { success: false, message: 'No files uploaded' }
  }

  // Assume the first file is the video
  // const videoFile = files[0]
  const videoFile = files[files.length - 1]

  // Log the file to see its structure
  console.log('Uploaded file:', videoFile)

  // Handle cases where the filename might be undefined
  // let filename = videoFile.filename || `video-${uuidv4()}.mp4` // Generate a filename if undefined
  const filename = videoFile.filename || `video.mkv` // Generate a filename if undefined

  // Define the path where the video will be stored
  const videoPath = join(process.cwd(), 'public/users/videos', filename)

  try {
    // Save the file to /public/videos
    writeFileSync(videoPath, videoFile.data)

    return { success: true, message: 'Video uploaded successfully', path: videoPath }
  } catch (error) {
    console.error('Error saving video:', error)
    return { success: false, message: 'Error saving video' }
  }
})
