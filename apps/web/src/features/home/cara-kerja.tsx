import Image from "next/image";
import bungaBawah from "@/public/fragments/batik-dashboard-bot.svg";
import bungaAtas from "@/public/fragments/batik-dashboard-top.svg";
import { Button } from "@/shared/components/ui/button";

type Step = {
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    title: "Step 1 - Legal Review dengan AI",
    desc: "Legal meninjau dan memverifikasi isi kontrak dengan bantuan AI yang mendeteksi klausul bermasalah.",
  },
  {
    title: "Step 2 - Manajemen Approval",
    desc: "Approval kontrak dilakukan lintas tim dengan jejak audit yang transparan dan terpusat.",
  },
  {
    title: "Step 3 - Admin Archiving",
    desc: "Admin mengunggah kontrak final dan menyimpannya secara aman di blockchain untuk monitoring.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-title"
      className="relative w-full border-y bg-primary-50"
      id="how"
    >
      <Image alt="a" className="absolute top-0 right-0" src={bungaAtas} />
      <Image alt="a" className="absolute bottom-0 left-0" src={bungaBawah} />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid items-start gap-8 md:grid-cols-[1fr_2fr]">
          <div className="space-y-4">
            <h2
              className="text-pretty font-semibold text-2xl text-primary md:text-3xl"
              id="how-title"
            >
              Bagaimana cara ClausIA bekerja?
            </h2>
            <p className="text-balance text-muted-foreground">
              ILCS setiap hari mengelola ribuan kontrak dengan mitra, vendor,
              dan stakeholder. ClausIA hadir sebagai solusi manajemen kontrak
              terintegrasi: otomatisasi dokumen, review berbasis AI, reminder
              cerdas, serta jejak audit transparan untuk GCG yang baik.
            </p>
            <Button className="mt-2" size="lg">
              Mulai Sekarang
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div
                className="rounded-xl border bg-background p-5 shadow-sm"
                key={s.title}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="font-semibold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-sm">{s.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
