/** biome-ignore-all lint/style/noNestedTernary: <explanation> */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: <explanation> */
"use client";
import type { UrlObject } from "node:url";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ScrollText,
  Server,
  Settings,
  SquareActivity,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useState } from "react";

type SideMenuItem = {
  label: string;
  icon: ComponentType<{ color?: string; fill?: string; size?: number }>;
  href: UrlObject;
}[];

const sideMenu: SideMenuItem = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: { pathname: "/dashboard" },
  },
  {
    label: "Kontrak",
    icon: ScrollText,
    href: { pathname: "/dashboard/reports" },
  },
  {
    label: "ClauCollect",
    icon: Server,
    href: { pathname: "/dashboard/claucollect" },
  },
  {
    label: "Log Aktivitas",
    icon: SquareActivity,
    href: { pathname: "/dashboard/log" },
  },
  {
    label: "Pengaturan",
    icon: Settings,
    href: { pathname: "/dashboard/settings" },
  },
];

function MenuItem({
  item,
  pathname,
  expanded,
}: {
  item: (typeof sideMenu)[number];
  pathname: string | null;
  expanded: boolean;
}) {
  const isActive =
    pathname === item.href.pathname ||
    pathname?.startsWith(`${item.href.pathname}/`);
  const Icon = item.icon;
  return (
    <div className="w-full" key={item.label}>
      <Link
        className={`group relative flex h-12 w-full items-center gap-4 rounded-full px-4 transition-colors duration-300 ${isActive ? "font-semibold text-white" : "text-gray-400 hover:bg-gray-100"} 
          ${isActive && expanded ? "bg-primary text-white" : ""}`}
        href={item.href}
      >
        <Icon
          color={
            isActive && expanded ? "#fff" : isActive ? "#46bcfc" : "#99a1af"
          }
          fill={isActive && expanded ? "#fff" : isActive ? "#46bcfc" : "none"}
          size={24}
        />
        <motion.span
          animate={{ opacity: expanded ? 1 : 0 }}
          className={`whitespace-nowrap font-medium text-sm ${
            expanded ? "block" : "hidden"
          } ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.label}
        </motion.span>
        {isActive && (
          <motion.span
            animate={expanded ? { scaleY: 0 } : { scaleY: 1 }}
            aria-hidden="true"
            className="-translate-y-1/2 absolute top-1/2 right-0 h-8 w-1 rounded bg-primary-500"
            transition={{ duration: 0.3, delay: 0.3 }}
          />
        )}
      </Link>
    </div>
  );
}

export default function SidebarDashboard() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const InitWidth = 80;
  const ExpandWidth = 220;
  return (
    <motion.aside
      animate={{ width: expanded ? ExpandWidth : InitWidth }}
      aria-label="Sidebar"
      className="sticky top-0 left-0 z-20 h-[100dvh] p-2.5 py-10"
      initial={{ width: 80 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        background: "var(--White, #FFF)",
        boxShadow: "1px 2px 6px 0 rgba(0, 110, 233, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Image
        alt="Clausia Logo"
        className="mx-auto"
        height={42}
        src="/clausia/icon-blue.svg"
        width={45}
      />
      <span className="grid place-items-center gap-8 py-10">
        {sideMenu.map((item) => (
          <MenuItem
            expanded={expanded}
            item={item}
            key={item.label}
            pathname={pathname}
          />
        ))}
      </span>
    </motion.aside>
  );
}
