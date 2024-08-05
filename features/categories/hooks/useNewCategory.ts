import { create } from "zustand";

import { NewCategoryState } from "@/types";

export const useNewCategory = create<NewCategoryState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
