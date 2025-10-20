import Image from "next/image";
import partner from "@/public/logo/sponsorship.png";

export function PartnersSection() {
  return (
    <section aria-labelledby="partner-title" className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2
          className="text-pretty font-semibold text-2xl text-primary md:text-3xl"
          id="partner-title"
        >
          Partner Inovasi Kami
        </h2>

        <div className="pointer-events-none select-none p-12">
          <Image alt="Logo partner" className="h-full w-full" src={partner} />
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-muted-foreground text-sm">
          We&apos;ve done it carefully and simply. Combined with the ingredients
          make for beautiful landings. It is definitely the tool you need to
          speed up your design process.
        </p>
      </div>
    </section>
  );
}
