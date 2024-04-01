import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import priceData from "./data.json"; // bypass API restrictions
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

interface StockData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

const App: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // const { data } = await axios.get(
      //   `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NVDA&interval=5min&apikey=GIJ7N54UR89W2FPU`
      // );

      const timeSeries = priceData["Time Series (5min)"];
      const parsedData: StockData[] = Object.entries(timeSeries).map(
        ([date, value]) => ({
          date,
          open: value["1. open"],
          high: value["2. high"],
          low: value["3. low"],
          close: value["4. close"],
          volume: value["5. volume"],
        })
      );
      console.log(parsedData);
      setStockData(parsedData);
    } catch (error) {
      setError("Failed to fetch stock data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: stockData.map((data) => data.date),
    datasets: [
      {
        label: "Close Price",
        data: stockData.map((data) => data.close),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section>
      <h1 className="text-lg">Nvidia Corp (NVDA)</h1>
      <div className="w-full flex justify-center items-center p-4">
        <h2 className="text-sm mb-4">Intraday Stock Data (Close Price)</h2>
        <div className="w-full max-w-screen-lg">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default App;
