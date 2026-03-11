import type { ReactNode } from 'react'
import { useToastStore } from '@/app/stores/toastStore'
import { Toast } from './Toast'

type ToastProviderProps = {
  children?: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const { toasts, removeToast } = useToastStore()

  return (
    <>
      {children}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              id={t.id}
              message={t.message}
              type={t.type}
              onDismiss={removeToast}
            />
          ))}
        </div>
      )}
    </>
  )
}
