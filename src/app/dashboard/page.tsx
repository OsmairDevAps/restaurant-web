'use client'

import Header from "@/components/header";
import Menu from "@/components/menu";
import { Bar, BarChart, XAxis, Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent  } from "@/components/ui/chart"

const chartConfigPie = {
  chrome: {
    label: "Crepes",
    color: "#d99f00",
  },
  safari: {
    label: "Baguetes",
    color: "#ffee00",
  },
  firefox: {
    label: "Bebidas",
    color: "#e7e7e7",
  },
  edge: {
    label: "Vinhos",
    color: "#8c00ff",
  },
  other: {
    label: "Especiais",
    color: "#5de4fc",
  },
} satisfies ChartConfig

const chartConfig = {
  desktop: {
    label: "Dia",
    color: "#9925eb",
  },
} satisfies ChartConfig

export default function Dashboard() {
  const chartDataPie = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ]

  const chartData = [
    { day: "Dia 1", total: 1860 },
    { day: "Dia 2", total: 3050 },
    { day: "Dia 3", total: 2370 },
    { day: "Dia 4", total: 730 },
    { day: "Dia 5", total: 2090 },
    { day: "Dia 6", total: 2140 },
    { day: "Dia 7", total: 950 },
    { day: "Dia 8", total: 2000 },
    { day: "Dia 9", total: 3452 },
    { day: "Dia 10", total: 2800 },
    { day: "Dia 11", total: 1600 },
    { day: "Dia 12", total: 1500 },
  ]

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Menu />
        
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center gap-2 p-2">
            <div className="flex flex-col justify-start items-start p-4 w-1/3 bg-cyan-600 rounded-xl">
              <span className="text-white font-semibold">Total de vendas hoje</span>
              <span className="text-white font-semibold text-2xl">R$ 0,00</span>
            </div>
            <div className="flex flex-col justify-start items-start p-4 w-1/3 bg-amber-600 rounded-xl">
              <span className="text-white font-semibold">Total de vendas Abril/2025</span>
              <span className="text-white font-semibold text-2xl">R$ 0,00</span>
            </div>
            <div className="flex flex-col justify-start items-start p-4 w-1/3 bg-blue-600 rounded-xl">
              <span className="text-white font-semibold">Total de vendas ano 2025</span>
              <span className="text-white font-semibold text-2xl">R$ 0,00</span>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-2 p-2">
            <div className="flex flex-col justify-start items-center w-2/3 p-4 border-[1px] border-fuchsia-600 rounded-xl">
              <h2 className="font-semibold">Vendas Abril/2025</h2>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <XAxis
                      dataKey="day"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 6)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>

            <div className="flex flex-col justify-start items-center w-1/3 h-full p-4 flex-wrap border-[1px] border-green-600 rounded-xl">
              <h2 className="font-semibold">Vendas por categoria Abril/2025</h2>
              <div className="flex flex-row justify-center items-center gap-4 p-8">
                <div className="w-80 h-80 rounded-full">
                  <ChartContainer
                    config={chartConfigPie}
                    className="mx-auto aspect-square max-h-[300px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie 
                        data={chartDataPie} 
                        dataKey="visitors" 
                        label={({ payload, ...props }) => {
                          return (
                            <text
                              cx={props.cx}
                              cy={props.cy}
                              x={props.x}
                              y={props.y}
                              textAnchor={props.textAnchor}
                              dominantBaseline={props.dominantBaseline}
                              fill="hsla(var(--foreground))"
                            >
                              {payload.visitors}
                            </text>
                          )
                        }}
                        nameKey="browser" 
                      />
                    </PieChart>
                  </ChartContainer>
                </div>
                <div className="flex flex-col justify-center p-2">
                  <div className="flex flex-row gap-2 justify-items-start items-center">
                    <div className="w-4 h-4 bg-yellow-600"/>
                    <span>Crepes</span>
                  </div>
                  <div className="flex flex-row gap-2 justify-items-start items-center">
                    <div className="w-4 h-4 bg-yellow-200"/>
                    <span>Baguetes</span>
                  </div>
                  <div className="flex flex-row gap-2 justify-items-start items-center">
                    <div className="w-4 h-4 bg-gray-300"/>
                    <span>Bebidas</span>
                  </div>
                  <div className="flex flex-row gap-2 justify-items-start items-center">
                    <div className="w-4 h-4 bg-purple-500"/>
                    <span>Vinhos</span>
                  </div>
                  <div className="flex flex-row gap-2 justify-items-start items-center">
                    <div className="w-4 h-4 bg-cyan-400"/>
                    <span>Especiais</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}