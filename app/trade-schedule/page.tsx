"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const tradeHistory = [
  {
    date: "2026-01-01",
    time: "15:00",
    stock: "Google",
    type: "매수",
    code: "11111",
    volume: 1,
    shares: 3,
    price: "10,000",
    option: "ALL",
    condition: "Y",
    profit: null,
  },
  {
    date: "2026-01-01",
    time: "15:00",
    stock: "현대",
    type: "매수",
    code: "22222",
    volume: 1,
    shares: 1,
    price: "20,000",
    option: "2",
    condition: "Y",
    profit: null,
  },
  {
    date: "2026-01-01",
    time: "15:00",
    stock: "Samsung",
    type: "매수",
    code: "33333",
    volume: 1,
    shares: 2,
    price: "30,000",
    option: "Manual(A,B)",
    condition: "N",
    profit: null,
  },
  {
    date: "2025-12-31",
    time: "15:00",
    stock: "Lotte",
    type: "매수",
    code: "44444",
    volume: 1,
    shares: 3,
    price: "40,000",
    option: "Manual(B,C)",
    condition: "N",
    profit: null,
  },
  {
    date: "2025-12-31",
    time: "15:00",
    stock: "Gia",
    type: "매도",
    code: "55555",
    volume: 1,
    shares: 0,
    price: "40,000",
    option: "10 % ▲",
    condition: "",
    profit: "5,000",
  },
  {
    date: "2025-12-31",
    time: "15:00",
    stock: "Apple",
    type: "매도",
    code: "66666",
    volume: 1,
    shares: 1,
    price: "50,000",
    option: "5 % ▲",
    condition: "",
    profit: "40,000",
  },
  {
    date: "2025-12-31",
    time: "15:00",
    stock: "Tiger",
    type: "매도",
    code: "77777",
    volume: 1,
    shares: 4,
    price: "60,000",
    option: "9 % ▼",
    condition: "",
    profit: "10,000",
  },
]

export default function TradeHistory() {
  return (
    <div className="min-h-screen bg-[#f2f4f6]">

      <div className="p-4 lg:p-6">
        <Card className="p-6 rounded-2xl">
          {/* Date Filter */}
          <div className="flex items-center gap-2 mb-6">
            <Input type="text" value="2025-12-01 ~ 2026-01-01" className="max-w-xs rounded-lg" readOnly />
            <Button className="rounded-lg bg-[#2E64D8] hover:bg-[#2554B8] text-white">search</Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium">거래일자</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">시간</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">종목명</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">타입</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">종목코드</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">거래량</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">실은량</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">가격</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">옵션</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">조건</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">이익</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {tradeHistory.map((trade, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{trade.date}</td>
                    <td className="px-4 py-3 text-sm">{trade.time}</td>
                    <td className="px-4 py-3 text-sm font-medium">{trade.stock}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                          trade.type === "매수" ? "bg-[#E15241]/10 text-[#E15241]" : "bg-[#2E64D8]/10 text-[#2E64D8]"
                        }`}
                      >
                        {trade.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{trade.code}</td>
                    <td className="px-4 py-3 text-sm">{trade.volume}</td>
                    <td className="px-4 py-3 text-sm">{trade.shares}</td>
                    <td className="px-4 py-3 text-sm">{trade.price}</td>
                    <td className="px-4 py-3 text-sm">{trade.option}</td>
                    <td className="px-4 py-3 text-sm">{trade.condition}</td>
                    <td className="px-4 py-3 text-sm">
                      {trade.profit && (
                        <span className={trade.profit.includes("-") ? "text-[#2E64D8]" : "text-[#E15241]"}>
                          {trade.profit}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="px-4 py-2 text-sm">1 / 10</div>
            <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
