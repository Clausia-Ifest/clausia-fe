import { create } from "zustand";

type SuccessModalState = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const useSuccessModal = create<SuccessModalState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));
