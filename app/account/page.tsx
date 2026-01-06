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
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Wallet,
  RefreshCw
} from "lucide-react"

// Types
interface HoldingItem {
  id: string
  name: string
  code: string
  purchasePrice: number
  currentPrice: number
  quantity: number
  fee: number
  tax: number
}

// Dummy Data Generator
const generateDummyHoldings = (): HoldingItem[] => {
  return [
    { id: "1", name: "삼성전자", code: "005930", purchasePrice: 72000, currentPrice: 78000, quantity: 50, fee: 1500, tax: 3000 },
    { id: "2", name: "SK하이닉스", code: "000660", purchasePrice: 135000, currentPrice: 132000, quantity: 20, fee: 2000, tax: 4000 },
    { id: "3", name: "NAVER", code: "035420", purchasePrice: 200000, currentPrice: 215000, quantity: 10, fee: 1000, tax: 2000 },
    { id: "4", name: "카카오", code: "035720", purchasePrice: 58000, currentPrice: 55000, quantity: 30, fee: 800, tax: 0 },
    { id: "5", name: "LG에너지솔루션", code: "373220", purchasePrice: 410000, currentPrice: 425000, quantity: 5, fee: 2500, tax: 5000 },
    { id: "6", name: "현대차", code: "005380", purchasePrice: 180000, currentPrice: 195000, quantity: 15, fee: 1200, tax: 2400 },
    { id: "7", name: "기아", code: "000270", purchasePrice: 90000, currentPrice: 88000, quantity: 25, fee: 1100, tax: 0 },
    { id: "8", name: "POSCO홀딩스", code: "005490", purchasePrice: 440000, currentPrice: 460000, quantity: 8, fee: 1800, tax: 3600 },
    { id: "9", name: "LG화학", code: "051910", purchasePrice: 500000, currentPrice: 480000, quantity: 4, fee: 1600, tax: 0 },
    { id: "10", name: "삼성SDI", code: "006400", purchasePrice: 410000, currentPrice: 430000, quantity: 6, fee: 1400, tax: 2800 },
    { id: "11", name: "카카오뱅크", code: "323410", purchasePrice: 28000, currentPrice: 30000, quantity: 40, fee: 500, tax: 1000 },
    { id: "12", name: "셀트리온", code: "068270", purchasePrice: 185000, currentPrice: 180000, quantity: 12, fee: 900, tax: 0 },
  ]
}

export default function AccountPage() {
  const [holdings, setHoldings] = useState<HoldingItem[]>([])
  const [filteredHoldings, setFilteredHoldings] = useState<HoldingItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")

  // Dashboard Stats
  const [balanceSummary, setBalanceSummary] = useState({
    totalPurchase: 0,
    totalEvaluation: 0,
    totalPnL: 0,
    totalReturnRate: 0,
  })

  // Dummy ATS Stats (Static for now)
  const atsSummary = {
    totalRealizedPnL: 1250000,
    totalBuyAmount: 54000000,
    totalSellAmount: 55250000,
  }

  // Load & Calc Data
  useEffect(() => {
    const data = generateDummyHoldings()
    setHoldings(data)
    setFilteredHoldings(data)

    // Calculate Balance Summary
    const totalPurchase = data.reduce((acc, cur) => acc + (cur.purchasePrice * cur.quantity), 0)
    const totalEvaluation = data.reduce((acc, cur) => acc + (cur.currentPrice * cur.quantity), 0)
    const totalPnL = totalEvaluation - totalPurchase
    const totalReturnRate = totalPurchase > 0 ? (totalPnL / totalPurchase) * 100 : 0

    setBalanceSummary({
      totalPurchase,
      totalEvaluation,
      totalPnL,
      totalReturnRate
    })
  }, [])

  // Filter Logic
  useEffect(() => {
    if (!searchQuery) {
      setFilteredHoldings(holdings)
    } else {
      setFilteredHoldings(holdings.filter(item => 
        item.name.includes(searchQuery) || item.code.includes(searchQuery)
      ))
    }
    setCurrentPage(1)
  }, [searchQuery, holdings])

  // Pagination Logic
  const pageSize = parseInt(itemsPerPage)
  const totalPages = Math.ceil(filteredHoldings.length / pageSize)
  const paginatedData = filteredHoldings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const formatCurrency = (val: number) => Math.floor(val).toLocaleString()

  return (
    <div className="min-h-screen bg-[#f2f4f6] dark:bg-background">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Header & Account Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">잔고</h1>
            <p className="text-muted-foreground mt-1">계좌별 보유 종목 및 수익률 현황</p>
          </div>
          <Card className="px-4 py-2 bg-white dark:bg-card border-l-4 border-l-blue-500 shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">현재 선택된 계좌</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">메인 계좌</span>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">1234567890</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Dashboards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance Summary */}
          <Card className="p-5 rounded-2xl shadow-sm bg-card border-border">
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <Wallet className="w-5 h-5 text-blue-500" />
              <h2 className="font-semibold text-foreground">잔고 요약</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">총 평가손익</span>
                <p className={`text-xl font-bold ${balanceSummary.totalPnL > 0 ? "text-red-500" : "text-blue-500"}`}>
                  {balanceSummary.totalPnL > 0 ? "+" : ""}{formatCurrency(balanceSummary.totalPnL)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">원</span>
                </p>
                <span className={`text-xs ${balanceSummary.totalReturnRate > 0 ? "text-red-500" : "text-blue-500"}`}>
                  ({balanceSummary.totalReturnRate > 0 ? "+" : ""}{balanceSummary.totalReturnRate.toFixed(2)}%)
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">총 매입금액</span>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(balanceSummary.totalPurchase)} <span className="text-sm font-normal text-muted-foreground">원</span>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">총 평가금액</span>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(balanceSummary.totalEvaluation)} <span className="text-sm font-normal text-muted-foreground">원</span>
                </p>
              </div>
            </div>
          </Card>

          {/* ATS Usage Summary */}
          <Card className="p-5 rounded-2xl shadow-sm bg-card border-border">
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <RefreshCw className="w-5 h-5 text-green-500" />
              <h2 className="font-semibold text-foreground">ATS 이용 요약</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">총 손익</span>
                <p className={`text-xl font-bold ${atsSummary.totalRealizedPnL > 0 ? "text-red-500" : "text-blue-500"}`}>
                  {atsSummary.totalRealizedPnL > 0 ? "+" : ""}{formatCurrency(atsSummary.totalRealizedPnL)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">원</span>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">총 매입금액</span>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(atsSummary.totalBuyAmount)} <span className="text-sm font-normal text-muted-foreground">원</span>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">총 매도금액</span>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(atsSummary.totalSellAmount)} <span className="text-sm font-normal text-muted-foreground">원</span>
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Holdings Table Section */}
        <Card className="rounded-xl border-0 shadow-md overflow-hidden bg-card">
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="종목명 / 종목코드 검색" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background" 
              />
            </div>
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
                  <th className="px-4 py-3 whitespace-nowrap">종목명(코드)</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">보유수량</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">매입가</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">현재가</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">평가손익</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">수익률</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">매입금액</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">평가금액</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">수수료</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">세금</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground">
                      보유 중인 종목이 없습니다.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => {
                    const purchaseAmount = item.purchasePrice * item.quantity
                    const evalAmount = item.currentPrice * item.quantity
                    const valPnL = evalAmount - purchaseAmount
                    const profitRate = (valPnL / purchaseAmount) * 100

                    return (
                      <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-xs text-muted-foreground">{item.code}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-foreground">{item.quantity.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-foreground">{item.purchasePrice.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-medium">
                          <span className={item.currentPrice > item.purchasePrice ? "text-red-500" : item.currentPrice < item.purchasePrice ? "text-blue-500" : "text-foreground"}>
                            {item.currentPrice.toLocaleString()}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-right font-bold ${valPnL > 0 ? "text-red-500" : valPnL < 0 ? "text-blue-500" : "text-muted-foreground"}`}>
                          {valPnL > 0 ? "+" : ""}{valPnL.toLocaleString()}
                        </td>
                        <td className={`px-4 py-3 text-right ${profitRate > 0 ? "text-red-500" : profitRate < 0 ? "text-blue-500" : "text-muted-foreground"}`}>
                          {profitRate.toFixed(2)}%
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{purchaseAmount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-foreground font-medium">{evalAmount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{item.fee.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{item.tax.toLocaleString()}</td>
                      </tr>
                    )
                  })
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