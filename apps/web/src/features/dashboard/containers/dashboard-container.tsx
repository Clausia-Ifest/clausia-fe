"use client";

import { StatsCard } from "@/features/dashboard/components/stat-card";
import { StatusCard } from "@/features/dashboard/components/status-card";
import TaskCard from "@/features/dashboard/components/task-card";
import UploadCard from "@/features/dashboard/components/upload-card";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import { GradientAreaChart } from "@/shared/components/gradient-chart";
import { Calendar } from "@/shared/components/ui/calendar";

export default function DashboardContainer() {
  const { date, setDate } = useDashboard();

  return (
    <main className="grid h-max w-full gap-8">
      <div className="flex w-full gap-8">
        <section className="w-3/4 space-y-4">
          {/* title */}
          <div>
            <h1 className="font-heading-2-medium">
              Dashboard Staff Operasional
            </h1>
            <p className="font-body-semibold text-muted-foreground">
              Dashboard Staff Operasional
            </p>
          </div>

          {/* upload */}
          <UploadCard />

          {/* statistik */}
          <div className="flex gap-4">
            <StatsCard />
            <StatusCard />
          </div>

          {/* chart */}
          <GradientAreaChart />
        </section>

        {/* aside */}
        <aside className="w-1/4 space-y-4">
          <Calendar
            captionLayout="dropdown"
            className="w-full rounded-md border shadow-sm"
            mode="single"
            onSelect={setDate}
            selected={date}
          />
          <TaskCard />
        </aside>
      </div>
    </main>
  );
}
