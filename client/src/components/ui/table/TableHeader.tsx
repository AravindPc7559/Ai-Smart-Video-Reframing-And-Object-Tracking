import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/helpers'

export type TableHeaderProps = {
  children: ReactNode
  className?: string
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn('bg-slate-50', className)}>
      {children}
    </thead>
  )
}
