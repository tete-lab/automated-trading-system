
"use client"

import {StockInfo} from "@/components/dashboard/stock-info";
import {StockInvestmentIndicators} from "@/components/dashboard/stock-investment-indicators";
import {StockDaily} from "@/components/dashboard/stock-daily";
import {StockGraph} from "@/components/dashboard/stock-graph";
import {StockNews} from "@/components/dashboard/stock-news";
import {StockSearch} from "@/components/dashboard/stock-search";
import {StockTrade} from "@/components/dashboard/stock-trade";
import { useState } from "react";
import {Stock} from "@/components/dashboard/stock";

export default function TradingDashboard() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
    console.log("Stock selected in dashboard:", stock);
  };

  const handleClearSelection = () => {
    setSelectedStock(null);
    console.log("Stock selection cleared");
  };

  return (
      <div className="min-h-screen bg-[#f2f4f6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:p-6">
          {/* Left Sidebar - Stock Search List */}
          <div className="lg:col-span-3">
            <StockSearch
                onStockSelect={handleStockSelect}
                onClearSelection={handleClearSelection}
                selectedStock={selectedStock} // 선택된 종목 정보를 전달
            />
          </div>

          {/* Center - Market Data */}
          <div className="lg:col-span-6 space-y-4">
            {/* Stock Header */}
            <StockInfo
                selectedStock={selectedStock}
                onClearSelection={handleClearSelection}
            />

            {/* Investment Indicators */}
            <StockInvestmentIndicators selectedStock={selectedStock} />

            {/* Daily Stock Data */}
            <StockDaily selectedStock={selectedStock} />

            {/* Daily Stock Graph */}
            <StockGraph selectedStock={selectedStock} />

            {/* Stock Related News */}
            <StockNews selectedStock={selectedStock} />
          </div>

          {/* Right Sidebar - Trading Panel */}
          <div className="lg:col-span-3">
            <StockTrade selectedStock={selectedStock} />
          </div>
        </div>
      </div>
  )
}