import { LineChart, Line, YAxis } from "recharts";
import type { ChartData } from "../types";
import { useMemo } from "react";

const Chart = () => {
  const chartData = useMemo(() => {
    const numberOfPoints = 20;
    const data: ChartData[] = [];
    let lastValue = 50;

    for (let i = 0; i < numberOfPoints; i++) {
      const variation = (Math.random() - 0.5) * 60;
      const value = Math.max(10, Math.min(100, lastValue + variation));
      data.push({
        id: i + 1,
        responseTime: value,
        avgTime: 150,
      });
      lastValue = value;
    }

    return data;
  }, []);

  return (
    <LineChart width={500} height={100} data={chartData}>
      <YAxis
        domain={[0, 100]}
        ticks={[25, 50, 75]}
        stroke="#e5e7eb"
        strokeWidth={1}
        tick={false}
        axisLine={false}
      />

      <Line
        dataKey="responseTime"
        stroke="#9103eb"
        strokeWidth={2}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
};

export default Chart;
