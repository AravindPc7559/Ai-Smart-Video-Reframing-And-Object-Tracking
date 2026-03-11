import { useNavigate } from 'react-router-dom'
import { VideoUploader } from '../components/VideoUploader'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useToast, Button } from '@/components/ui'
import { logoutThunk } from '@/modules/auth/store/auth.thunks'

export function UploadVideo() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const { showToast } = useToast()

  const handleLogout = () => {
    dispatch(logoutThunk())
    showToast({ type: 'info', message: 'Logged out' })
    navigate('/login', { replace: true })
  }

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
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-slate-900">
            Upload a video
          </h2>
          <VideoUploader />
        </div>
      </main>
    </div>
  )
}
