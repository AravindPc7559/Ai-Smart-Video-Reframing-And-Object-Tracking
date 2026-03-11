import { useAuth } from '@/modules/auth/hooks/useAuth'
import { useUsers } from '../hooks/useUsers'
import { UserTable } from '../components/UserTable'
import { Button } from '@/shared/components/Button'

export function UsersPage() {
  const { logout } = useAuth()
  const {
    users,
    isLoading,
    isError,
    error,
    createUser,
    updateUser,
    deleteUser,
    isCreating,
    isUpdating,
    isDeleting,
  } = useUsers()

  if (isError) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8">
        <p className="text-red-600">{error?.message ?? 'Failed to load users'}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold text-slate-900">Users</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              Log out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <UserTable
          users={users}
          isLoading={isLoading}
          onUpdate={async (id, payload) => {
            await updateUser(id, payload)
          }}
          onDelete={deleteUser}
          onCreate={async (payload) => {
            await createUser(payload)
          }}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          isCreating={isCreating}
        />
      </main>
    </div>
  )
}
