import { cn } from '@/shared/utils/helpers'

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded bg-slate-200', className)}
      aria-hidden
    />
  )
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

export function UserTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {['Name', 'Email', 'Role', 'Created', ''].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} cols={5} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
