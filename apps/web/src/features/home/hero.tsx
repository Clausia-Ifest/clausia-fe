import Slides from "../auth/login/components/slide";

export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative h-screen"
      style={{
        backgroundImage: "url(/bg/hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto flex h-full w-full items-center px-4 md:w-1/2 md:px-0">
        <div className="text-white">
          <Slides />
        </div>
      </div>
    </section>
  );
}
