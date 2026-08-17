import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}


// // lecture — useQuery
// const { data, isLoading, error } = useQuery({
//   queryKey: ['user', userId],       // clé unique = identité du cache
//   queryFn: () => api.getUser(userId),
//   staleTime: 5 * 60 * 1000,         // durée avant que la donnée soit "périmée"
// });

// // écriture — useMutation
// const mutation = useMutation({
//   mutationFn: (data) => api.updateUser(userId, data),
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['user', userId] }); // force un refetch
//   },
// });