import { create } from "zustand";

import { OpenCategoryState } from "@/types";

export const useOpenCategory = create<OpenCategoryState>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined }),
  onOpen: (id: string) => set({ isOpen: true, id }),
}));
