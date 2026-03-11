import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Login } from '@/modules/auth/pages/Login'
import { Register } from '@/modules/auth/pages/Register'
import { UploadVideo } from '@/modules/video/pages/UploadVideo'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/upload-video"
        element={
          <ProtectedRoute>
            <UploadVideo />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/upload-video" replace />} />
      <Route path="*" element={<Navigate to="/upload-video" replace />} />
    </Routes>
  )
}
