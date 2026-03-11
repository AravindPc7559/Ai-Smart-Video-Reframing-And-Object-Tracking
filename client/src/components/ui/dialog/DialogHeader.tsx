import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/helpers'

export type DialogHeaderProps = {
  children: ReactNode
  className?: string
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div className={cn('border-b border-slate-200 px-6 py-4', className)}>
      {children}
    </div>
  )
}
