"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const items = [
  {
    title: "Efisiensi",
    desc: "Mempercepat siklus kontrak dari draft hingga tanda tangan.",
    img: "/assets/gudang-logistik.png",
    alt: "Rak gudang logistik",
  },
  {
    title: "Transparansi",
    desc: "Setiap proses tercatat dan dapat ditelusuri.",
    img: "/assets/kontainer-pelabuhan.png",
    alt: "Kontainer di pelabuhan",
  },
  {
    title: "Keamanan",
    desc: "Dokumen terlindungi dengan enkripsi & teknologi blockchain.",
    img: "/assets/aerial.png",
    alt: "Lautan biru aerial",
  },
];

export function ValuesSection() {
  return (
    <section
      aria-labelledby="values-title"
      className="bg-background px-8 py-16 md:py-20"
    >
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((it) => (
              <div className="h-max" key={it.title}>
                <Image
                  alt={it.alt}
                  className="aspect-square h-40 w-full rounded-xl object-cover"
                  height={640}
                  src={it.img}
                  width={640}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-base">{it.title}</h3>
                  <p className="mt-1 text-foreground/70 text-sm">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2
              className="text-pretty font-semibold text-3xl text-primary md:text-4xl"
              id="values-title"
            >
              Nilai kita
            </h2>
            <div
              aria-hidden
              className="mt-3 h-1 w-24 rounded-full bg-primary"
            />
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Nilai ILCS sebagai bagian dari ekosistem Pelindo mendorong
              peningkatan konektivitas, integrasi layanan, serta pertumbuhan
              ekonomi. ClausIA hadir memenuhi kebutuhan nyata mengelola ribuan
              kontrak secara cepat, akurat, dan dapat dipertanggungjawabkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
