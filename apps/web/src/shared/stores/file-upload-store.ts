import { create } from "zustand";

type UploadedFile = {
  name: string;
  size: number;
};

type FileUploadState = {
  uploadedFile: UploadedFile | null;
  setUploadedFile: (file: File) => void;
  reset: () => void;
  isLoadingModalOpen: boolean;
  setLoadingModal: (open: boolean) => void;
  isContractModalOpen: boolean;
  setContractModal: (open: boolean) => void;

  // New: Contract data from extracted document
  contractData: {
    contractName: string;
    company: string;
    startDate: string;
    endDate: string;
  };
  setContractData: (data: {
    contractName?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
};

export const useFileUploadStore = create<FileUploadState>((set) => ({
  uploadedFile: null,
  setUploadedFile: (file) =>
    set({
      uploadedFile: {
        name: file.name,
        size: file.size,
      },
    }),
  reset: () =>
    set({
      uploadedFile: null,
      contractData: {
        contractName: "",
        company: "",
        startDate: "",
        endDate: "",
      },
    }),
  isLoadingModalOpen: false,
  setLoadingModal: (open) => set({ isLoadingModalOpen: open }),
  isContractModalOpen: false,
  setContractModal: (open) => set({ isContractModalOpen: open }),

  // Contract data initialization
  contractData: {
    contractName: "",
    company: "",
    startDate: "",
    endDate: "",
  },
  setContractData: (data) =>
    set((state) => ({
      contractData: {
        ...state.contractData,
        ...data,
      },
    })),
}));
