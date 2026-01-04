
"use client"
import {useState} from "react";
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Stock} from "@/components/dashboard/stock";


interface StockTradeProps {
    selectedStock?: Stock | null;
}

export function StockTrade({ selectedStock }: StockTradeProps) {
    const [autoTrade, setAutoTrade] = useState(false)
    const [autoBuy, setAutoBuy] = useState(false)
    const [autoSell, setAutoSell] = useState(true)
    const [stockBuyCount, setStockBuyCount] = useState(false)

    const isDisabled = !selectedStock || selectedStock.favorite_yn !== "y";

    return (
        <>
            <Card className={`p-4 rounded-2xl sticky top-24 ${isDisabled ? 'bg-gray-100 pointer-events-none opacity-60' : ''}`}>
                {isDisabled && (
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-50 z-10 rounded-2xl flex items-center justify-center">
                        <p className="text-gray-500 font-medium">관심주식만 자동거래 설정이 가능합니다</p>
                    </div>
                )}

                <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="buy" className="rounded-lg" disabled={isDisabled}>
                            매수
                        </TabsTrigger>
                        <TabsTrigger value="sell" className="rounded-lg" disabled={isDisabled}>
                            매도
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="auto-trade" className="font-medium">
                                자동 매수
                            </Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">OFF</span>
                                <Switch
                                    id="auto-trade"
                                    checked={autoBuy}
                                    onCheckedChange={setAutoBuy}
                                    disabled={isDisabled}
                                />
                                <span className="text-sm text-muted-foreground">ON</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="auto-trade" className="text-sm font-medium">
                                수량
                            </Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">수동입력</span>
                                <Switch
                                    id="auto-trade"
                                    checked={stockBuyCount}
                                    onCheckedChange={setStockBuyCount}
                                    disabled={isDisabled}
                                />
                                <span className="text-sm text-muted-foreground">자동계산</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Input
                                placeholder=""
                                className="rounded-lg"
                                aria-placeholder={"수량을 입력해주세요"}
                                disabled={isDisabled}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">옵션</Label>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="condition1" disabled={isDisabled} />
                                <Label htmlFor="condition1" className="text-sm cursor-pointer">
                                    전체 조건 충족시
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="condition2" disabled={isDisabled} />
                                <Label htmlFor="condition2" className="text-sm cursor-pointer">
                                    2개이상 조건 충족시
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="condition3" checked disabled={isDisabled} />
                                <Label htmlFor="condition3" className="text-sm cursor-pointer">
                                    수동 조건 충족시
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="golden" disabled={isDisabled} />
                                <Label htmlFor="golden" className="text-sm cursor-pointer">
                                    골드 크로스
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="macd" disabled={isDisabled} />
                                <Label htmlFor="macd" className="text-sm cursor-pointer">
                                    MACD 매크로스토
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="rsi" disabled={isDisabled} />
                                <Label htmlFor="rsi" className="text-sm cursor-pointer">
                                    RSI 신호
                                </Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm">보유일때도 매수</Label>
                        </div>

                        <Button
                            className="w-full rounded-lg bg-[#2E64D8] hover:bg-[#2554B8] text-white"
                            disabled={isDisabled}
                        >
                            저장
                        </Button>
                    </TabsContent>

                    <TabsContent value="sell" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="auto-sell" className="font-medium">
                                자동 매도
                            </Label>
                            <Switch
                                id="auto-sell"
                                checked={autoSell}
                                onCheckedChange={setAutoSell}
                                disabled={isDisabled}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-sm font-medium">옵션</Label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="stop-loss" checked disabled={isDisabled} />
                                    <Label htmlFor="stop-loss" className="text-sm cursor-pointer">
                                        손절 조건 출시
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="take-profit" checked disabled={isDisabled} />
                                    <Label htmlFor="take-profit" className="text-sm cursor-pointer">
                                        수익 조건 출시
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">손절 가격(%)</Label>
                            <div className="flex gap-2">
                                <Input placeholder="2%" className="rounded-lg" disabled={isDisabled} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">보유량도 매도</Label>
                        </div>

                        <Button
                            className="w-full rounded-lg bg-[#2E64D8] hover:bg-[#2554B8] text-white"
                            disabled={isDisabled}
                        >
                            저장
                        </Button>
                    </TabsContent>
                </Tabs>
            </Card>
        </>
    )
}