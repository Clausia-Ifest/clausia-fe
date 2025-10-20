/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFileUploadStore } from "@/shared/stores/file-upload-store";
import { useSuccessModal } from "@/shared/stores/use-success-modal";
import { useSubmitContractsMutation } from "../repository/contract/query";

export const contractSchema = z.object({
  type: z.string(),
  contractName: z.string(),
  email: z.string().email(),
  company: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  docAdministrasi: z.string().optional(),
  docLegal: z.string().optional(),
  docTeknis: z.string().optional(),
  docKeuangan: z.string().optional(),
});

export type ContractFormValues = z.infer<typeof contractSchema>;

export function useContractModal() {
  const {
    isContractModalOpen,
    setContractModal,
    uploadedFile,
    reset,
    contractData,
  } = useFileUploadStore();
  const { setOpen: setSuccessOpen } = useSuccessModal();
  const { mutate } = useSubmitContractsMutation();

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      type: "",
      contractName: "",
      email: "",
      company: "",
      startDate: "",
      endDate: "",
      docAdministrasi: uploadedFile?.name ?? "",
      docLegal: "",
      docTeknis: "",
      docKeuangan: "",
    },
  });

  // Update form values when contractData changes (from extracted document)
  useEffect(() => {
    if (contractData) {
      const updates: Partial<ContractFormValues> = {};

      if (contractData.contractName) {
        updates.contractName = contractData.contractName;
      }
      if (contractData.company) {
        updates.company = contractData.company;
      }
      if (contractData.startDate) {
        updates.startDate = contractData.startDate;
      }
      if (contractData.endDate) {
        updates.endDate = contractData.endDate;
      }

      // Only update if there are actual changes
      if (Object.keys(updates).length > 0) {
        form.reset({
          ...form.getValues(),
          ...updates,
        });
      }
    }
  }, [contractData, form]);

  // Update docAdministrasi when uploadedFile changes
  useEffect(() => {
    if (uploadedFile) {
      form.setValue("docAdministrasi", uploadedFile.name);
    }
  }, [uploadedFile, form]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("start_date", data.startDate);
    formData.append("end_date", data.endDate);
    formData.append("title", data.contractName);
    formData.append("email", data.email);
    formData.append("company", data.company);
    formData.append("category", data.type);
    formData.append("administration_document", data.docAdministrasi ?? "");
    formData.append("legal_document", data.docLegal ?? "");
    formData.append("technical_document", data.docTeknis ?? "");
    formData.append("financial_document", data.docKeuangan ?? "");

    mutate(formData);
    setContractModal(false);
    reset();
    setSuccessOpen(true);
  };

  const resetForm = () => {
    form.reset({
      type: "",
      contractName: "",
      email: "",
      company: "",
      startDate: "",
      endDate: "",
      docAdministrasi: "",
      docLegal: "",
      docTeknis: "",
      docKeuangan: "",
    });
  };

  return {
    form,
    onSubmit,
    isContractModalOpen,
    setContractModal,
    uploadedFile,
    reset,
    resetForm,
    contractData,
  };
}
