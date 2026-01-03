"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import Image from "next/image"

const alphabeticalStocks = [
  [
    "A증목",
    "B증목",
    "C증목",
    "D증목",
    "E증목",
    "F증목",
    "G증목",
    "H증목",
    "I증목",
    "J증목",
    "K증목",
    "L증목",
    "M증목",
    "N증목",
    "O증목",
  ],
  [
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
  ],
  ["10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%"],
  [
    "P증목",
    "Q증목",
    "R증목",
    "S증목",
    "T증목",
    "U증목",
    "V증목",
    "W증목",
    "X증목",
    "Y증목",
    "Z증목",
    "가증목",
    "나증목",
    "다증목",
    "라증목",
  ],
  [
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
  ],
  ["10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%"],
  [
    "마증목",
    "바증목",
    "사증목",
    "아증목",
    "자증목",
    "차증목",
    "카증목",
    "타증목",
    "파증목",
    "하증목",
    "AA증목",
    "AB증목",
    "AC증목",
    "AD증목",
    "AE증목",
  ],
  [
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
    "10,000",
  ],
  ["10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%"],
  [
    "AF증목",
    "AG증목",
    "AH증목",
    "AI증목",
    "AJ증목",
    "AK증목",
    "AL증목",
    "AM증목",
    "AN증목",
    "AO증목",
    "AP증목",
    "AQ증목",
    "AR증목",
    "AS증목",
    "AT증목",
  ],
]

const newsItems = [
  {
    title: "긴 헤드라인, 경영체제 공약하는 좀 롱한 발당션 간제",
    description:
      "2건이로.COM은 새월 즐 2천 3.2억~5억+가격과 매진.세안구아 온올2천 효과할포이번가 발이(사.가) 동무청으로 1월 5일+연관수정으로 거교호토 TA-7체계올 조...",
    category: "헤드...TF7서머스",
    time: "17분전",
    image: "/business-building.jpg",
  },
  {
    title: "긴 헤드라인, 경영체제 공약하는 좀 롱한 발당션 간제",
    description:
      "2건이로.COM은 새월 즐 2천 3.2억~5억+가격과 매진.세안구아 온올2천 효과할포이번가 발이(사.가) 동무청으로 1월 5일+연관수정으로 거교호토 TA-7체계올 조...",
    category: "헤드...TF7서머스",
    time: "17분전",
    image: "/financial-chart.png",
  },
  {
    title: "긴 헤드라인스(OMER), VARTEMLE가 상팔 - TA-TMA 시로점 위한 발당 항 등명앞 공화",
    description:
      "스캐코스OM은 후 대+CRO등.COM)는 도 VARTEMLA시가 추전화크ㅌㅏ TMA 시로체올을 위란 발당창 컬락고로도 시+ 229내 전수 2남애간에서의 신점아2025.",
    category: "헤드...서정도",
    time: "2시간전",
    image: "/data-technology.jpg",
  },
]

const stockList = [
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: true },
  { name: "A종목", price: "10,000", change: "10%", isUp: false },
]

export default function TradingDashboard() {
  const [autoTrade, setAutoTrade] = useState(false)
  const [autoBuy, setAutoBuy] = useState(false)
  const [autoSell, setAutoSell] = useState(true)

  return (
    <div className="min-h-screen bg-[#f2f4f6]">
      {/* Header */}

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
                  관심2
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

        {/* Center - Market Data */}
        <div className="lg:col-span-6 space-y-4">
          {/* Stock Header */}
          <Card className="p-6 rounded-2xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">종목명, 종목코드</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                기업 설명
                <br />
                시가 총액 XXX억원, 실제기업가치 XX조
              </p>
              <p className="text-xs text-muted-foreground">상장일 XXXX년 XX월 XX일 발행주식수 XXX,XXX</p>
            </div>
          </Card>

          {/* Investment Indicators */}
          <Card className="p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">투자 지표</h3>
            <div className="text-xs text-muted-foreground mb-3">16:05 기준</div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">PER (배)</span>
                  <span className="font-semibold">8.484</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">PSR (배)</span>
                  <span className="font-semibold">0.0배</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">PBR (배)</span>
                  <span className="font-semibold">0.8배</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">EPS</span>
                  <span className="font-semibold">14,927원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">BPS</span>
                  <span className="font-semibold">164,568원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ROE</span>
                  <span className="font-semibold">9.9%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">최근</span>
                <span className="font-semibold">3천</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">주당 배당금</span>
                <span className="font-semibold">연 3,568원</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">수익률 (%)</span>
                <span className="font-semibold">연 2.86%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">알자별 시세</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <tbody>
                  {alphabeticalStocks.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 3 === 0 ? "border-t border-gray-200" : ""}>
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`py-2 px-1 text-center ${
                            rowIdx % 3 === 0
                              ? "font-medium"
                              : rowIdx % 3 === 2
                                ? cellIdx % 2 === 0
                                  ? "text-[#E15241]"
                                  : "text-[#2E64D8]"
                                : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">일자별 시세</h3>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                알기쉽게거래량적립식마감이가능하거래량은연속증감MACD이며이가능하성적이공급적응할것 거래비가 거량
              </div>

              {/* Chart Image */}
              <div className="relative w-full aspect-[16/9] bg-white rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="/korean-stock-candlestick-chart-with-moving-average.jpg"
                  alt="일자별 시세 차트"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">오늘은 뉴스</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-sm">
                  최신순
                </Button>
                <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                  인기순
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {newsItems.map((news, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                >
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-sm leading-snug">{news.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{news.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{news.category}</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                  </div>
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
                  <Label htmlFor="auto-trade" className="font-medium">
                    자동 매수
                  </Label>
                  <Switch id="auto-trade" checked={autoBuy} onCheckedChange={setAutoBuy} />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">수량</Label>
                  <Input placeholder="" className="rounded-lg" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">옵션</Label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="condition1" />
                    <Label htmlFor="condition1" className="text-sm cursor-pointer">
                      전체 조건 충족시
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="condition2" />
                    <Label htmlFor="condition2" className="text-sm cursor-pointer">
                      2개이상 조건 충족시
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="condition3" checked />
                    <Label htmlFor="condition3" className="text-sm cursor-pointer">
                      수동 조건 충족시
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="golden" />
                    <Label htmlFor="golden" className="text-sm cursor-pointer">
                      골드 크로스
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="macd" />
                    <Label htmlFor="macd" className="text-sm cursor-pointer">
                      MACD 매크로스토
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rsi" />
                    <Label htmlFor="rsi" className="text-sm cursor-pointer">
                      RSI 신호
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">보유일때도 매수</Label>
                </div>

                <Button className="w-full rounded-lg bg-[#2E64D8] hover:bg-[#2554B8] text-white">저장</Button>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sell" className="font-medium">
                    자동 매도
                  </Label>
                  <Switch id="auto-sell" checked={autoSell} onCheckedChange={setAutoSell} />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">옵션</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="stop-loss" checked />
                      <Label htmlFor="stop-loss" className="text-sm cursor-pointer">
                        손절 조건 출시
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="take-profit" checked />
                      <Label htmlFor="take-profit" className="text-sm cursor-pointer">
                        수익 조건 출시
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">손절 가격(%)</Label>
                  <div className="flex gap-2">
                    <Input placeholder="2%" className="rounded-lg" />
                  </div>
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
