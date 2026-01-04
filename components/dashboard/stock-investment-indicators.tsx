"use client"
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {Stock} from "@/components/dashboard/stock";
interface InvestmentIndicatorsProps {
    selectedStock?: Stock | null;
}

export function StockInvestmentIndicators({ selectedStock }: InvestmentIndicatorsProps) {
    return (
        <>
            <Card className="p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">투자 지표</h3>
                    <div className="text-xs text-muted-foreground">16:05 기준</div>
                </div>
                {!selectedStock ? (
                    <div className="text-center text-gray-500 py-8">
                        종목을 선택하면 투자별 지표가 표시됩니다.
                    </div>
                ) : (
                    <TooltipProvider>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">PER (배)</span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                                <p className="text-xs leading-relaxed">
                                                    주가수익비율 - 주가를 주당순이익으로 나눈 값으로, 주식이 얼마나 비싸게 거래되고 있는지를 나타냅니다.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                    <span className="font-semibold">8.484</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">PSR (배)</span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                                <p className="text-xs leading-relaxed">
                                                    주가수익비율 - 주가를 주당순이익으로 나눈 값으로, 주식이 얼마나 비싸게 거래되고 있는지를 나타냅니다.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                    <span className="font-semibold">0.0배</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">PBR (배)</span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                                <p className="text-xs leading-relaxed">
                                                    주가수익비율 - 주가를 주당순이익으로 나눈 값으로, 주식이 얼마나 비싸게 거래되고 있는지를 나타냅니다.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                    <span className="font-semibold">0.8배</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">EPS</span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                                <p className="text-xs leading-relaxed">
                                                    주가수익비율 - 주가를 주당순이익으로 나눈 값으로, 주식이 얼마나 비싸게 거래되고 있는지를 나타냅니다.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                    <span className="font-semibold">14,927원</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">BPS</span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                                <p className="text-xs leading-relaxed">
                                                    주가수익비율 - 주가를 주당순이익으로 나눈 값으로, 주식이 얼마나 비싸게 거래되고 있는지를 나타냅니다.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                    <span className="font-semibold">164,568원</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-muted-foreground">ROE</span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs">
                                                <p className="text-xs leading-relaxed">
                                                    주가수익비율 - 주가를 주당순이익으로 나눈 값으로, 주식이 얼마나 비싸게 거래되고 있는지를 나타냅니다.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                    <span className="font-semibold">9.9%</span>
                                </div>
                            </div>
                        </div>
                    </TooltipProvider>
                )}
            </Card>
            <Card className="p-6 rounded-2xl">
                {!selectedStock ? (
                    <div className="text-center text-gray-500 py-8">
                        종목을 선택하면 배당 지표가 표시됩니다.
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">배당</h3>
                            <div className="text-xs text-muted-foreground">16:05 기준</div>
                        </div>
                        <div className="border-t border-gray-100 space-y-2">
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
                    </div>
                )}
            </Card>
        </>
    )
}