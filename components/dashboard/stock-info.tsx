
"use client"

import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Stock} from "@/components/dashboard/stock";
import {StockClear} from "@/components/dashboard/stock-clear";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useState, useEffect} from "react";

interface StockInfoProps {
    selectedStock?: Stock | null;
    onClearSelection?: () => void;
    onStockUpdate?: (updatedStock: Stock) => void; // 주식 정보 업데이트 콜백
}

export function StockInfo({ selectedStock, onClearSelection, onStockUpdate }: StockInfoProps) {
    const [localStock, setLocalStock] = useState<Stock | null>(null);

    // selectedStock이 변경될 때 localStock 업데이트
    useEffect(() => {
        setLocalStock(selectedStock || null);
    }, [selectedStock]);

    const displayStock = localStock || {
        name: "종목을 선택하세요",
        code: "000000",
        price: 0,
        marketCap: 0
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('별 클릭됨', localStock); // 디버깅용

        if (localStock) {
            const updatedStock = {
                ...localStock,
                favorite_yn: localStock.favorite_yn === "y" ? "n" : "y"
            };

            console.log('업데이트된 주식:', updatedStock); // 디버깅용

            setLocalStock(updatedStock);

            // 부모 컴포넌트에 업데이트된 주식 정보 전달
            if (onStockUpdate) {
                onStockUpdate(updatedStock);
            }

            // 로컬 스토리지 업데이트
            try {
                localStorage.setItem('selectedStock', JSON.stringify(updatedStock));
            } catch (error) {
                console.error('로컬 스토리지 저장 실패:', error);
            }

            // 커스텀 이벤트 발생
            try {
                window.dispatchEvent(new CustomEvent('stockUpdated', {
                    detail: updatedStock
                }));
            } catch (error) {
                console.error('커스텀 이벤트 발생 실패:', error);
            }
        }
    };

    return (
        <TooltipProvider>
            <Card className="p-6 rounded-2xl">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold flex items-center">
                                {displayStock.name}
                                {localStock && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                onClick={handleFavoriteClick}
                                                className="ml-2 text-xl hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                                                aria-label={localStock.favorite_yn === "y" ? "관심 종목에서 제거" : "관심 종목으로 추가"}
                                            >
                                                {localStock.favorite_yn === "y" ? (
                                                    <span className="text-yellow-500">⭐</span>
                                                ) : (
                                                    <span className="text-gray-300 dark:text-gray-600 hover:text-yellow-500 transition-colors">☆</span>
                                                )}
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                {localStock.favorite_yn === "y"
                                                    ? "관심 종목에서 제거"
                                                    : "클릭하면 관심 종목이 되며 자동 거래 설정이 가능합니다"
                                                }
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </h2>
                            <span className="text-lg text-muted-foreground">({displayStock.code})</span>
                        </div>

                        {/* 공통 ClearButton 사용 */}
                        {localStock && onClearSelection && (
                            <StockClear
                                onClear={onClearSelection}
                                variant="outline"
                                size="sm"
                            >
                                선택 해제 ✕
                            </StockClear>
                        )}

                    </div>

                    {localStock && (
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold">
                                {localStock.price.toLocaleString()}원
                            </span>
                            <span className={`text-lg font-medium ${
                                localStock.change > 0 ? 'text-red-500' :
                                    localStock.change < 0 ? 'text-blue-500' : 'text-muted-foreground'
                            }`}>
                                {localStock.change > 0 ? '+' : ''}{localStock.change.toLocaleString()}
                                ({localStock.changePercent > 0 ? '+' : ''}{localStock.changePercent}%)
                            </span>
                        </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                        {localStock ? (
                            <>
                                시가총액 {localStock.marketCap.toLocaleString()}억원
                                <br />
                                거래량 {localStock.volume.toLocaleString()}주
                            </>
                        ) : (
                            "좌측에서 종목을 선택하면 상세 정보가 표시됩니다."
                        )}
                    </p>
                </div>
            </Card>
        </TooltipProvider>
    )
}