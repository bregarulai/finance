import { create } from "zustand";

export const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
