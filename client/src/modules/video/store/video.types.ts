export type VideoItem = {
  id: string
  fileUrl: string
}

export type VideoState = {
  uploadLoading: boolean
  uploadProgress: number
  uploadError: string | null
  processLoading: boolean
  processError: string | null
  videos: VideoItem[]
}
