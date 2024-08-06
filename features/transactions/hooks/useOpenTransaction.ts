import { create } from "zustand";

import { OpenTransactionState } from "@/types";

export const useOpenTransaction = create<OpenTransactionState>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined }),
  onOpen: (id: string) => set({ isOpen: true, id }),
}));
