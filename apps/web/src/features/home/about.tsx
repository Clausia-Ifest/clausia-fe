"use client";

import Image from "next/image";
import foto from "@/public/fragments/about-image.svg";
import bungaAtas from "@/public/fragments/bunga-landing.svg";

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative bg-background py-16 md:py-48"
      id="about"
    >
      <Image alt="a" className="absolute right-0 bottom-16" src={bungaAtas} />
      <Image alt="a" className="absolute top-0 left-0" src={bungaAtas} />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <Image
              alt="Aktivitas pelabuhan: kontainer dan crane"
              className="z-10 scale-90 object-cover md:scale-150"
              priority
              src={foto}
            />
          </div>
          <div>
            <h2
              className="text-pretty font-semibold text-3xl text-primary md:text-4xl"
              id="about-title"
            >
              About Us
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              PT Integrasi Logistik Cipta Solusi (ILCS) merupakan bagian dari
              ekosistem Pelindo yang bergerak di bidang teknologi informasi
              untuk logistik dan kepelabuhan. ClausIA hadir sebagai solusi
              digital terintegrasi yang meningkatkan efisiensi, transparansi,
              dan integrasi rantai pasok nasional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
