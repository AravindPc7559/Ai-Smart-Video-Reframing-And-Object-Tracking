import { cn } from '@/shared/utils/helpers'

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
}

export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}
