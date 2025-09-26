"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

const chartData = [
  { month: "January", desktop: 342 },
  { month: "February", desktop: 876 },
  { month: "March", desktop: 512 },
  { month: "April", desktop: 629 },
  { month: "May", desktop: 458 },
  { month: "June", desktop: 781 },
  { month: "July", desktop: 394 },
  { month: "August", desktop: 925 },
  { month: "September", desktop: 647 },
  { month: "October", desktop: 532 },
  { month: "November", desktop: 803 },
  { month: "December", desktop: 271 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-primary-600)",
  },
} satisfies ChartConfig;

export function GradientAreaChart() {
  return (
    <Card className="h-[282px] border-none p-0 shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle>Grafis Kontrak</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-green-500">
            <TrendingUp className="h-4 w-4" />
            <span className="h-full">5.2%</span>
          </span>
          From last period
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer className="h-[250px] w-full" config={chartConfig}>
          <ResponsiveContainer height="100%" width="100%">
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="month"
                tickFormatter={(value) => value.slice(0, 3)}
                tickLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={true} />
              <defs>
                <linearGradient
                  id="gradient-chart-desktop"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="desktop"
                fill="url(#gradient-chart-desktop)"
                fillOpacity={0.4}
                stackId="a"
                stroke="var(--color-desktop)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
