import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/helpers'

export type DialogBodyProps = {
  children: ReactNode
  className?: string
}

export function DialogBody({ children, className }: DialogBodyProps) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}
