"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Stock } from "@/components/dashboard/stock"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface TradeResultProps {
  stock: Stock & {
    tradeStatus: string
    quantity: number
    targetPrice: number
    failReason?: string
    rsi: number
    macd: string
  }
}

export function TradeResult({ stock }: TradeResultProps) {
  const renderContent = () => {
    switch (stock.tradeStatus) {
      case "매매완료":
        return (
          <div className="flex flex-col items-center text-center space-y-4 p-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">거래 완료</h3>
              <p className="text-muted-foreground leading-relaxed">
                2026-01-06 09:00에<br />
                <span className="font-medium text-foreground">{stock.quantity}주</span> 시장가{" "}
                <span className="font-medium text-foreground">{stock.targetPrice.toLocaleString()}원</span>에<br />
                거래 완료 되었습니다.
              </p>
            </div>
          </div>
        )
      case "매매실패":
        return (
          <div className="flex flex-col items-center text-center space-y-4 p-4">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">거래 실패</h3>
              <div className="text-muted-foreground space-y-2">
                <p>시간: 09:00</p>
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    {stock.failReason || "알 수 없는 오류"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      case "조건미달":
        return (
          <div className="flex flex-col items-center text-center space-y-4 p-4">
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">조건 미달</h3>
              <div className="text-left bg-muted/50 p-4 rounded-lg space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  RSI가 {stock.rsi} 이상입니다. (기준: 40)
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  MACD 매수신호가 False 입니다.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  골든크로스에 진입하지 못했습니다.
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="h-full bg-card p-6 flex items-center justify-center">
        {renderContent()}
    </Card>
  )
}
