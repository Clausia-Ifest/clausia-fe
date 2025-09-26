"use client";

import { StatsCard } from "@/features/dashboard/components/stat-card";
import { StatusCard } from "@/features/dashboard/components/status-card";
import TaskCard from "@/features/dashboard/components/task-card";
import UploadCard from "@/features/dashboard/components/upload-card";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import { GradientAreaChart } from "@/shared/components/gradient-chart";
import { Calendar } from "@/shared/components/ui/calendar";
import { useSessionQuery } from "@/shared/repository/session-manager/query";
import ContractsTable from "../components/contracts-table";

export default function DashboardContainer() {
  const { date, setDate } = useDashboard();
  const { data: session } = useSessionQuery();
  const isAdmin = session?.role === "Admin";

  return (
    <main className="grid h-max w-full gap-8">
      <div className="flex w-full gap-8">
        <section className="w-3/4 space-y-4">
          {/* title */}
          <div>
            <h1 className="font-heading-2-medium">
              {isAdmin ? "Dashboard Staff Operasional" : "Dashboard Legal"}
            </h1>
            <p className="font-body-semibold text-muted-foreground">
              {isAdmin
                ? "Dashboard Staff Operasional"
                : "Lihat Dashboard dan temukan insight untuk operasional kontrakmu !"}
            </p>
          </div>

          {/* upload */}
          <UploadCard bearer={isAdmin} />

          {/* statistik */}
          {isAdmin ? (
            <div className="flex gap-4">
              <StatsCard />
              <StatusCard bearer={isAdmin} />
            </div>
          ) : (
            <>
              <div className="flex gap-4" />
              <StatusCard bearer={isAdmin} />
            </>
          )}

          {/* chart */}
          {isAdmin && <GradientAreaChart />}
        </section>

        {/* aside */}
        <aside className="w-1/4 space-y-4">
          {isAdmin && (
            <Calendar
              captionLayout="dropdown"
              className="w-full rounded-md border shadow-sm"
              mode="single"
              onSelect={setDate}
              selected={date}
            />
          )}

          <TaskCard bearer={isAdmin} />
        </aside>
      </div>
      {!isAdmin && <ContractsTable />}
    </main>
  );
}
