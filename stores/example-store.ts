import { create } from 'zustand';

interface ExampleState {
  count: number;
  increment: () => void;
  reset: () => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));


// interface ExampleState {
//   value: string;
//   isLoading: boolean;   // ne doit jamais persister
//   setValue: (v: string) => void;
// }

// export const useExamplePersistedStore = create<ExampleState>()(
//   persist(
//     (set) => ({
//       value: '',
//       isLoading: false,
//       setValue: (v) => set({ value: v }),
//     }),
//     {
//       name: 'example-persisted-store',
//       storage: createJSONStorage(() => AsyncStorage),
//       partialize: (state) => ({ value: state.value }),  // ne persiste QUE `value`
//     }
//   )
// );