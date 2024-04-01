import React from "react";
import { Line } from "react-chartjs-2";
import {
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale
);

interface StockChartData {
  labels: string[];
  datasets: {
    label: string;
    data: string[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const StockChart: React.FC<{ data: StockChartData }> = ({ data }) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time" as const,
        time: {
          displayFormats: {
            minute: "HH:mm",
          },
          tooltipFormat: "HH:mm",
          parser: "yyyy-MM-dd HH:mm:ss",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default StockChart;
