"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import successBadge from "@/public/fragments/success-badge.svg";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { useSuccessModal } from "@/shared/stores/use-success-modal";

export function SuccessModal() {
  const { isOpen, setOpen } = useSuccessModal();

  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTitle />
      <DialogContent className="max-w-sm text-center">
        <div className="flex flex-col items-center justify-center gap-8 p-4">
          <Image alt="Success" src={successBadge} />
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">Data Berhasil disimpan</h2>
            <p className="text-muted-foreground text-sm">
              Thank you for your valuable feedback and tip
            </p>
          </div>
          <Button
            className="h-12 w-full"
            onClick={() => setOpen(false)}
            variant="default"
          >
            Lanjutkan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
