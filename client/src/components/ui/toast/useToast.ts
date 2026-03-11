import { useCallback } from 'react'
import { useToastStore } from '@/app/stores/toastStore'
import type { ToastType } from '@/app/stores/toastStore'

export type ToastOptions = {
  type?: ToastType
  message: string
}

export function useToast() {
  const addToast = useToastStore((s) => s.addToast)

  const showToast = useCallback(
    (options: ToastOptions) => {
      addToast(options.message, options.type ?? 'info')
    },
    [addToast]
  )

  return { showToast }
}
