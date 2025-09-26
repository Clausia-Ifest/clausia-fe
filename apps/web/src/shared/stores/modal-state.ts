import { create } from "zustand";

type LoadingModalState = {
  open: boolean;
  show: () => void;
  hide: () => void;
};

export const useLoadingModal = create<LoadingModalState>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
