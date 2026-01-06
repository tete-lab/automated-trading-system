"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  BarChart3
} from "lucide-react"
import { format, subDays } from "date-fns"

// Types
interface TradeHistoryItem {
  id: string
  date: string
  time: string
  name: string
  code: string
  prevPrice: number
  change: number
  changePercent: number
  type: "매수" | "매도"
  quantity: number
  macd: string
  rsi: number
  recommendation: string
  tradeStatus: "매매완료" | "매매실패" | "조건미달"
  failReason?: string
  price: number // 매수가/매도가
  profitAmount?: number
  profitRate?: number
}

// Dummy Data Generator
const generateDummyData = (): TradeHistoryItem[] => {
  return [
    {
      id: "1",
      date: "2026-01-06",
      time: "09:30",
      name: "삼성전자",
      code: "005930",
      prevPrice: 77000,
      change: 1000,
      changePercent: 1.3,
      type: "매수",
      quantity: 10,
      macd: "Golden Cross",
      rsi: 45,
      recommendation: "강력매수",
      tradeStatus: "매매완료",
      price: 78000,
    },
    {
      id: "2",
      date: "2026-01-06",
      time: "10:15",
      name: "SK하이닉스",
      code: "000660",
      prevPrice: 130000,
      change: 2000,
      changePercent: 1.5,
      type: "매도",
      quantity: 5,
      macd: "Neutral",
      rsi: 72,
      recommendation: "매도",
      tradeStatus: "매매완료",
      price: 132000,
      profitAmount: 10000,
      profitRate: 1.5,
    },
    {
      id: "3",
      date: "2026-01-05",
      time: "14:00",
      name: "NAVER",
      code: "035420",
      prevPrice: 215000,
      change: -5000,
      changePercent: -2.3,
      type: "매수",
      quantity: 10,
      macd: "Dead Cross",
      rsi: 25,
      recommendation: "중립",
      tradeStatus: "조건미달",
      failReason: "RSI 기준 초과",
      price: 210000,
    },
    {
      id: "4",
      date: "2026-01-05",
      time: "11:20",
      name: "카카오",
      code: "035720",
      prevPrice: 56000,
      change: -1000,
      changePercent: -1.8,
      type: "매도",
      quantity: 20,
      macd: "Neutral",
      rsi: 30,
      recommendation: "매수",
      tradeStatus: "매매완료",
      price: 55000,
      profitAmount: -20000,
      profitRate: -1.8,
    },
    {
      id: "5",
      date: "2026-01-04",
      time: "09:00",
      name: "LG에너지솔루션",
      code: "373220",
      prevPrice: 425000,
      change: -5000,
      changePercent: -1.2,
      type: "매수",
      quantity: 2,
      macd: "Dead Cross",
      rsi: 65,
      recommendation: "중립",
      tradeStatus: "매매실패",
      failReason: "주문 거부",
      price: 420000,
    },
    {
      id: "6",
      date: "2026-01-04",
      time: "13:45",
      name: "현대차",
      code: "005380",
      prevPrice: 190000,
      change: 5000,
      changePercent: 2.6,
      type: "매도",
      quantity: 5,
      macd: "Golden Cross",
      rsi: 55,
      recommendation: "강력매수",
      tradeStatus: "매매완료",
      price: 195000,
      profitAmount: 25000,
      profitRate: 2.6,
    },
    {
      id: "7",
      date: "2026-01-03",
      time: "10:30",
      name: "기아",
      code: "000270",
      prevPrice: 87000,
      change: 1000,
      changePercent: 1.1,
      type: "매수",
      quantity: 10,
      macd: "Neutral",
      rsi: 50,
      recommendation: "매수",
      tradeStatus: "매매완료",
      price: 88000,
    },
    {
      id: "8",
      date: "2026-01-03",
      time: "15:15",
      name: "POSCO홀딩스",
      code: "005490",
      prevPrice: 460000,
      change: -10000,
      changePercent: -2.2,
      type: "매도",
      quantity: 3,
      macd: "Dead Cross",
      rsi: 80,
      recommendation: "매도",
      tradeStatus: "매매완료",
      price: 450000,
      profitAmount: -30000,
      profitRate: -2.2,
    },
    {
      id: "9",
      date: "2026-01-02",
      time: "09:10",
      name: "LG화학",
      code: "051910",
      prevPrice: 485000,
      change: -5000,
      changePercent: -1.0,
      type: "매수",
      quantity: 2,
      macd: "Neutral",
      rsi: 40,
      recommendation: "중립",
      tradeStatus: "조건미달",
      failReason: "MACD 신호 미달",
      price: 480000,
    },
    {
      id: "10",
      date: "2026-01-02",
      time: "14:50",
      name: "삼성SDI",
      code: "006400",
      prevPrice: 420000,
      change: 10000,
      changePercent: 2.4,
      type: "매도",
      quantity: 4,
      macd: "Golden Cross",
      rsi: 60,
      recommendation: "매수",
      tradeStatus: "매매완료",
      price: 430000,
      profitAmount: 40000,
      profitRate: 2.4,
    },
  ]
}

export default function TradeHistory() {
  const [data, setData] = useState<TradeHistoryItem[]>([])
  const [filteredData, setFilteredData] = useState<TradeHistoryItem[]>([])
  
  // Filter States
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [searchQuery, setSearchQuery] = useState("")
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")

  // Summary States
  const [summary, setSummary] = useState({
    totalCount: 0,
    totalBuy: 0,
    totalSell: 0,
    totalProfit: 0,
    profitRate: 0,
  })

  // Load Data
  useEffect(() => {
    const dummy = generateDummyData()
    setData(dummy)
    setFilteredData(dummy)
  }, [])

  // Filter Logic
  useEffect(() => {
    let result = data

    // Date Filter
    if (startDate && endDate) {
      result = result.filter(item => item.date >= startDate && item.date <= endDate)
    }

    // Search Filter
    if (searchQuery) {
      result = result.filter(item => 
        item.name.includes(searchQuery) || item.code.includes(searchQuery)
      )
    }

    setFilteredData(result)
    setCurrentPage(1) // Reset to first page on filter change

    // Calculate Summary
    const buyItems = result.filter(item => item.type === "매수" && item.tradeStatus === "매매완료")
    const sellItems = result.filter(item => item.type === "매도" && item.tradeStatus === "매매완료")

    const totalBuy = buyItems.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
    const totalSell = sellItems.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
    const totalProfit = sellItems.reduce((acc, cur) => acc + (cur.profitAmount || 0), 0)
    
    // Simple profit rate calculation based on total sell amount vs total cost of sold items (approx)
    // Or just average of profit rates
    const avgProfitRate = sellItems.length > 0 
      ? sellItems.reduce((acc, cur) => acc + (cur.profitRate || 0), 0) / sellItems.length 
      : 0

    setSummary({
      totalCount: result.filter(item => item.tradeStatus === "매매완료").length,
      totalBuy,
      totalSell,
      totalProfit,
      profitRate: avgProfitRate,
    })

  }, [data, startDate, endDate, searchQuery])

  // Pagination Logic
  const pageSize = parseInt(itemsPerPage)
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className="min-h-screen bg-[#f2f4f6] dark:bg-background">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">일자별 거래내역</h1>
          <p className="text-muted-foreground mt-1">과거 거래 내역과 수익률을 조회합니다.</p>
        </div>

        {/* Summary Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="p-4 bg-card border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">총 거래건수</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{summary.totalCount.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">건</span></p>
          </Card>
          
          <Card className="p-4 bg-card border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <ArrowDownRight className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">총 매입금액</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{summary.totalBuy.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">원</span></p>
          </Card>

          <Card className="p-4 bg-card border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <ArrowUpRight className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">총 매도금액</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{summary.totalSell.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">원</span></p>
          </Card>

          <Card className="p-4 bg-card border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <DollarSign className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">실현손익</span>
            </div>
            <p className={`text-2xl font-bold ${summary.totalProfit > 0 ? "text-red-500" : summary.totalProfit < 0 ? "text-blue-500" : "text-foreground"}`}>
              {summary.totalProfit > 0 ? "+" : ""}{summary.totalProfit.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">원</span>
            </p>
          </Card>

          <Card className="p-4 bg-card border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <BarChart3 className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">수익률</span>
            </div>
            <p className={`text-2xl font-bold ${summary.profitRate > 0 ? "text-red-500" : summary.profitRate < 0 ? "text-blue-500" : "text-foreground"}`}>
              {summary.profitRate > 0 ? "+" : ""}{summary.profitRate.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">%</span>
            </p>
          </Card>
        </div>

        {/* Filter Area */}
        <Card className="p-6 rounded-2xl bg-card border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="start-date">시작일</Label>
              <Input 
                id="start-date" 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">종료일</Label>
              <Input 
                id="end-date" 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="search">종목명 / 종목코드</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="search"
                  placeholder="검색어 입력" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background" 
                />
              </div>
            </div>
            <div>
              <Button className="w-full bg-[#2E64D8] hover:bg-[#2554B8] text-white">
                조회하기
              </Button>
            </div>
          </div>
        </Card>

        {/* Table Area */}
        <Card className="rounded-xl border-0 shadow-md overflow-hidden bg-card">
          <div className="p-4 flex justify-between items-center border-b border-border">
            <h3 className="font-semibold text-foreground">거래 목록</h3>
            <Select value={itemsPerPage} onValueChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-[120px] bg-background">
                <SelectValue placeholder="페이지당" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10개씩</SelectItem>
                <SelectItem value="30">30개씩</SelectItem>
                <SelectItem value="50">50개씩</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">일자/시간</th>
                  <th className="px-4 py-3 whitespace-nowrap">종목명(코드)</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">전일가</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">등락률</th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">구분</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">수량</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">매매가</th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">MACD/RSI</th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">상태</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">실현손익</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground">
                      조회된 거래 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 text-foreground">
                        <div className="flex flex-col">
                          <span>{item.date}</span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        <div className="flex flex-col">
                          <span>{item.name}</span>
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
                      <td className="px-4 py-3 text-right font-medium text-foreground">{item.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center text-xs text-foreground">
                        <div className="flex flex-col items-center">
                          <span>{item.macd}</span>
                          <span className={`${item.rsi >= 70 ? "text-red-500" : item.rsi <= 30 ? "text-blue-500" : "text-muted-foreground"}`}>
                            RSI: {item.rsi}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                            ${item.tradeStatus === "매매완료" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                              item.tradeStatus === "매매실패" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }
                          `}>
                            {item.tradeStatus}
                          </span>
                          {item.failReason && (
                            <span className="text-[10px] text-red-500 mt-1">{item.failReason}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {item.profitAmount !== undefined ? (
                          <div className="flex flex-col items-end">
                            <span className={`font-bold ${item.profitAmount > 0 ? "text-red-500" : item.profitAmount < 0 ? "text-blue-500" : "text-muted-foreground"}`}>
                              {item.profitAmount.toLocaleString()}
                            </span>
                            <span className={`text-xs ${item.profitRate && item.profitRate > 0 ? "text-red-500" : item.profitRate && item.profitRate < 0 ? "text-blue-500" : "text-muted-foreground"}`}>
                              ({item.profitRate}%)
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-center gap-2 bg-card">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-foreground">
              {currentPage} / {totalPages === 0 ? 1 : totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
