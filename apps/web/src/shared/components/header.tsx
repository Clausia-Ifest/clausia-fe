"use client";

import { format } from "date-fns";
import { Bell, CalendarIcon, LogOut, Search, UserRoundPen } from "lucide-react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useLogoutMutation } from "../repository/auth/query";
import { useSessionQuery } from "../repository/session-manager/query";

export default function Header() {
  const { data: session } = useSessionQuery();
  const { isPending, mutate: logout } = useLogoutMutation();
  const now = new Date();
  const formattedDate = format(now, "d MMMM yyyy");
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="relative flex flex-1 items-center gap-4">
        <Search className="absolute left-2 size-6 pl-2 text-gray-400" />
        <Input
          className="w-full rounded-lg bg-[#fff] px-9 py-2 text-sm"
          placeholder="Cari dokumen disini"
          type="text"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-500 text-sm"
          disabled
          type="button"
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
          {formattedDate}
        </Button>
        <Button
          aria-label="Notifikasi"
          className="rounded-lg p-2"
          type="button"
          variant="outline"
        >
          <Bell className="h-5 w-5 text-gray-400" />
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex cursor-pointer items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage
                    alt={session?.full_name}
                    src="/avatar/johny.png"
                  />
                  <AvatarFallback>{session?.full_name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <span className="font-semibold text-sm leading-tight">
                    {session?.full_name}
                  </span>
                  <span className="text-gray-400 text-xs leading-tight">
                    {session?.role}
                  </span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent
              align="end"
              className="flex flex-col gap-1 p-2 text-center text-black shadow-xl outline-1 outline-neutrals-200 transition-colors"
              side="bottom"
            >
              <Link
                className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
                href="/"
              >
                <UserRoundPen className="mr-2 inline h-4 w-4 text-gray-400" />
                Edit Profile
              </Link>
              <Button
                className="w-full px-4 py-2 text-left text-red-500 text-sm transition-colors hover:bg-neutral-100"
                disabled={isPending}
                onClick={() => logout()}
                variant="ghost"
              >
                <LogOut className="mr-2 inline h-4 w-4" />
                {isPending ? "Logging out..." : "Logout"}
              </Button>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}
