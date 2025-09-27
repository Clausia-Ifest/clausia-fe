/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/shared/components/data-table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useContractsQuery } from "@/shared/repository/contract/query";
import { type Contract, columns } from "./columns-legal";

export default function ContractsTable() {
  const { data, isLoading, isError } = useContractsQuery();

  if (isLoading) {
    return (
      <Card className="p-4">
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="font-medium text-sm">Memuat kontrak...</span>
          </div>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Terjadi Kesalahan</AlertTitle>
        <AlertDescription>
          Tidak dapat memuat data kontrak. Silakan coba lagi nanti.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.success) {
    return null;
  }

  const contracts: Contract[] =
    data?.data.contracts.map((item) => ({
      id: item.id,
      title: item.title,
      vendor: item.company,
      risk: item.risk_level,
      status: item.status,
      endDate: item.end_date,
      user: item.human_id,
      application_status: item.application_status,
    })) ?? [];

  return (
    <section className="space-y-2">
      <h2 className="font-semibold text-lg">Kontrak Sekarang</h2>
      <div className="flex items-center justify-between">
        <p className="text-green-600 text-sm">
          +{data.data.contracts.length ?? 0} Kontrak baru
        </p>
        <Link className="mt-auto font-medium text-primary text-sm" href="#">
          Lihat Selengkapnya →
        </Link>
      </div>
      <DataTable columns={columns} data={contracts} />
    </section>
  );
}
