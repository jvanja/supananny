import { defineEventHandler, readMultipartFormData } from 'h3'
import { writeFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // Read multipart form data
  const files = await readMultipartFormData(event)

  // Check if files are uploaded
  if (!files || files.length === 0) {
    return { success: false, message: 'No files uploaded' }
  }

  const uploadedFile = files[files.length - 1]

  // Log the file to see its structure
  console.log('Uploaded file:', uploadedFile)

  // Handle cases where the filename might be undefined
  const filename = uploadedFile.filename!

  // Define the path where the file will be stored
  const uploadPath = join(process.cwd(), 'public/users/media', filename)

  try {
    // Save the file to /public/users/media
    // - TODO:
    // Change file name to be passed user's uuid.mkv
    writeFileSync(uploadPath, uploadedFile.data)

    const baseUrl = process.env.BASE_URL
    const mediaUrl = `${baseUrl}/users/media/${filename}`
    return { success: true, message: 'Media uploaded successfully', path: mediaUrl }
  } catch (error) {
    console.error('Error saving file:', error)
    return { success: false, message: 'Error saving file' }
  }
})
