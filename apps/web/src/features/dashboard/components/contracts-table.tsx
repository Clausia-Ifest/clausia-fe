"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Circle } from "lucide-react";
import * as React from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { type Contract, columns } from "./columns-legal";

type Props = {
  data: Contract[];
};

export default function ContractTable({ data }: Props) {
  const [selectedContract, setSelectedContract] =
    React.useState<Contract | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="min-w-full border">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th className="border-b p-2 text-left" key={h.id}>
                  {h.isPlaceholder
                    ? null
                    : (h.column.columnDef.header as string)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="cursor-pointer hover:bg-muted"
              key={row.id}
              onClick={
                () => setSelectedContract(row.original) // row.original = data contract
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td className="border-b p-2" key={cell.id}>
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Dialog
        onOpenChange={(open) => {
          if (!open) setSelectedContract(null);
        }}
        open={!!selectedContract}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ringkasan Kontrak</DialogTitle>
          </DialogHeader>

          {selectedContract && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {/* contoh dummy desc */}
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              </p>

              {/* Highlight Risiko */}
              <div>
                <h4 className="font-semibold">Highligh Risiko</h4>
                <div className="mt-1 flex items-center gap-2">
                  <Circle
                    className={cn(
                      "h-3 w-3",
                      selectedContract.risk === "High Risk"
                        ? "text-red-500"
                        : selectedContract.risk === "Medium Risk"
                          ? "text-yellow-500"
                          : "text-green-500"
                    )}
                    fill="currentColor"
                  />
                  <span>{selectedContract.risk}</span>
                </div>
              </div>

              {/* Lampiran */}
              <div>
                <h4 className="mb-2 font-semibold">Lampiran</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      className="flex items-center gap-2 rounded-md border p-2"
                      key={i}
                    >
                      <span className="text-red-500">📄</span>
                      <span className="truncate text-sm">
                        Dokumen Administrasi.pdf
                      </span>
                      <span className="ml-auto text-muted-foreground text-xs">
                        94 KB
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  onClick={() => setSelectedContract(null)}
                  variant="outline"
                >
                  Tolak
                </Button>
                <Button>Setuju</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
