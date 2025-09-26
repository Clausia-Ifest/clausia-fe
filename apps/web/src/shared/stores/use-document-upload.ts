/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UploadDocumentResponse } from "@/shared/repository/document/action";

type DocumentStore = {
  uploadedDocuments: UploadDocumentResponse[];
  isUploading: boolean;
  uploadError: string | null;

  // Extracted document metadata
  extractedData: {
    external_company_name?: string;
    contract_title?: string;
    contract_start_date?: string;
    contract_end_date?: string;
  } | null;

  // Actions
  addUploadedDocument: (document: UploadDocumentResponse) => void;
  removeUploadedDocument: (documentId: string) => void;
  setIsUploading: (isUploading: boolean) => void;
  setUploadError: (error: string | null) => void;
  setExtractedData: (data: any) => void;
  resetStore: () => void;
};

export const useDocumentStore = create<DocumentStore>()(
  devtools(
    (set) => ({
      uploadedDocuments: [],
      isUploading: false,
      uploadError: null,
      extractedData: null,

      addUploadedDocument: (document) =>
        set((state) => ({
          uploadedDocuments: [...state.uploadedDocuments, document],
        })),

      removeUploadedDocument: (documentId) =>
        set((state) => ({
          uploadedDocuments: state.uploadedDocuments.filter(
            (doc) => doc.id !== documentId
          ),
        })),

      setIsUploading: (isUploading) => set({ isUploading }),

      setUploadError: (error) => set({ uploadError: error }),

      setExtractedData: (data) => set({ extractedData: data }),

      resetStore: () =>
        set({
          uploadedDocuments: [],
          isUploading: false,
          uploadError: null,
          extractedData: null,
        }),
    }),
    {
      name: "document-store",
    }
  )
);
