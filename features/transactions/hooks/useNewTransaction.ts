import { create } from "zustand";

import { NewTransactionState } from "@/types";

export const useNewTransaction = create<NewTransactionState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
