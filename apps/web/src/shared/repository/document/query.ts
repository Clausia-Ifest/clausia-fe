import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type DocumentActionResult, uploadDocumentAction } from "./action";

export const useDocumentUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File): Promise<DocumentActionResult> =>
      await uploadDocumentAction(file),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ["documents"],
        });
        console.log("Document uploaded successfully:", result.data);
      } else {
        console.error("Upload failed:", result.error);
      }
    },
    onError: (error: any) => {
      console.error("Upload mutation failed:", error);
    },
  });
};
