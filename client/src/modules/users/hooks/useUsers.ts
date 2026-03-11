import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useToastStore } from '@/app/stores/toastStore'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../api/users.api'
import type { UpdateUserPayload } from '../types'

const USERS_QUERY_KEY = ['users']

export function useUsers() {
  const queryClient = useQueryClient()
  const addToast = useToastStore((s) => s.addToast)

  const query = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: getUsers,
  })

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
      addToast('User created', 'success')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
      addToast('User updated', 'success')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
      addToast('User deleted', 'success')
    },
  })

  return {
    users: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    createUser: createMutation.mutateAsync,
    updateUser: (id: string, payload: UpdateUserPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    deleteUser: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
