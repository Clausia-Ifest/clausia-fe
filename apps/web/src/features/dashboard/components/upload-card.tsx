import { Download, FileSpreadsheet, Pen } from "lucide-react";
import Image from "next/image";
import batikBot from "@/public/fragments/batik-dashboard-bot.svg";
import batikTop from "@/public/fragments/batik-dashboard-top.svg";

export default function UploadCard() {
  return (
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
            <FileSpreadsheet className="h-5 w-5 text-white" fill="#3285b3" />
          </span>
          <span className="font-semibold text-lg text-white">
            Claudraft - Upload dokumen Administrasi disini
          </span>
        </div>
        <span className="font-medium text-sm text-white">
          Ubah kontrak scan/PDF jadi teks rapi &amp; metadata otomatis dengan
          OCR + NLP.
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
  );
}
