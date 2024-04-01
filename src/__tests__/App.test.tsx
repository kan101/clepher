import { it, expect, describe } from 'vitest'
import { render, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

describe("App Component", () => {
  it("renders without crashing", () => {
    render(`<App />`);
  });
});

describe("Data Fetching", () => {
  it("successfully fetches and displays stock data", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("Nvidia Corp (NVDA)")).toBeInTheDocument());
  });
});