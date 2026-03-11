import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/helpers'

export type TableRowProps = {
  children: ReactNode
  className?: string
}

export function TableRow({ children, className }: TableRowProps) {
  return <tr className={cn('hover:bg-slate-50', className)}>{children}</tr>
}
