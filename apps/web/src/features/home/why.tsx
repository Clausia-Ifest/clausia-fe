import Image from "next/image";
import fg from "@/public/fragments/elemet-hero.svg";
import { Button } from "@/shared/components/ui/button";

export function WhySection() {
  return (
    <section
      aria-labelledby="why-title"
      className="relative bg-primary-50 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2
              className="text-pretty font-semibold text-3xl text-primary md:text-4xl"
              id="why-title"
            >
              Kenapa ClasusIA dibuat?
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              ILCS mengelola ribuan kontrak dengan mitra dan vendor. Proses
              manual membuat dokumen tercecer, review memakan waktu, dan risiko
              kedaluwarsa meningkat. ClasusIA menghadirkan otomasi dokumen,
              review berbasis AI, pengingat cerdas, serta jejak audit transparan
              untuk tata kelola kontrak yang lebih baik.
            </p>
            <Button aria-label="Mulai Sekarang" className="mt-6">
              Mulai Sekarang
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-5">
              <Image alt="a" className="mb-4 size-10" src={fg} />

              <h3 className="font-semibold">VISI</h3>
              <p className="mt-2 text-foreground/70 text-sm">
                Menjadi pemimpin ekosistem maritim terintegrasi dan berkelas
                dunia.
              </p>
            </div>
            <div className="p-5">
              <Image alt="a" className="mb-4 size-10" src={fg} />
              <h3 className="font-semibold">MISI</h3>
              <p className="mt-2 text-foreground/70 text-sm">
                Mewujudkan jaringan ekosistem maritim nasional yang efisien,
                transparan, dan aman.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
