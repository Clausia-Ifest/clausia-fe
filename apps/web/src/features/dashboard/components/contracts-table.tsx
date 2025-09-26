"use client";

import Link from "next/link";
import { DataTable } from "@/shared/components/data-table";
import { type Contract, columns } from "./columns";

const data: Contract[] = [
  {
    id: "I293D5A39",
    title: "Ekspor Minyak Kelapa",
    vendor: "PT. Kalpataru",
    risk: "High",
    status: "Menunggu",
    endDate: "Jan 20, 2025",
    user: "Manager",
    userRole: "Manager",
  },
  {
    id: "I293D5A39",
    title: "Ekspor Minyak Kelapa",
    vendor: "PT. Kalpataru",
    risk: "High",
    status: "Menunggu",
    endDate: "Jan 20, 2022",
    user: "Manager",
    userRole: "Manager",
  },
  {
    id: "I293D5A39",
    title: "Ekspor Minyak Kelapa",
    vendor: "PT. Kalpataru",
    risk: "Medium",
    status: "disetujui",
    endDate: "Jan 20, 2022",
    user: "Legal Consil",
    userRole: "Legal Consil",
  },
  {
    id: "I293D5A39",
    title: "Ekspor Minyak Kelapa",
    vendor: "PT. Kalpataru",
    risk: "Low",
    status: "Menunggu",
    endDate: "Jan 20, 2022",
    user: "Manager",
    userRole: "Manager",
  },
  {
    id: "I293D5A39",
    title: "Ekspor Minyak Kelapa",
    vendor: "PT. Kalpataru",
    risk: "High",
    status: "ditolak",
    endDate: "Jan 20, 2022",
    user: "Legal Consil",
    userRole: "Legal Consil",
  },
];

export default function ContractsTable() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Kontrak Sekarang</h2>
        <Link className="font-medium text-primary text-sm" href="#">
          Lihat Selengkapnya →
        </Link>
      </div>
      <p className="text-green-600 text-sm">+80 Kontrak baru</p>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
