"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Search } from "lucide-react"
import { StockTrade } from "@/components/dashboard/stock-trade"
import { Stock } from "@/components/dashboard/stock"
import {TradeResult} from "@/components/dashboard/trade-result";

// Extended Interface for Trade Items
interface TradeItem extends Stock {
  prevPrice: number
  type: "매수" | "매도"
  targetPrice: number
  quantity: number
  macd: string
  rsi: number
  recommendation: string
  tradeStatus: "매매대기" | "매매완료" | "매매실패" | "조건미달"
  failReason?: string
  conditionMet: boolean
  executed: boolean // For summary calculation
  totalAmount: number // For summary calculation
}

// Dummy Data Generation
const generateDummyData = (): TradeItem[] => {
  return [
    {
      id: "1",
      name: "삼성전자",
      code: "005930",
      price: 78000,
      prevPrice: 77000,
      change: 1000,
      changePercent: 1.3,
      volume: 15000000,
      marketCap: 460000000,
      favorite_yn: "y",
      type: "매수",
      targetPrice: 77500,
      quantity: 10,
      macd: "Golden Cross",
      rsi: 45,
      recommendation: "강력매수",
      tradeStatus: "매매완료",
      conditionMet: true,
      executed: true,
      totalAmount: 775000,
    },
    {
      id: "2",
      name: "SK하이닉스",
      code: "000660",
      price: 132000,
      prevPrice: 130000,
      change: 2000,
      changePercent: 1.5,
      volume: 5000000,
      marketCap: 96000000,
      favorite_yn: "y",
      type: "매도",
      targetPrice: 133000,
      quantity: 5,
      macd: "Neutral",
      rsi: 72,
      recommendation: "매도",
      tradeStatus: "매매대기",
      conditionMet: true,
      executed: false,
      totalAmount: 665000,
    },
    {
      id: "3",
      name: "NAVER",
      code: "035420",
      price: 210000,
      prevPrice: 215000,
      change: -5000,
      changePercent: -2.3,
      volume: 1000000,
      marketCap: 34000000,
      favorite_yn: "n",
      type: "매수",
      targetPrice: 205000,
      quantity: 10,
      macd: "Dead Cross",
      rsi: 25,
      recommendation: "중립",
      tradeStatus: "조건미달",
      conditionMet: false,
      executed: false,
      totalAmount: 2050000,
      failReason: "조건 불충족",
    },
    {
      id: "4",
      name: "카카오",
      code: "035720",
      price: 55000,
      prevPrice: 56000,
      change: -1000,
      changePercent: -1.8,
      volume: 2000000,
      marketCap: 24000000,
      favorite_yn: "y",
      type: "매수",
      targetPrice: 54000,
      quantity: 20,
      macd: "Neutral",
      rsi: 30,
      recommendation: "매수",
      tradeStatus: "매매대기",
      conditionMet: true,
      executed: false,
      totalAmount: 1080000,
    },
    {
      id: "5",
      name: "LG에너지솔루션",
      code: "373220",
      price: 420000,
      prevPrice: 425000,
      change: -5000,
      changePercent: -1.2,
      volume: 300000,
      marketCap: 98000000,
      favorite_yn: "n",
      type: "매도",
      targetPrice: 430000,
      quantity: 2,
      macd: "Dead Cross",
      rsi: 65,
      recommendation: "중립",
      tradeStatus: "조건미달",
      conditionMet: false,
      executed: false,
      totalAmount: 860000,
      failReason: "가격 미도달",
    },
    {
      id: "6",
      name: "현대차",
      code: "005380",
      price: 195000,
      prevPrice: 190000,
      change: 5000,
      changePercent: 2.6,
      volume: 800000,
      marketCap: 41000000,
      favorite_yn: "y",
      type: "매수",
      targetPrice: 192000,
      quantity: 5,
      macd: "Golden Cross",
      rsi: 55,
      recommendation: "강력매수",
      tradeStatus: "매매완료",
      conditionMet: true,
      executed: true,
      totalAmount: 960000,
    },
    {
      id: "7",
      name: "기아",
      code: "000270",
      price: 88000,
      prevPrice: 87000,
      change: 1000,
      changePercent: 1.1,
      volume: 900000,
      marketCap: 35000000,
      favorite_yn: "n",
      type: "매수",
      targetPrice: 86000,
      quantity: 10,
      macd: "Neutral",
      rsi: 50,
      recommendation: "매수",
      tradeStatus: "매매대기",
      conditionMet: true,
      executed: false,
      totalAmount: 860000,
    },
    {
      id: "8",
      name: "POSCO홀딩스",
      code: "005490",
      price: 450000,
      prevPrice: 460000,
      change: -10000,
      changePercent: -2.2,
      volume: 400000,
      marketCap: 38000000,
      favorite_yn: "y",
      type: "매도",
      targetPrice: 470000,
      quantity: 3,
      macd: "Dead Cross",
      rsi: 80,
      recommendation: "매도",
      tradeStatus: "매매실패",
      conditionMet: true,
      executed: false,
      totalAmount: 1410000,
      failReason: "주문 거부",
    },
    {
      id: "9",
      name: "LG화학",
      code: "051910",
      price: 480000,
      prevPrice: 485000,
      change: -5000,
      changePercent: -1.0,
      volume: 200000,
      marketCap: 33000000,
      favorite_yn: "n",
      type: "매수",
      targetPrice: 470000,
      quantity: 2,
      macd: "Neutral",
      rsi: 40,
      recommendation: "중립",
      tradeStatus: "조건미달",
      conditionMet: false,
      executed: false,
      totalAmount: 940000,
    },
    {
      id: "10",
      name: "삼성SDI",
      code: "006400",
      price: 430000,
      prevPrice: 420000,
      change: 10000,
      changePercent: 2.4,
      volume: 150000,
      marketCap: 29000000,
      favorite_yn: "y",
      type: "매수",
      targetPrice: 425000,
      quantity: 4,
      macd: "Golden Cross",
      rsi: 60,
      recommendation: "매수",
      tradeStatus: "매매대기",
      conditionMet: true,
      executed: false,
      totalAmount: 1700000,
    },
  ]
}

export default function TradeSchedulePage() {
  const [data, setData] = useState<TradeItem[]>(generateDummyData())
  const [currentTime, setCurrentTime] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState<string>("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStock, setSelectedStock] = useState<TradeItem | null>(null)

  // Timer for Current Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("ko-KR", {hour12: false})
      setCurrentTime(timeString)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Initial Sort (Conditions True first)
  useEffect(() => {
    setData((prev) =>
        [...prev].sort((a, b) => (a.conditionMet === b.conditionMet ? 0 : a.conditionMet ? -1 : 1))
    )
  }, [])

  // Filter Data
  const filteredData = data.filter(
      (item) =>
          item.name.includes(searchQuery) || item.code.includes(searchQuery)
  )

  // Pagination Logic
  const pageSize = parseInt(itemsPerPage)
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
  )

  // Summary Calculations
  const scheduledCount = data.length
  const scheduledShares = data.reduce((acc, cur) => acc + cur.quantity, 0)
  const scheduledAmount = data.reduce((acc, cur) => acc + cur.totalAmount, 0)

  const executedData = data.filter((item) => item.executed)
  const executedCount = executedData.length
  const executedShares = executedData.reduce((acc, cur) => acc + cur.quantity, 0)
  const executedAmount = executedData.reduce((acc, cur) => acc + cur.totalAmount, 0)

  // Handlers
  const handleMove = (index: number, direction: "up" | "down") => {
    const newData = [...data]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    if (targetIndex >= 0 && targetIndex < newData.length) {
      // Swap
      const temp = newData[index]
      newData[index] = newData[targetIndex]
      newData[targetIndex] = temp
      setData(newData)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
      <div className="min-h-screen bg-[#f2f4f6] dark:bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:p-6">
          {/* Main Content Area */}
          <div className="lg:col-span-9 flex flex-col space-y-4">
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-foreground">거래 예정 내역</h1>
              <p className="text-muted-foreground mt-1">자동 매매 스케줄 및 결과 모니터링</p>
            </div>

            {/* Top Info Area */}
            <div className="grid gap-4">
              <Card
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-900 dark:text-blue-100 flex items-center justify-between">
                <div className="font-medium">
                  2026년 01월 06일 자동 매매 시간은 <span className="font-bold text-xl ml-2">{currentTime}</span> 입니다.
                </div>
              </Card>

              <Card className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-card">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">금일 자동 매매 예정</span>
                  <span className="font-bold text-lg text-foreground">
                  {scheduledCount} 건 <span
                      className="text-base font-normal text-muted-foreground">(총 {scheduledShares.toLocaleString()}주, {scheduledAmount.toLocaleString()}원)</span>
                </span>
                </div>
                <div
                    className="flex flex-col gap-1 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-4">
                  <span className="text-sm text-muted-foreground">금일 자동 매매 체결</span>
                  <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                  {executedCount} 건 <span
                      className="text-base font-normal text-muted-foreground">(총 {executedShares.toLocaleString()}주, {executedAmount.toLocaleString()}원)</span>
                </span>
                </div>
              </Card>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input
                    type="text"
                    placeholder="종목명 또는 종목코드 검색"
                    className="pl-9 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={itemsPerPage} onValueChange={(val) => {
                setItemsPerPage(val);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-[120px] bg-background">
                  <SelectValue placeholder="페이지당"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10개씩</SelectItem>
                  <SelectItem value="30">30개씩</SelectItem>
                  <SelectItem value="50">50개씩</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table Area */}
            <Card className="rounded-xl border-0 shadow-md overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 w-16 text-center">순서</th>
                    <th className="px-4 py-3">종목명(코드)</th>
                    <th className="px-4 py-3 text-right">전일가격</th>
                    <th className="px-4 py-3 text-right">등락률</th>
                    <th className="px-4 py-3 text-center">타입</th>
                    <th className="px-4 py-3 text-right">수량</th>
                    <th className="px-4 py-3 text-center">MACD</th>
                    <th className="px-4 py-3 text-center">RSI</th>
                    <th className="px-4 py-3 text-center">추천</th>
                    <th className="px-4 py-3 text-center">매매여부</th>
                    <th className="px-4 py-3">실패이유</th>
                    <th className="px-4 py-3 text-right">매수/매도가</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                  {paginatedData.map((item, index) => {
                    const globalIndex = (currentPage - 1) * pageSize + index
                    const isConditionMet = item.conditionMet
                    return (
                        <tr
                            key={item.id}
                            onClick={() => setSelectedStock(item)}
                            className={`
                          cursor-pointer transition-colors
                          ${selectedStock?.id === item.id
                                ? "ring-2 ring-inset ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : ""}
                          ${isConditionMet
                                ? "bg-card hover:bg-muted/50 dark:hover:bg-muted/30"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"}
                        `}
                        >
                          <td className="px-4 py-3 text-center">
                            <div className="flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={() => handleMove(globalIndex, "up")}
                                  disabled={globalIndex === 0}
                              >
                                <ArrowUp className="h-3 w-3"/>
                              </Button>
                              <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={() => handleMove(globalIndex, "down")}
                                  disabled={globalIndex === data.length - 1}
                              >
                                <ArrowDown className="h-3 w-3"/>
                              </Button>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium">
                            <div className="flex flex-col">
                              <span
                                  className={`${isConditionMet ? "text-foreground" : "text-muted-foreground"}`}>{item.name}</span>
                              <span className="text-xs text-muted-foreground">{item.code}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-foreground">{item.prevPrice.toLocaleString()}</td>
                          <td className={`px-4 py-3 text-right font-medium ${item.change > 0 ? "text-red-500 dark:text-red-400" : item.change < 0 ? "text-blue-500 dark:text-blue-400" : "text-muted-foreground"}`}>
                            {item.changePercent}%
                          </td>
                          <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                              item.type === "매수"
                                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                  : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}>
                            {item.type}
                          </span>
                          </td>
                          <td className="px-4 py-3 text-right text-foreground">{item.quantity.toLocaleString()}</td>
                          <td className="px-4 py-3 text-center text-xs text-foreground">{item.macd}</td>
                          <td className={`px-4 py-3 text-center font-medium ${item.rsi >= 70 ? "text-red-500 dark:text-red-400" : item.rsi <= 30 ? "text-blue-500 dark:text-blue-400" : "text-foreground"}`}>
                            {item.rsi}
                          </td>
                          <td className="px-4 py-3 text-center text-xs font-medium text-foreground">{item.recommendation}</td>
                          <td className="px-4 py-3 text-center">
                           <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                            ${item.tradeStatus === "매매완료" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                               item.tradeStatus === "매매실패" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                                   item.tradeStatus === "조건미달" ? "bg-muted text-muted-foreground" :
                                       "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                           }
                           `}>
                             {item.tradeStatus}
                           </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-red-500 dark:text-red-400">{item.failReason || "-"}</td>
                          <td className="px-4 py-3 text-right font-medium text-foreground">{item.targetPrice.toLocaleString()}</td>
                        </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border flex items-center justify-center gap-2 bg-card">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4"/>
                </Button>
                <span className="text-sm font-medium text-foreground">
                {currentPage} / {totalPages === 0 ? 1 : totalPages}
              </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4"/>
                </Button>
              </div>
            </Card>
          </div>

        {/* Right Panel (Stock Trade Settings) */}
        <div className="lg:col-span-3 space-y-4">
          {selectedStock && selectedStock.tradeStatus !== "매매대기" ? (
             <TradeResult stock={selectedStock} />
          ) : (
             <StockTrade selectedStock={selectedStock} />
          )}
          <div className="p-4 bg-card rounded-xl text-xs text-muted-foreground shadow-sm border border-border">
            <p className="font-semibold mb-2">📌 도움말</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>리스트의 항목을 선택하면 상단 패널에서 상세 설정을 변경할 수 있습니다.</li>
              <li>자동 매매 조건이 'True'인 종목만 상단에 표시됩니다.</li>
              <li>조건 미달인 종목은 회색으로 표시되며 매매 대상에서 제외됩니다.</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
  )
}