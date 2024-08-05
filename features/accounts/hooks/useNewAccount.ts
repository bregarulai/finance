import { create } from "zustand";

import { NewAccountState } from "@/types";

export const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
