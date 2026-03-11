import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/modules/auth/store/auth.slice'
import { videoReducer } from '@/modules/video/store/video.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
