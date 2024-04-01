import "./App.css";
import React, { useState, useEffect } from "react";
import "chartjs-adapter-date-fns";
import { fetchStockData } from './api/fetchStockData';
import StockChart from "./StockChart";

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

  useEffect(() => {
    setLoading(true);
    fetchStockData()
      .then((data) => {
        const parsedData = Object.entries(data).map(([date, value]) => ({
          date,
          open: value["1. open"],
          high: value["2. high"],
          low: value["3. low"],
          close: value["4. close"],
          volume: value["5. volume"],
        }));
        setStockData(parsedData);
      })
      .catch((error) => {
        console.error("Failed to fetch stock data: ", error);
        setError("Failed to fetch stock data.");
      })
      .finally(() => setLoading(false));
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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section>
      <h1 className="text-lg">Nvidia Corp (NVDA)</h1>
      <div className="w-full flex justify-center items-center p-4">
        <h2 className="text-sm mb-4">Intraday Stock Data (Close Price)</h2>
        <div className="w-full h-96">
          <StockChart data={data} />
        </div>
      </div>
    </section>
  );
};

export default App;
