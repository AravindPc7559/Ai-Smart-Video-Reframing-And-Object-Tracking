import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/helpers'

export type Column<T> = {
  key: string
  header: ReactNode
  render?: (item: T) => ReactNode
  accessor?: keyof T | ((item: T) => ReactNode)
}

export type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string
  className?: string
  emptyMessage?: ReactNode
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  className,
  emptyMessage = 'No data',
}: TableProps<T>) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-slate-200', className)}>
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-slate-50">
                {columns.map((col) => {
                  const value =
                    col.render !== undefined
                      ? col.render(item)
                      : typeof col.accessor === 'function'
                        ? col.accessor(item)
                        : col.accessor
                        ? (item[col.accessor] as ReactNode)
                        : null
                  return (
                    <td key={col.key} className="px-4 py-3 text-sm text-slate-900">
                      {value}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
