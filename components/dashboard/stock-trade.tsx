"use client"
import React, {useState} from "react";
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
    const [autoSell, setAutoSell] = useState(false)
    const [buyQuantityType, setBuyQuantityType] = useState<'manual' | 'recommend'>('manual')
    const [buyQuantity, setBuyQuantity] = useState<number>(1)
    const [sellQuantityType, setSellQuantityType] = useState<'manual' | 'all' | 'recommend'>('manual')
    const [sellQuantity, setSellQuantity] = useState<number>(1)
    const [buyCondition, setBuyCondition] = useState<'all' | 'count'>('all')
    const [conditionCount, setConditionCount] = useState<number>(2)
    const [conditions, setConditions] = useState({
        rsi: false,
        macd: false,
        goldenCross: false
    })
    const [rsiValue, setRsiValue] = useState<number>(30)
    
    // 매도 조건 상태
    const [sellConditions, setSellConditions] = useState({
        stopLoss: false,
        takeProfit: false,
        rsi: false,
        deathCross: false
    })
    const [stopLossPercent, setStopLossPercent] = useState<number>(-7)
    const [takeProfitPercent, setTakeProfitPercent] = useState<number>(10)
    const [sellRsiValue, setSellRsiValue] = useState<number>(70)

    const isDisabled = !selectedStock;
    const areConditionsDisabled = isDisabled || buyCondition === 'all';

    const handleConditionCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 3) {
            setConditionCount(value);
        }
    }

    const handleRsiValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 100) {
            setRsiValue(value);
        }
    }

    const handleBuyQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            setBuyQuantity(value);
        }
    }

    const handleSellQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            setSellQuantity(value);
        }
    }

    const handleStopLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value <= 0) {
            setStopLossPercent(value);
        }
    }

    const handleTakeProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 0) {
            setTakeProfitPercent(value);
        }
    }

    const handleSellRsiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 100) {
            setSellRsiValue(value);
        }
    }

    return (
        <>
            <Card className={`p-4 rounded-2xl sticky top-24 ${isDisabled ? 'bg-gray-100 pointer-events-none opacity-60' : ''}`}>
                {isDisabled && (
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-50 z-10 rounded-2xl flex items-center justify-center">
                        <p className="text-gray-500 font-medium">주식을 선택하셔야 자동거래 설정이 가능합니다</p>
                    </div>
                )}

                {/* 선택된 종목 헤더 */}
                <div className="mb-4 pb-3 border-b border-gray-200">
                    <h3 className="font-semibold text-lg text-center">자동 거래</h3>
                    {selectedStock ? (
                        <div className="text-center mt-2">
                            <div className="flex items-center justify-center gap-2">
                                <span className="font-medium text-blue-600">
                                    {selectedStock.name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    ({selectedStock.code})
                                </span>
                                {selectedStock.favorite_yn === "y" && (
                                    <span className="text-yellow-500">⭐</span>
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                                {selectedStock.price.toLocaleString()}원
                                <span className={`ml-2 ${
                                    selectedStock.change > 0 ? 'text-red-500' : 
                                    selectedStock.change < 0 ? 'text-blue-500' : 'text-muted-foreground'
                                }`}>
                                    ({selectedStock.change > 0 ? '+' : ''}{selectedStock.changePercent}%)
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center mt-2">
                            종목을 선택하면 자동거래 설정이 가능합니다
                        </p>
                    )}
                </div>

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
                            <Label htmlFor="auto-buy" className="font-medium">
                                자동매수
                            </Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">OFF</span>
                                <Switch
                                    id="auto-buy"
                                    checked={autoBuy}
                                    onCheckedChange={setAutoBuy}
                                    disabled={isDisabled}
                                />
                                <span className="text-sm text-muted-foreground">ON</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium mb-2 block">수량</Label>
                                <div className="flex gap-2 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => setBuyQuantityType('manual')}
                                        disabled={isDisabled}
                                        className={`px-3 py-1 text-xs rounded transition-colors ${
                                            buyQuantityType === 'manual' 
                                                ? 'bg-[#2E64D8] text-white' 
                                                : 'bg-gray-200 text-gray-600'
                                        } ${isDisabled ? 'opacity-50' : ''}`}
                                    >
                                        직접입력
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setBuyQuantityType('recommend')}
                                        disabled={isDisabled}
                                        className={`px-3 py-1 text-xs rounded transition-colors ${
                                            buyQuantityType === 'recommend' 
                                                ? 'bg-[#2E64D8] text-white' 
                                                : 'bg-gray-200 text-gray-600'
                                        } ${isDisabled ? 'opacity-50' : ''}`}
                                    >
                                        추천
                                    </button>
                                </div>
                                {buyQuantityType === 'manual' && (
                                    <Input
                                        type="number"
                                        min="1"
                                        value={buyQuantity}
                                        onChange={handleBuyQuantityChange}
                                        placeholder="1"
                                        className="rounded-lg"
                                        disabled={isDisabled}
                                    />
                                )}
                            </div>
                        </div>

                        {/* 매수 조건 섹션 - 개선된 가시성 */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <Label className="text-base font-semibold text-blue-800">매수 조건</Label>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-3 border border-blue-100 shadow-sm">
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                id="all-conditions"
                                                name="buyCondition"
                                                value="all"
                                                checked={buyCondition === 'all'}
                                                onChange={(e) => setBuyCondition(e.target.value as 'all' | 'count')}
                                                disabled={isDisabled}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <Label htmlFor="all-conditions" className="text-sm font-medium cursor-pointer text-gray-700">
                                                전체 조건이 충족했을 때
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                id="count-conditions"
                                                name="buyCondition"
                                                value="count"
                                                checked={buyCondition === 'count'}
                                                onChange={(e) => setBuyCondition(e.target.value as 'all' | 'count')}
                                                disabled={isDisabled}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <Label htmlFor="count-conditions" className="text-sm font-medium cursor-pointer text-gray-700 flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="3"
                                                    value={conditionCount}
                                                    onChange={handleConditionCountChange}
                                                    disabled={isDisabled || buyCondition !== 'count'}
                                                    className="w-16 h-8 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                개 이상의 조건이 충족했을 때
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                <div className={`bg-white rounded-lg p-4 border-2 transition-all duration-200 ${
                                    buyCondition === 'count' && !isDisabled
                                        ? 'border-blue-300 shadow-md' 
                                        : 'border-gray-200 opacity-60'
                                }`}>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Checkbox 
                                                id="rsi-condition" 
                                                checked={conditions.rsi}
                                                onCheckedChange={(checked) => setConditions(prev => ({...prev, rsi: checked as boolean}))}
                                                disabled={areConditionsDisabled} 
                                            />
                                            <Label htmlFor="rsi-condition" className="text-sm font-medium cursor-pointer flex items-center gap-2 text-gray-700">
                                                <span className="text-orange-600 font-medium">RSI가</span>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={rsiValue}
                                                    onChange={handleRsiValueChange}
                                                    disabled={areConditionsDisabled || !conditions.rsi}
                                                    className="w-16 h-8 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                                <span>% 이하일 때</span>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Checkbox 
                                                id="macd-condition" 
                                                checked={conditions.macd}
                                                onCheckedChange={(checked) => setConditions(prev => ({...prev, macd: checked as boolean}))}
                                                disabled={areConditionsDisabled} 
                                            />
                                            <Label htmlFor="macd-condition" className="text-sm font-medium cursor-pointer text-gray-700">
                                                <span className="text-green-600 font-medium">MACD</span> 매수신호가 true일 때
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Checkbox 
                                                id="golden-cross-condition" 
                                                checked={conditions.goldenCross}
                                                onCheckedChange={(checked) => setConditions(prev => ({...prev, goldenCross: checked as boolean}))}
                                                disabled={areConditionsDisabled} 
                                            />
                                            <Label htmlFor="golden-cross-condition" className="text-sm font-medium cursor-pointer text-gray-700">
                                                <span className="text-yellow-600 font-medium">골든크로스</span>에 진입했을 때
                                                <div className="text-xs text-gray-500 mt-1">(SMA 20이 SMA 50보다 위로 올라갔을 때)</div>
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                자동매도
                            </Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">OFF</span>
                                <Switch
                                    id="auto-sell"
                                    checked={autoSell}
                                    onCheckedChange={setAutoSell}
                                    disabled={isDisabled}
                                />
                                <span className="text-sm text-muted-foreground">ON</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium mb-2 block">수량</Label>
                                <div className="flex gap-2 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => setSellQuantityType('manual')}
                                        disabled={isDisabled}
                                        className={`px-3 py-1 text-xs rounded transition-colors ${
                                            sellQuantityType === 'manual' 
                                                ? 'bg-[#2E64D8] text-white' 
                                                : 'bg-gray-200 text-gray-600'
                                        } ${isDisabled ? 'opacity-50' : ''}`}
                                    >
                                        직접입력
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSellQuantityType('all')}
                                        disabled={isDisabled}
                                        className={`px-3 py-1 text-xs rounded transition-colors ${
                                            sellQuantityType === 'all' 
                                                ? 'bg-[#2E64D8] text-white' 
                                                : 'bg-gray-200 text-gray-600'
                                        } ${isDisabled ? 'opacity-50' : ''}`}
                                    >
                                        전체
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSellQuantityType('recommend')}
                                        disabled={isDisabled}
                                        className={`px-3 py-1 text-xs rounded transition-colors ${
                                            sellQuantityType === 'recommend' 
                                                ? 'bg-[#2E64D8] text-white' 
                                                : 'bg-gray-200 text-gray-600'
                                        } ${isDisabled ? 'opacity-50' : ''}`}
                                    >
                                        추천
                                    </button>
                                </div>
                                {sellQuantityType === 'manual' && (
                                    <Input
                                        type="number"
                                        min="1"
                                        value={sellQuantity}
                                        onChange={handleSellQuantityChange}
                                        placeholder="1"
                                        className="rounded-lg"
                                        disabled={isDisabled}
                                    />
                                )}
                            </div>

                            {/* 매도 조건 섹션 - 개선된 가시성 */}
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <Label className="text-base font-semibold text-red-800">매도 조건</Label>
                                </div>
                                
                                <div className="bg-white rounded-lg p-4 border border-red-100 shadow-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-red-50 border border-red-200">
                                            <Checkbox 
                                                id="stop-loss-condition" 
                                                checked={sellConditions.stopLoss}
                                                onCheckedChange={(checked) => setSellConditions(prev => ({...prev, stopLoss: checked as boolean}))}
                                                disabled={isDisabled} 
                                            />
                                            <Label htmlFor="stop-loss-condition" className="text-sm font-medium cursor-pointer flex items-center gap-2 text-gray-700">
                                                <span>구매 가격보다</span>
                                                <Input
                                                    type="number"
                                                    max="0"
                                                    value={stopLossPercent}
                                                    onChange={handleStopLossChange}
                                                    disabled={isDisabled || !sellConditions.stopLoss}
                                                    className="w-20 h-8 border-red-300 focus:border-red-500 focus:ring-red-500"
                                                    placeholder="-7"
                                                />
                                                <span>% 떨어졌을 때</span>
                                                <span className="text-red-600 font-medium">(손절)</span>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                                            <Checkbox 
                                                id="take-profit-condition" 
                                                checked={sellConditions.takeProfit}
                                                onCheckedChange={(checked) => setSellConditions(prev => ({...prev, takeProfit: checked as boolean}))}
                                                disabled={isDisabled} 
                                            />
                                            <Label htmlFor="take-profit-condition" className="text-sm font-medium cursor-pointer flex items-center gap-2 text-gray-700">
                                                <span>구매 가격보다</span>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={takeProfitPercent}
                                                    onChange={handleTakeProfitChange}
                                                    disabled={isDisabled || !sellConditions.takeProfit}
                                                    className="w-20 h-8 border-green-300 focus:border-green-500 focus:ring-green-500"
                                                    placeholder="10"
                                                />
                                                <span>% 올랐을 때</span>
                                                <span className="text-green-600 font-medium">(이익)</span>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                                            <Checkbox 
                                                id="sell-rsi-condition" 
                                                checked={sellConditions.rsi}
                                                onCheckedChange={(checked) => setSellConditions(prev => ({...prev, rsi: checked as boolean}))}
                                                disabled={isDisabled} 
                                            />
                                            <Label htmlFor="sell-rsi-condition" className="text-sm font-medium cursor-pointer flex items-center gap-2 text-gray-700">
                                                <span className="text-orange-600 font-medium">RSI가</span>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={sellRsiValue}
                                                    onChange={handleSellRsiChange}
                                                    disabled={isDisabled || !sellConditions.rsi}
                                                    className="w-16 h-8 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                                                    placeholder="70"
                                                />
                                                <span>% 이상일 때</span>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                                            <Checkbox 
                                                id="death-cross-condition" 
                                                checked={sellConditions.deathCross}
                                                onCheckedChange={(checked) => setSellConditions(prev => ({...prev, deathCross: checked as boolean}))}
                                                disabled={isDisabled} 
                                            />
                                            <Label htmlFor="death-cross-condition" className="text-sm font-medium cursor-pointer text-gray-700">
                                                <span className="text-purple-600 font-medium">데스크로스</span>에 진입했을 때
                                                <div className="text-xs text-gray-500 mt-1">(SMA 20이 SMA 50보다 아래로 내려갔을 때)</div>
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
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