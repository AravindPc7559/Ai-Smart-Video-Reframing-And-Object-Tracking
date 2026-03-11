import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/helpers'

export type DialogFooterProps = {
  children: ReactNode
  className?: string
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn('flex justify-end gap-2 border-t border-slate-200 px-6 py-4', className)}>
      {children}
    </div>
  )
}
