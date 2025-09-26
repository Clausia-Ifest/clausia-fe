"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <Image
      alt="Clausia Logo"
      height={300}
      src={"/clausia/icon-title.svg"}
      width={300}
    />
  );
}
