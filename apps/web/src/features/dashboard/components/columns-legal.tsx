/** biome-ignore-all lint/style/noNestedTernary: <explanation> */
/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Circle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { cn } from "@/shared/lib/utils";
import { useSendContractMutation } from "@/shared/repository/contract/query";

// type data contract
export type Contract = {
  id: string;
  title: string;
  vendor: string;
  risk: string;
  status: string;
  endDate: string;
  user: string;
  application_status: string;
  reviewed?: boolean;
};

export const columns: ColumnDef<Contract>[] = [
  {
    id: "select",
    cell: ({ row }) => {
      const { risk, application_status } = row.original;

      if (application_status === "Manager") {
        return (
          <Checkbox
            aria-label="Select row"
            checked
            className="size-6 border-2 border-primary"
            disabled
          />
        );
      }

      return (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          className="size-6 border-2 border-primary"
          disabled={risk === "-"}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <Link
        className="text-muted-foreground hover:underline"
        href={`/dashboard/review/${row.getValue("id")}`}
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "title",
    header: "Judul Kontrak",
  },
  {
    accessorKey: "vendor",
    header: "Pihak Vendor",
  },
  {
    accessorKey: "risk",
    header: "Highlight Resiko",
    cell: ({ row }) => {
      const risk = row.getValue("risk") as Contract["risk"];
      if (risk === "-") {
        return <span className="text-muted-foreground">-</span>;
      }
      const color =
        risk === "High Risk"
          ? "text-red-500"
          : risk === "Medium Risk"
            ? "text-yellow-500"
            : "text-green-500";

      return (
        <div className="flex items-center gap-2">
          <Circle className={cn("h-3 w-3", color)} fill="currentColor" />
          <span className={color}>{risk}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const risk = row.getValue("risk") as Contract["risk"];
      const status =
        risk === "-"
          ? "Waiting"
          : (row.getValue("status") as Contract["status"]);

      return (
        <Badge
          className={cn(
            "rounded-full px-3 py-1",
            status === "Waiting" && "bg-primary-100/50 text-primary-600",
            status === "Accepted" && "bg-green-100 text-green-600",
            status === "Rejected" && "bg-red-100 text-danger-600"
          )}
          variant="outline"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "Tanggal Berakhir",
    cell: ({ row }) => (
      <span className="font-medium text-muted-foreground">
        {new Date(row.getValue("endDate") as string).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )}
      </span>
    ),
  },

  {
    id: "review",
    header: "Review",
    cell: ({ row }) => {
      const reviewed = row.original.reviewed;
      const { application_status } = row.original;

      // panggil mutation
      const sendMutation = useSendContractMutation();

      if (application_status === "Legal Consil" && !reviewed) {
        return (
          <Button
            className="bg-primary-500 text-white hover:bg-primary-600"
            disabled={sendMutation.isPending}
            onClick={() => {
              sendMutation.mutate(row.original.id);
            }}
            size="sm"
          >
            {sendMutation.isPending ? "Mengirim..." : "Kirimkan"}
          </Button>
        );
      }

      return (
        <Button disabled size="sm" variant="outline">
          Terkirim
        </Button>
      );
    },
  },
];
