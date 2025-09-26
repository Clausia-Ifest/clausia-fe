"use client";

import {
  CheckCircle,
  Download,
  FileSpreadsheet,
  Pen,
  TrendingUp,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContractsTable from "@/features/dashboard/components/contracts-table";
import TaskCard from "@/features/dashboard/components/task-card";
import batikBot from "@/public/fragments/batik-dashboard-bot.svg";
import batikTop from "@/public/fragments/batik-dashboard-top.svg";
import { GradientAreaChart } from "@/shared/components/gradient-chart";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <main className="grid h-max w-full gap-8">
      <div className="flex w-full gap-8">
        <section className="w-3/4 space-y-4">
          <div>
            <h1 className="font-heading-2-medium">
              Dashboard Staff Operasional
            </h1>
            <p className="font-body-semibold text-muted-foreground">
              Dashboard Staff Operasional
            </p>
          </div>
          {/* upload */}
          <div className="relative flex h-36 w-full items-center overflow-clip rounded-2xl bg-gradient-to-l from-[#0275BC] to-[#7DCEFC] px-8">
            <Image
              alt="Batik Top"
              className="absolute top-0 right-0"
              src={batikTop}
            />
            <Image
              alt="Batik Bot"
              className="absolute bottom-0 left-0"
              src={batikBot}
            />
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                  <FileSpreadsheet
                    className="h-5 w-5 text-white"
                    fill="#3285b3"
                  />
                </span>
                <span className="font-semibold text-lg text-white">
                  Claudraft - Upload dokumen Administrasi disini
                </span>
              </div>
              <span className="font-medium text-sm text-white">
                Ubah kontrak scan/PDF jadi teks rapi &amp; metadata otomatis
                dengan OCR + NLP.
              </span>
              <div className="mt-2 flex gap-3">
                <button
                  className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 font-semibold text-primary-700 shadow hover:bg-blue-50"
                  type="button"
                >
                  <Download className="h-5 w-5" />
                  Upload disini
                </button>
                <button
                  className="flex items-center gap-2 rounded-lg border border-white/60 bg-white/30 px-6 py-2 font-semibold text-white hover:bg-white/40"
                  type="button"
                >
                  <Pen className="h-5 w-5" />
                  Isi Manual
                </button>
              </div>
            </div>
          </div>
          {/* statistik */}
          <div className="flex gap-4">
            {/* Total Kontrak */}
            <Card className="w-2/5">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="font-body-1-medium">
                  Total Kontrak
                </CardTitle>
                <Link
                  className="font-medium text-primary text-sm hover:underline"
                  href="#"
                >
                  Selengkapnya
                </Link>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8">
                  <h2 className="font-heading-1-semibold">150,000</h2>
                  <div className="mt-2 flex flex-col gap-2">
                    <span className="flex w-max items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      12.1%
                    </span>
                    <p className="text-muted-foreground text-sm">
                      Total Kerja sama naik sekitar 12,1% dari bulan sebelumnya
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 text-center">
                  <div>
                    <CheckCircle className="mx-auto mb-1 h-6 w-6 text-green-500" />
                    <p className="font-semibold">10,000</p>
                    <p className="text-muted-foreground text-sm">Aktif</p>
                  </div>
                  <div>
                    <XCircle className="mx-auto mb-1 h-6 w-6 text-red-500" />
                    <p className="font-semibold">10,000</p>
                    <p className="text-muted-foreground text-sm">Ditolak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Kontrak */}
            <Card className="w-3/5">
              <CardContent className="grid grid-cols-3 gap-2">
                {[
                  {
                    title: "Menunggu Review",
                    value: "150,000",
                    desc: "Kontrak direview",
                  },
                  {
                    title: "Menunggu Approval",
                    value: "150,000",
                    desc: "Kontrak disetujui",
                  },
                  {
                    title: "Expired Soon",
                    value: "150,000",
                    desc: "Kontrak disetujui",
                  },
                ].map((item) => (
                  <div className="space-y-2" key={item.title}>
                    <p className="font-body-2-medium">{item.title}</p>
                    <p className="font-heading-2-medium">{item.value}</p>
                    <span className="flex items-center gap-2">
                      <div className="flex items-center justify-center gap-1 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">6%</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {item.desc}
                      </p>
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="px-3">
                <footer className="flex flex-col items-start gap-1 border-l-3 border-l-primary pl-3">
                  <p className="font-body-1-semibold">Insight</p>
                  <ul className="list-disc pl-5 font-body-4-medium text-muted-foreground">
                    <li>
                      Buat reminder untuk legal bahwa beberapa kontrak segera
                      jatuh tempo
                    </li>
                  </ul>
                  <Link
                    className="mt-1 font-medium text-primary text-sm hover:underline"
                    href="#"
                  >
                    Selengkapnya →
                  </Link>
                </footer>
              </CardFooter>
            </Card>
          </div>
          {/* chart */}
          <GradientAreaChart />
        </section>
        <aside className="w-1/4 space-y-4">
          <Calendar
            captionLayout="dropdown"
            className="w-full rounded-md border shadow-sm"
            mode="single"
            onSelect={setDate}
            selected={date}
          />
          <TaskCard />
        </aside>
      </div>
      <ContractsTable />
    </main>
  );
}
