import { useEffect } from 'react'
import { useToastStore, type ToastType } from '@/app/stores/toastStore'
import { cn } from '@/shared/utils/helpers'

const typeStyles: Record<ToastType, string> = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-slate-50 border-slate-200 text-slate-800',
}

type ToastItemProps = {
  id: string
  message: string
  type: ToastType
  onDismiss: (id: string) => void
}

function ToastItem({ id, message, type, onDismiss }: ToastItemProps) {
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
      >
        ×
      </button>
    </div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          id={t.id}
          message={t.message}
          type={t.type}
          onDismiss={removeToast}
        />
      ))}
    </div>
  )
}
