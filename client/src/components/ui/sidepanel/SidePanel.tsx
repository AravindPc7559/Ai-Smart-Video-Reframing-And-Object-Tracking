import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/shared/utils/helpers'

export type SidePanelProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  side?: 'left' | 'right'
  width?: string
  className?: string
}

export function SidePanel({
  open,
  onClose,
  title,
  children,
  side = 'right',
  width = '28rem',
  className,
}: SidePanelProps) {
  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'sidepanel-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          'relative flex flex-col bg-white shadow-xl',
          side === 'right' ? 'ml-auto' : 'mr-auto',
          className
        )}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 id="sidepanel-title" className="text-lg font-semibold text-slate-900">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close panel"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex-1 overflow-auto">{children}</div>
      </aside>
    </div>,
    document.body
  )
}
