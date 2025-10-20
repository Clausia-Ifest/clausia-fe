"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/clausia/icon-primary-title.svg";
import { useSessionQuery } from "../repository/session-manager/query";

export function Navbar() {
  const { data: session } = useSessionQuery();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1">
        <Link className="flex items-center gap-2" href="/">
          <Image alt="Logo" className="size-18 scale-150" src={logo} />
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link className="hover:text-primary" href="#">
            Home
          </Link>
          <Link className="hover:text-primary" href="#about">
            About us
          </Link>
          <Link className="hover:text-primary" href="#features">
            Features
          </Link>
          <Link className="hover:text-primary" href="#how">
            How it work
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {session?.access_token ? (
            <Link
              className="rounded-xl bg-primary p-2 px-5 text-primary-foreground hover:opacity-90"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className="rounded-xl bg-primary p-2 px-5 text-primary-foreground hover:opacity-90"
              href={"/login"}
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
