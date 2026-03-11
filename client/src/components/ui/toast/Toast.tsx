import { useEffect } from 'react'
import { cn } from '@/shared/utils/helpers'
import type { ToastType } from '@/app/stores/toastStore'

const typeStyles: Record<ToastType, string> = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-slate-50 border-slate-200 text-slate-800',
}

export type ToastItemProps = {
  id: string
  message: string
  type: ToastType
  onDismiss: (id: string) => void
}

export function Toast({ id, message, type, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(id), 5000)
    return () => clearTimeout(t)
  }, [id, onDismiss])

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border px-4 py-3 shadow-sm',
        typeStyles[type]
      )}
      role="alert"
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="ml-4 text-inherit opacity-70 hover:opacity-100"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
