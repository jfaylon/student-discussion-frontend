"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { PieChartProps } from "@/interfaces";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#60A5FA", // blue-400
          "#34D399", // green-400
          "#F87171", // red-400
          "#FBBF24", // yellow-400
          "#A78BFA", // purple-400
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#000",
        font: {
          weight: "bold" as const,
        },
        formatter: (value: number) => {
          return value; // 👈 shows raw value on the slice
        },
      },
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"pie">) => {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw as number;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow rounded w-full max-w-md">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
