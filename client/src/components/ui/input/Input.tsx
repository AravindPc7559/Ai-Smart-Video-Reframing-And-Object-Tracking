import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/helpers'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode
  error?: string
  className?: string
  inputClassName?: string
}

export function Input({
  label,
  error,
  className,
  inputClassName,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          inputClassName
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={inputId ? `${inputId}-error` : undefined} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
