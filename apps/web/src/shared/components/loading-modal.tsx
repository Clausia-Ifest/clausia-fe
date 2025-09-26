"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useLoadingModal } from "@/shared/stores/modal-state";
import { useFileUploadStore } from "../stores/file-upload-store";

export function ModalLoading() {
  const { isLoadingModalOpen } = useFileUploadStore();

  const { hide } = useLoadingModal();

  return (
    <Dialog open={isLoadingModalOpen}>
      <DialogContent className="w-80 rounded-xl">
        <DialogHeader className="items-center space-y-2 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <DialogTitle className="mt-4">Mohon Tunggu Sebentar</DialogTitle>
          <DialogDescription className="text-center">
            AI akan menganalisis sesuai dengan resume yang anda berikan
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-center">
          <Button className="w-full" onClick={hide} variant="destructive">
            Keluar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
