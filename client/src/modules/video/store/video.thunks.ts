import { createAsyncThunk } from '@reduxjs/toolkit'
import { setUploadProgress } from './video.slice'
import * as videoService from '../services/video.service'

export const uploadVideoThunk = createAsyncThunk(
  'video/upload',
  async (
    file: File,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const result = await videoService.uploadVideo(file, {
        onProgress: (progress) => {
          dispatch(setUploadProgress(progress))
        },
      })
      return result
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Upload failed')
    }
  }
)
