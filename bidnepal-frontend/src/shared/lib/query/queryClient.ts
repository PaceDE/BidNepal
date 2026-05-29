import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { handleApiError } from '../errors/globalError'
import { store } from '@/redux/store'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retryOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => handleApiError(error, store.dispatch),
  }),
  mutationCache: new MutationCache({
    onError: (error) => handleApiError(error, store.dispatch),
  })
})