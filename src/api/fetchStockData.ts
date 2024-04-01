// import axios from "axios";
import priceData from "./data.json";

export const fetchStockData = async () => {
  try {
    /** 
     * Alphavantage restricts free api to 25 calls per day. Used hardcoded data from API
     * 
     * const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NVDA&interval=5min&apikey=GIJ7N54UR89W2FPU`
    );*/

    const timeSeries = priceData["Time Series (5min)"];

    return timeSeries;
  } catch (error) {
    console.error("Failed to fetch stock data: ", error);
    throw error;
  }
};
