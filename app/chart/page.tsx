"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Menu, Search } from "lucide-react"
import Link from "next/link"

const stockList = [
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: false },
]

const newsItems = [
  { title: "거사 예행", sentiment: "보통" },
  { title: "거사 예행", sentiment: "긍정" },
  { title: "자본은", sentiment: "부정" },
]

export default function ChartView() {
  const [autoSell, setAutoSell] = useState(true)

  return (
    <div className="min-h-screen bg-[#f2f4f6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Automated Trading System</h1>
          <div className="flex items-center gap-4">
            <Link href="/history" className="text-sm text-muted-foreground hover:text-foreground">
              거래내역
            </Link>
            <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground">
              설정
            </Link>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:p-6">
        {/* Left Sidebar - Stock List */}
        <div className="lg:col-span-3">
          <Card className="p-4 rounded-2xl">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-lg bg-transparent">
                  실시간
                </Button>
                <Button variant="ghost" className="flex-1 rounded-lg">
                  관심
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="검색" className="pl-10 rounded-lg bg-gray-50 border-0" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">종목명 / 기준시점가 / 등락률</div>
                {stockList.map((stock, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <span className="font-medium">{stock.name}</span>
                    <div className="text-right">
                      <div className="font-semibold">{stock.price}</div>
                      <div className={stock.isUp ? "text-[#E15241] text-sm" : "text-[#2E64D8] text-sm"}>
                        {stock.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Center - Chart and News */}
        <div className="lg:col-span-6 space-y-4">
          {/* Chart Display */}
          <Card className="p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">알자별 시세</h3>
            <p className="text-sm text-muted-foreground mb-4">
              알기쉽게거래량적립식마감이가능하거래량은연속증감MA이며이가능하성적이공급적응할것
            </p>

            {/* Chart Placeholder */}
            <div className="bg-white border rounded-lg p-4 h-80">
              <img src="/korean-stock-candlestick-chart-with-moving-average.jpg" alt="Stock Chart" className="w-full h-full object-contain" />
            </div>
          </Card>

          {/* News Section */}
          <Card className="p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">공룡 뉴스</h3>
            <div className="space-y-3">
              {newsItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.sentiment === "긍정"
                        ? "bg-[#E15241]/10 text-[#E15241]"
                        : item.sentiment === "부정"
                          ? "bg-[#2E64D8]/10 text-[#2E64D8]"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.sentiment}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Trading Panel */}
        <div className="lg:col-span-3">
          <Card className="p-4 rounded-2xl sticky top-4">
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="buy" className="rounded-lg">
                  매수
                </TabsTrigger>
                <TabsTrigger value="sell" className="rounded-lg">
                  매도
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-buy" className="font-medium">
                    자동 매도
                  </Label>
                  <Switch id="auto-buy" />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">옵션</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="option1" />
                      <Label htmlFor="option1" className="text-sm cursor-pointer">
                        옵션
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">옵션</Label>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">구매 가격</Label>
                  <div className="flex gap-2">
                    <Input placeholder="가격" className="rounded-lg" />
                    <span className="flex items-center text-sm">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">구매 개수</Label>
                  <div className="flex gap-2">
                    <Input placeholder="개수" className="rounded-lg" />
                    <span className="flex items-center text-sm">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">내수로 매</Label>
                </div>

                <Button className="w-full rounded-lg bg-[#2E64D8] hover:bg-[#2554B8] text-white">저장</Button>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sell-chart" className="font-medium">
                    자동 매도
                  </Label>
                  <Switch id="auto-sell-chart" checked={autoSell} onCheckedChange={setAutoSell} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">보유량도 매도</Label>
                </div>

                <Button className="w-full rounded-lg bg-[#2E64D8] hover:bg-[#2554B8] text-white">저장</Button>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
