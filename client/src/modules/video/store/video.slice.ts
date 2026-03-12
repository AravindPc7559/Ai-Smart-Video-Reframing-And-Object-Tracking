import { createSlice } from '@reduxjs/toolkit'
import type { VideoState } from './video.types'
import { uploadVideoThunk, processVideoThunk } from './video.thunks'

const initialState: VideoState = {
  uploadLoading: false,
  uploadProgress: 0,
  uploadError: null,
  processLoading: false,
  processError: null,
  videos: [],
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setUploadProgress(state, action: { payload: number }) {
      state.uploadProgress = action.payload
    },
    clearUploadError(state) {
      state.uploadError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideoThunk.pending, (state) => {
        state.uploadLoading = true
        state.uploadProgress = 0
        state.uploadError = null
      })
      .addCase(uploadVideoThunk.fulfilled, (state, action) => {
        state.uploadLoading = false
        state.uploadProgress = 100
        state.uploadError = null
        state.videos.push(action.payload)
      })
      .addCase(uploadVideoThunk.rejected, (state, action) => {
        state.uploadLoading = false
        state.uploadProgress = 0
        state.uploadError = (action.payload as string) ?? action.error?.message ?? 'Upload failed'
      })
      .addCase(processVideoThunk.pending, (state) => {
        state.processLoading = true
        state.processError = null
      })
      .addCase(processVideoThunk.fulfilled, (state) => {
        state.processLoading = false
        state.processError = null
      })
      .addCase(processVideoThunk.rejected, (state, action) => {
        state.processLoading = false
        state.processError = (action.payload as string) ?? action.error?.message ?? 'Process failed'
      })
  },
})

export const { setUploadProgress, clearUploadError } = videoSlice.actions
export const videoReducer = videoSlice.reducer
