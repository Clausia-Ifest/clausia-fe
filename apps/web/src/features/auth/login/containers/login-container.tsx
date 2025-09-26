"use client";

import Image from "next/image";
import { Separator } from "@/shared/components/ui/separator";
import LoginForm from "../components/login-form";
import Logo from "../components/logo";
import Slides from "../components/slide";
import SocialButtons from "../components/social-button";

export default function LoginPage() {
  return (
    <section className="container mx-auto grid h-screen w-full grid-cols-2">
      {/* Background */}
      <Image
        alt="Clausia Background"
        className="absolute z-0 object-cover"
        fill
        src="/bg/auth.png"
      />

      {/* Left Side */}
      <div className="z-10 col-span-1 grid place-content-center gap-32">
        <Logo />
        <Slides />
      </div>

      {/* Right Side */}
      <div className="z-10 col-span-1 flex items-end justify-center">
        <div className="flex h-[calc(100vh-5rem)] w-full max-w-[460px] flex-col rounded-t-3xl bg-white px-8 py-10 shadow-lg">
          <div className="mb-9">
            <p className="font-medium text-xs uppercase tracking-wide">
              Welcome Back
            </p>
            <h2 className="font-semibold text-2xl">Login to your account</h2>
          </div>

          <LoginForm />

          <div className="my-6 flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs">Or</span>
            <Separator className="flex-1" />
          </div>

          <SocialButtons />
        </div>
      </div>
    </section>
  );
}
