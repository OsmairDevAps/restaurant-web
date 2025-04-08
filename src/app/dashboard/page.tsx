'use client'

import Header from "@/components/header";
import Menu from "@/components/menu";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent  } from "@/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#9925eb",
  },
  mobile: {
    label: "Mobile",
    color: "#7c60fa",
  },
} satisfies ChartConfig

export default function Dashboard() {
  const chartData = [
    { month: "January", desktop: 1860, mobile: 800 },
    { month: "February", desktop: 3050, mobile: 2000 },
    { month: "March", desktop: 2370, mobile: 1200 },
    { month: "April", desktop: 730, mobile: 1900 },
    { month: "May", desktop: 2090, mobile: 1300 },
    { month: "June", desktop: 2140, mobile: 1400 },
  ]

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Menu />
        <div className="flex flex-col justify-start items-center flex-wrap w-full px-40">
          <div>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
            <h2>BALANÇO 6 ÚLTIMOS MESES</h2>
          </div>

          
        </div>
      </div>
    </div>
  )
}