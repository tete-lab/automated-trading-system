"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Menu } from "lucide-react"
import Link from "next/link"

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#f2f4f6]">
      <div className="p-4 lg:p-6 max-w-2xl mx-auto">
        <Card className="p-8 rounded-2xl">
          <div className="space-y-6">

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="trade-lock" className="text-lg font-semibold">
                  거래 Lock
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">OFF</span>
                  <Switch id="trade-lock" />
                  <span className="text-sm text-muted-foreground">ON</span>
                </div>
              </div>
              <p className="text-xs text-red-500">(ON 일 때, 자동 거래가 중지됩니다.)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sell-rsi" className="text-lg font-semibold">
                매도 기본 RSI 값
              </Label>
              <p className="text-xs text-red-500">매도 조건에서 기술적 지표의 기본값은 RSI 70 이상 입니다.</p>
              <Input 
                id="sell-rsi" 
                type="number" 
                placeholder="예: 70" 
                className="rounded-lg text-base" 
              />

            </div>

            <div className="space-y-2">
              <Label htmlFor="buy-rsi" className="text-lg font-semibold">
                매수 기본 RSI 값
              </Label>
              <p className="text-xs text-red-500">매수 조건에서 기술적 지표의 기본값은 RSI 30 이하 입니다.</p>
              <Input 
                id="buy-rsi" 
                type="number" 
                placeholder="예: 30" 
                className="rounded-lg text-base" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kiwoom-app-key" className="text-lg font-semibold">
                키움 App Key
              </Label>
              <Input 
                id="kiwoom-app-key" 
                type="password" 
                placeholder="키움 App Key를 입력해주세요" 
                className="rounded-lg text-base" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kiwoom-secret-key" className="text-lg font-semibold">
                키움 Secret Key
              </Label>
              <Input 
                id="kiwoom-secret-key" 
                type="password" 
                placeholder="키움 Secret Key를 입력해주세요" 
                className="rounded-lg text-base" 
              />
            </div>

            <Button className="w-full rounded-lg bg-[#2E64D8] hover:bg-[#2554B8] text-white py-6 text-base">
              저장
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}