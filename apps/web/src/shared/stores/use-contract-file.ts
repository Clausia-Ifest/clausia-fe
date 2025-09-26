import { create } from "zustand";

export type ContractFileType = "administrasi" | "legal" | "teknis" | "keuangan";

type FileData = {
  name: string;
  size: number;
};

type ContractFilesState = {
  files: Partial<Record<ContractFileType, FileData>>;
  setFile: (type: ContractFileType, file: FileData) => void;
  removeFile: (type: ContractFileType) => void;
  reset: () => void;
};

export const useContractFiles = create<ContractFilesState>((set) => ({
  files: {},
  setFile: (type, file) =>
    set((state) => ({ files: { ...state.files, [type]: file } })),
  removeFile: (type) =>
    set((state) => {
      const updated = { ...state.files };
      delete updated[type];
      return { files: updated };
    }),
  reset: () => set({ files: {} }),
}));
