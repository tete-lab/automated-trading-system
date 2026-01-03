"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Menu } from "lucide-react"
import Link from "next/link"

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#f2f4f6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Automated Trading System</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              대시보드
            </Link>
            <Link href="/history" className="text-sm text-muted-foreground hover:text-foreground">
              거래내역
            </Link>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 max-w-2xl mx-auto">
        <Card className="p-8 rounded-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-lg font-semibold">
                기존 Key :
              </Label>
              <Input id="api-key" type="text" defaultValue="asd1dcx12dad2" className="rounded-lg text-base" />
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
