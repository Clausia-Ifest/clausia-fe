"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSlides } from "../hooks/use-slide";

const slides = [
  {
    description:
      "AI-Powered & Blockchain-Enabled End-to-End Contract Management Web Application untuk Transformasi Digital Terintegrasi di PT Integrasi Logistik Cipta Solusi",
  },
  {
    description:
      "Kelola kontrak lebih cepat, lebih aman, dan lebih transparan bersama Clausia. Smart Contract, Secure Future.",
  },
  {
    description:
      "Transformasikan cara perusahaan Anda mengelola kontrak. Rasakan keamanan blockchain dan kecerdasan AI hari ini.",
  },
];

export default function Slides() {
  const { index, prev, next, offset } = useSlides(slides);

  return (
    <div className="grid max-w-96 gap-6 text-white">
      <h2 className="text-center font-bold text-4xl md:text-left">
        Smart Contract, Secure Future
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="h-max text-center md:h-20 md:text-left"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          exit={{ x: -50, opacity: 0 }}
          initial={{ x: 50, opacity: 0 }}
          key={index}
          onDragEnd={(_e, info) => {
            if (info.offset.x < -offset) {
              next();
            } else if (info.offset.x > offset) {
              prev();
            }
          }}
          transition={{ duration: 0.5 }}
        >
          <p>{slides[index].description}</p>
        </motion.div>
      </AnimatePresence>
      <div className="mx-auto mt-6 flex gap-2 md:mx-0">
        {slides.map((_, i) => (
          <div
            className={`h-1 rounded transition-all duration-300 ${
              i === index ? "w-10 bg-white" : "w-6 bg-white/40"
            }`}
            key={i.toString()}
          />
        ))}
      </div>
    </div>
  );
}
