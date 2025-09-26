/** biome-ignore-all lint/style/noNestedTernary: <explanation> */
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Bell, Circle, MoreHorizontal, Pencil, Plus, User } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

// type data contract
export type Contract = {
  id: string;
  title: string;
  vendor: string;
  risk: "High" | "Medium" | "Low";
  status: "Menunggu" | "disetujui" | "ditolak";
  endDate: string;
  user: string;
  userRole: "Manager" | "Legal Consil";
};

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("id")}</span>
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
      const color =
        risk === "High"
          ? "text-red-500"
          : risk === "Medium"
            ? "text-yellow-500"
            : "text-green-500";

      return (
        <div className="flex items-center gap-2">
          <Circle className={cn("h-3 w-3", color)} fill="currentColor" />
          <span
            className={cn(
              risk === "High" && "text-red-500",
              risk === "Medium" && "text-yellow-500",
              risk === "Low" && "text-green-500"
            )}
          >
            {risk} Risk
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Contract["status"];
      return (
        <Badge
          className={cn(
            "rounded-full p-2",
            status === "Menunggu" && "bg-primary-100/50 text-primary-600",
            status === "disetujui" && "bg-green-100 text-green-600",
            status === "ditolak" && "bg-red-100 text-danger-600"
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
        {row.getValue("endDate")}
      </span>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const role = row.original.userRole;
      return (
        <span
          className={cn(
            role === "Manager" && "text-warning-500",
            role === "Legal Consil" && "text-primary-500"
          )}
        >
          <User className="mr-2 inline h-4 w-4" fill="currentColor" />
          {row.getValue("user")}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 p-0" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-max rounded-lg shadow-md">
          <DropdownMenuItem className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Keterangan
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Kirim notifikasi
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
