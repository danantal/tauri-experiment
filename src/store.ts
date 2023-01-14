import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StoreState {
  files: string[];
  addFiles: (files: string[]) => void;
  clear: () => void;
}

export const useStore = create<StoreState>()(
  devtools((set) => ({
    files: [],
    addFiles: (files) =>
      set((state) => ({ files: [...state.files, ...files] })),
    clear: () =>
      set(() => ({
        files: [],
      })),
  }))
);
