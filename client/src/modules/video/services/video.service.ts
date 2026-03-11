import { apiClient } from '@/api/apiClient'

const UPLOAD_FIELD = 'video'

export type UploadVideoResult = {
  id: string
  fileUrl: string
}

export type UploadProgressHandler = (progress: number) => void

export type UploadVideoOptions = {
  onProgress?: UploadProgressHandler
}

export async function uploadVideo(
  file: File,
  options?: UploadVideoOptions
): Promise<UploadVideoResult> {
  const formData = new FormData()
  formData.append(UPLOAD_FIELD, file)
  const onProgress = options?.onProgress

  const { data } = await apiClient.post<{ data?: UploadVideoResult }>(
    '/video/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        if (event.total && event.total > 0 && onProgress) {
          onProgress(Math.round((event.loaded / event.total) * 100))
        }
      },
    }
  )

  const result = data?.data
  if (!result) {
    throw new Error('Invalid upload response')
  }
  return result
}
