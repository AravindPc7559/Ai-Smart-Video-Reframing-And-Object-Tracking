import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useToast } from '@/components/ui'
import { uploadVideoThunk } from '../store/video.thunks'

export function VideoUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const { uploadLoading, uploadProgress, uploadError } = useAppSelector((s) => s.video)
  const { showToast } = useToast()

  useEffect(() => {
    if (!uploadLoading && uploadProgress === 100) {
      showToast({ type: 'success', message: 'Video uploaded successfully' })
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }, [uploadLoading, uploadProgress, showToast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) dispatch(uploadVideoThunk(file))
  }

  const showSuccess = !uploadLoading && uploadProgress === 100

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/quicktime,video/webm"
          onChange={handleFileChange}
          disabled={uploadLoading}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      {uploadError && (
        <p className="text-sm text-red-600">{uploadError}</p>
      )}
      {uploadLoading && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Uploading…</p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      {showSuccess && (
        <p className="text-sm font-medium text-emerald-600">Upload complete.</p>
      )}
    </div>
  )
}
