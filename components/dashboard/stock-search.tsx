
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {Stock} from "@/components/dashboard/stock";
import {StockClear} from "@/components/dashboard/stock-clear";

type CategoryType = "popular" | "trending" | "volume" | "market-cap" | "favorite";

// 더미 데이터는 기존과 동일...
const dummyStockData = {
    popular: [
        { id: "1", name: "삼성전자", code: "005930", price: 71500, change: 1500, changePercent: 2.14, volume: 12500000, marketCap: 4280000, favorite_yn: "y" },
        { id: "2", name: "SK하이닉스", code: "000660", price: 128500, change: -2500, changePercent: -1.91, volume: 8200000, marketCap: 934000, favorite_yn: "n" },
        { id: "3", name: "NAVER", code: "035420", price: 185000, change: 3000, changePercent: 1.65, volume: 1850000, marketCap: 304000, favorite_yn: "y" },
        { id: "4", name: "카카오", code: "035720", price: 48500, change: -1000, changePercent: -2.02, volume: 4500000, marketCap: 215000, favorite_yn: "n" },
        { id: "5", name: "LG화학", code: "051910", price: 412000, change: 8000, changePercent: 1.98, volume: 950000, marketCap: 291000, favorite_yn: "n" },
    ],
    trending: [
        { id: "6", name: "에코프로", code: "086520", price: 85400, change: 12500, changePercent: 17.14, volume: 3200000, marketCap: 125000, favorite_yn: "y" },
        { id: "7", name: "에코프로비엠", code: "247540", price: 195000, change: 28000, changePercent: 16.77, volume: 2100000, marketCap: 189000, favorite_yn: "n" },
        { id: "8", name: "포스코DX", code: "022100", price: 62800, change: 8200, changePercent: 15.02, volume: 1850000, marketCap: 95000, favorite_yn: "y" },
        { id: "9", name: "SK아이이테크놀로지", code: "361610", price: 135000, change: 16500, changePercent: 13.92, volume: 1400000, marketCap: 178000, favorite_yn: "n" },
        { id: "10", name: "리튬포어스", code: "073570", price: 45600, change: 5400, changePercent: 13.43, volume: 2800000, marketCap: 65000, favorite_yn: "n" },
    ],
    volume: [
        { id: "1", name: "삼성전자", code: "005930", price: 71500, change: 1500, changePercent: 2.14, volume: 25500000, marketCap: 4280000, favorite_yn: "y" },
        { id: "11", name: "셀트리온", code: "068270", price: 185500, change: 2500, changePercent: 1.37, volume: 18200000, marketCap: 251000, favorite_yn: "n" },
        { id: "12", name: "현대차", code: "005380", price: 189000, change: -3000, changePercent: -1.56, volume: 16800000, marketCap: 405000, favorite_yn: "y" },
        { id: "13", name: "기아", code: "000270", price: 89500, change: 1200, changePercent: 1.36, volume: 15200000, marketCap: 351000, favorite_yn: "n" },
        { id: "14", name: "LG전자", code: "066570", price: 112500, change: -1500, changePercent: -1.32, volume: 14500000, marketCap: 158000, favorite_yn: "n" },
    ],
    "market-cap": [
        { id: "1", name: "삼성전자", code: "005930", price: 71500, change: 1500, changePercent: 2.14, volume: 12500000, marketCap: 4280000, favorite_yn: "y" },
        { id: "15", name: "SK하이닉스", code: "000660", price: 128500, change: -2500, changePercent: -1.91, volume: 8200000, marketCap: 934000, favorite_yn: "n" },
        { id: "16", name: "현대차", code: "005380", price: 189000, change: -3000, changePercent: -1.56, volume: 16800000, marketCap: 405000, favorite_yn: "y" },
        { id: "17", name: "기아", code: "000270", price: 89500, change: 1200, changePercent: 1.36, volume: 15200000, marketCap: 351000, favorite_yn: "n" },
        { id: "18", name: "NAVER", code: "035420", price: 185000, change: 3000, changePercent: 1.65, volume: 1850000, marketCap: 304000, favorite_yn: "y" },
    ],
    favorite: [
        { id: "19", name: "삼성전자", code: "005930", price: 71500, change: 1500, changePercent: 2.14, volume: 12500000, marketCap: 4280000, favorite_yn: "y" },
        { id: "20", name: "SK하이닉스", code: "000660", price: 128500, change: -2500, changePercent: -1.91, volume: 8200000, marketCap: 934000, favorite_yn: "y" },
        { id: "21", name: "현대차", code: "005380", price: 189000, change: -3000, changePercent: -1.56, volume: 16800000, marketCap: 405000, favorite_yn: "y" },
        { id: "22", name: "기아", code: "000270", price: 89500, change: 1200, changePercent: 1.36, volume: 15200000, marketCap: 351000, favorite_yn: "y" },
        { id: "23", name: "NAVER", code: "035420", price: 185000, change: 3000, changePercent: 1.65, volume: 1850000, marketCap: 304000, favorite_yn: "y" },
    ]
};

interface StockSearchProps {
    onStockSelect?: (stock: Stock) => void;
    onClearSelection?: () => void;
    selectedStock?: Stock | null; // 부모 컴포넌트의 selectedStock을 받아옴
}

export function StockSearch({ onStockSelect, onClearSelection, selectedStock }: StockSearchProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>("popular");
    const [stockList, setStockList] = useState<Stock[]>(dummyStockData.popular);
    const [filteredStockList, setFilteredStockList] = useState<Stock[]>(dummyStockData.popular);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStockId, setSelectedStockId] = useState<string | null>(null);

    // 부모 컴포넌트의 selectedStock 변화에 따라 selectedStockId 동기화
    useEffect(() => {
        if (selectedStock) {
            setSelectedStockId(selectedStock.id);
        } else {
            setSelectedStockId(null);
        }
    }, [selectedStock]);

    // 카테고리 변경 시 stockList 업데이트
    useEffect(() => {
        const newStockList = dummyStockData[selectedCategory];
        setStockList(newStockList);
        setFilteredStockList(newStockList);
        setSearchQuery(""); // 카테고리 변경시 검색어 초기화
        // selectedStockId는 유지 (부모 컴포넌트와 동기화되도록)
    }, [selectedCategory]);

    // 검색어 변경 시 필터링
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredStockList(stockList);
        } else {
            const filtered = stockList.filter(stock =>
                stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stock.code.includes(searchQuery)
            );
            setFilteredStockList(filtered);
        }
        // 검색 시에는 선택된 종목 유지
    }, [searchQuery, stockList]);

    const handleCategoryChange = (value: CategoryType) => {
        setSelectedCategory(value);
        console.log("Selected category:", value);
    };

    const handleStockClick = (stock: Stock) => {
        setSelectedStockId(stock.id);
        console.log("Selected stock:", stock);

        // 다른 페이지에서 사용할 수 있도록 데이터 전송
        if (onStockSelect) {
            onStockSelect(stock);
        }

        // 전역 상태나 로컬스토리지에 저장
        localStorage.setItem('selectedStock', JSON.stringify(stock));

        // 커스텀 이벤트 발생 (다른 컴포넌트에서 리스닝 가능)
        window.dispatchEvent(new CustomEvent('stockSelected', {
            detail: stock
        }));
    };

    const handleClearSelection = () => {
        setSelectedStockId(null);
        if (onClearSelection) {
            onClearSelection();
        }
    };

    const handleClearStockItem = (e?: React.MouseEvent, stockId?: string) => {
        if (e) {
            e.stopPropagation(); // 카드 클릭 이벤트 방지
        }
        if (stockId && selectedStockId === stockId) {
            handleClearSelection();
        }
    };

    return (
        <Card className="p-6 rounded-2xl">
            <div className="space-y-4">
                {/* 헤더 영역 - 우상단에 선택 해제 버튼 추가 */}
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">종목 검색</h3>
                    {selectedStockId && onClearSelection && (
                        <StockClear
                            onClear={handleClearSelection}
                            variant="ghost"
                            size="sm"
                        />
                    )}
                </div>

                {/* Select 드롭다운 */}
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full rounded-lg bg-transparent">
                        <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="popular">실시간 인기 종목</SelectItem>
                        <SelectItem value="trending">급상승 종목</SelectItem>
                        <SelectItem value="volume">거래량 상위</SelectItem>
                        <SelectItem value="market-cap">시가총액 상위</SelectItem>
                        <SelectItem value="favorite">관심 종목</SelectItem>
                    </SelectContent>
                </Select>

                {/* 검색 입력 영역 */}
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="종목명 또는 종목코드로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg bg-transparent"
                    />
                    {searchQuery && (
                        <StockClear
                            onClear={() => setSearchQuery("")}
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
                        />
                    )}
                </div>

                {/* 검색 결과 표시 */}
                {searchQuery && (
                    <div className="text-sm text-muted-foreground">
                        검색 결과: {filteredStockList.length}개
                    </div>
                )}

                {/* Stock List 표시 */}
                <div className="space-y-2">
                    {filteredStockList.length === 0 ? (
                        <div className="text-center text-muted-foreground py-4">
                            검색 결과가 없습니다.
                        </div>
                    ) : (
                        filteredStockList.map((stock) => (
                            <div
                                key={stock.id}
                                onClick={() => handleStockClick(stock)}
                                className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 relative ${
                                    stock.favorite_yn === "y" ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700" : "bg-card"
                                } ${
                                    selectedStockId === stock.id
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md ring-2 ring-blue-200 dark:ring-blue-700"
                                        : "hover:bg-accent hover:shadow-sm"
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className={`font-medium ${selectedStockId === stock.id ? 'text-blue-700 dark:text-blue-300 font-semibold' : 'text-foreground'}`}>
                                            {stock.name}
                                            {stock.favorite_yn === "y" && (
                                                <span className="ml-2 text-yellow-500">⭐</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">{stock.code}</div>
                                    </div>
                                    <div className="text-right relative">
                                        {/* 선택된 종목일 때만 우측 가격 영역에 동그란 X 버튼 표시 */}
                                        {selectedStockId === stock.id && (
                                            <div className="absolute -top-1 -right-1 z-10">
                                                <StockClear
                                                    onClear={(e) => handleClearStockItem(e, stock.id)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-5 w-5 p-0 rounded-full bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-sm min-w-0"
                                                >
                                                    <span className="text-xs">✕</span>
                                                </StockClear>
                                            </div>
                                        )}

                                        <div className={`font-medium ${selectedStockId === stock.id ? 'text-blue-700 dark:text-blue-300 font-semibold' : 'text-foreground'}`}>
                                            {stock.price.toLocaleString()}원
                                        </div>
                                        <div className={`text-sm ${stock.change > 0 ? 'text-red-500' : stock.change < 0 ? 'text-blue-500' : 'text-muted-foreground'}`}>
                                            {stock.change > 0 ? '+' : ''}{stock.change.toLocaleString()} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent}%)
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    거래량: {stock.volume.toLocaleString()} | 시가총액: {stock.marketCap.toLocaleString()}억
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Card>
    );
}