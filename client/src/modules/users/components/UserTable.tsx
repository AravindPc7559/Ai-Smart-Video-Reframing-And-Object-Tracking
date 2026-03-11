import { useState } from 'react'
import { Button } from '@/shared/components/Button'
import { Modal } from '@/shared/components/Modal'
import { UserTableSkeleton } from '@/shared/components/Skeleton'
import { formatDate } from '@/shared/utils/helpers'
import type { User, CreateUserPayload, UpdateUserPayload } from '../types'

type UserTableProps = {
  users: User[]
  isLoading: boolean
  onUpdate: (id: string, payload: UpdateUserPayload) => void | Promise<unknown>
  onDelete: (id: string) => void | Promise<unknown>
  onCreate: (payload: CreateUserPayload) => void | Promise<unknown>
  isUpdating: boolean
  isDeleting: boolean
  isCreating: boolean
}

export function UserTable({
  users,
  isLoading,
  onUpdate,
  onDelete,
  onCreate,
  isUpdating,
  isDeleting,
  isCreating,
}: UserTableProps) {
  const [editing, setEditing] = useState<User | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formRole, setFormRole] = useState('')

  const openEdit = (user: User) => {
    setEditing(user)
    setFormName(user.name)
    setFormEmail(user.email)
    setFormRole(user.role)
  }

  const openCreate = () => {
    setCreating(true)
    setFormName('')
    setFormEmail('')
    setFormRole('user')
  }

  const handleSaveEdit = async () => {
    if (!editing) return
    await onUpdate(editing.id, { name: formName, email: formEmail, role: formRole })
    setEditing(null)
  }

  const handleCreate = async () => {
    await onCreate({ name: formName, email: formEmail, role: formRole })
    setCreating(false)
  }

  const handleConfirmDelete = async (id: string) => {
    await onDelete(id)
    setDeleteId(null)
  }

  if (isLoading) return <UserTableSkeleton />

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={openCreate} isLoading={isCreating}>
          Add user
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Created
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-900">{user.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{user.role}</td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(user)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setDeleteId(user.id)}
                    isLoading={isDeleting && deleteId === user.id}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title="Edit user"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
            <input
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} isLoading={isUpdating}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={creating}
        onClose={() => setCreating(false)}
        title="New user"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
            <input
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} isLoading={isCreating}>
              Create
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete user"
      >
        <p className="mb-4 text-slate-600">
          Are you sure you want to delete this user? This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          {deleteId && (
            <Button
              variant="danger"
              onClick={() => handleConfirmDelete(deleteId)}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          )}
        </div>
      </Modal>
    </>
  )
}
