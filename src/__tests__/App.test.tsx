import { it, expect, describe, vi } from 'vitest'
import { render, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

vi.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mockLineChart"></div>,
}));

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

describe('Line Chart Component', () => {
  it('renders without crashing', async () => {
    render(<App />);
    const mockLineChart = screen.getByTestId('mockLineChart');
    expect(mockLineChart).toBeInTheDocument();
  });
});