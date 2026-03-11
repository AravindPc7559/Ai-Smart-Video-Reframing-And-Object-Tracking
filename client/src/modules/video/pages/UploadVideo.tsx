import { useNavigate } from 'react-router-dom'
import { VideoUploader } from '../components/VideoUploader'
import { VideoPlayer } from '../components/VideoPlayer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useToast, Button } from '@/components/ui'
import { logoutThunk } from '@/modules/auth/store/auth.thunks'

export function UploadVideo() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const videos = useAppSelector((s) => s.video.videos)
  const { showToast } = useToast()

  const latestVideo = videos.length > 0 ? videos[videos.length - 1] : null
  const previewUrl = latestVideo?.fileUrl ?? null

  const handleLogout = () => {
    dispatch(logoutThunk())
    showToast({ type: 'info', message: 'Logged out' })
    navigate('/login', { replace: true })
  }

  const handleProcessVideo = () => {}

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold text-slate-900">Video Upload</h1>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-slate-600">{user.email}</span>
            )}
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-slate-900">
            Upload a video
          </h2>
          <VideoUploader />
        </div>

        {previewUrl && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-slate-900">
              Video preview
            </h2>
            <VideoPlayer videoUrl={previewUrl} />
            <div className="mt-4">
              <Button variant="primary" onClick={handleProcessVideo}>
                Process video
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
