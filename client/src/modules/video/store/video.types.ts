export type VideoItem = {
  id: string
  fileUrl: string
}

export type VideoState = {
  uploadLoading: boolean
  uploadProgress: number
  uploadError: string | null
  videos: VideoItem[]
}
