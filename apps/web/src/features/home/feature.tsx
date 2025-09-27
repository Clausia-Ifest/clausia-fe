import Image from "next/image";
import Link from "next/link";
import fg from "@/public/fragments/elemet-hero.svg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const features = [
  {
    title: "ClauDraft",
    desc: "Ubah kontrak scan/PDF jadi teks rapi & metadata otomatis dengan OCR + NLP.",
  },
  {
    title: "ClauGuide",
    desc: "Checklist kepatuhan & rekomendasi klausul sesuai regulasi & kebijakan.",
  },
  {
    title: "ClauRisk",
    desc: "Deteksi klausul bermasalah & tandai potensi risiko hukum sejak awal.",
  },
  {
    title: "ClauCollect",
    desc: "Repository pintar untuk menyimpan, mencari, & mengelola kontrak.",
  },
  {
    title: "ClauStore",
    desc: "Simpan kontrak aman dengan blockchain & enkripsi, jaga integritas dokumen.",
  },
  {
    title: "ClauTrack",
    desc: "Pantau status kontrak end-to-end dengan notifikasi & reminder otomatis.",
  },
  {
    title: "ClauBot",
    desc: "Tanya AI seputar kontrak & hukum untuk jawaban instan & kontekstual.",
  },
  {
    title: "Integrations",
    desc: "Hubungkan dengan sistem bisnis Anda untuk alur kerja menyeluruh.",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-6 py-12 md:py-16" id="features">
      <div className="container mx-auto">
        <header className="mb-8 flex items-center">
          <div className="border-primary border-l-4 pl-4 md:border-l-0 md:border-none md:pl-0">
            <h2 className="font-semibold text-2xl text-primary md:text-3xl">
              Overview Fitur
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Deteksi klausul bermasalah & tandai potensi risiko hukum sejak
              awal.
            </p>
          </div>
          <div className="hidden h-1 w-full rounded bg-primary md:block" />
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card className="h-full border-none shadow-none" key={f.title}>
              <CardHeader className="flex flex-row items-center gap-3">
                <Image alt="a" className="h-7 w-7" src={fg} />
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-muted-foreground text-sm">{f.desc}</p>
                <Link
                  className="mt-3 font-medium text-primary text-sm hover:underline"
                  href="#"
                >
                  Lihat Selengkapnya →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
