/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getContracts, sendContract, submitContracts } from "./action";

export const useContractsQuery = () =>
  useQuery({
    queryKey: ["contracts"],
    queryFn: () => getContracts(),
    staleTime: 1000 * 60 * 5,
  });

export const useSendContractMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contractId: string) => sendContract(contractId),
    onSuccess: (_, contractId) => {
      queryClient.setQueryData<any>(["contracts"], (old) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          data: old.data.map((c: any) =>
            c.id === contractId
              ? { ...c, reviewed: true, status: "Approved" }
              : c
          ),
        };
      });
      toast.success("Kontrak berhasil dikirim ke Manager");
      queryClient.invalidateQueries({ queryKey: ["contract", contractId] });
    },
  });
};

export const useSubmitContractsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => submitContracts(data),
    onSuccess: () => {
      toast.success("Kontrak berhasil disubmit");
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
    onError: (error: Error) => {
      toast.error(`Gagal submit kontrak: ${error.message}`);
    },
  });
};
