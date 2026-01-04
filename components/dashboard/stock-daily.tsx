
"use client"
import { Card } from "@/components/ui/card";
import {Stock} from "@/components/dashboard/stock";

interface StockDailyProps {
    selectedStock?: Stock | null;
}

// 오늘부터 역순으로 50개의 데이터 생성
const generateDailyData = (stockPrice = 125000) => {
    const data = [];
    const today = new Date();

    for (let i = 0; i < 50; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        // 주말 건너뛰기 (토요일: 6, 일요일: 0)
        while (date.getDay() === 0 || date.getDay() === 6) {
            date.setDate(date.getDate() - 1);
        }

        const formatDate = `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

        // 선택된 종목의 가격을 기반으로 데이터 생성
        const basePrice = stockPrice + (Math.random() - 0.5) * (stockPrice * 0.1);
        const changeRate = (Math.random() - 0.5) * 10;
        const isUp = changeRate > 0;
        const volume = Math.floor(Math.random() * 80000000) + 10000000;
        const amount = (volume * basePrice / 1000000000000).toFixed(1);

        const openPrice = basePrice + (Math.random() - 0.5) * (stockPrice * 0.05);
        const highPrice = Math.max(basePrice, openPrice) + Math.random() * (stockPrice * 0.03);
        const lowPrice = Math.min(basePrice, openPrice) - Math.random() * (stockPrice * 0.03);

        const macd = Math.floor(Math.random() * 50);
        const rsi = Math.floor(Math.random() * 100);

        const individualChange = (Math.random() - 0.5) * 5000000;
        const foreignChange = (Math.random() - 0.5) * 6000000;
        const institutionChange = (Math.random() - 0.5) * 2000000;

        data.push({
            date: formatDate,
            closePrice: `${Math.floor(basePrice).toLocaleString()}원`,
            changeRate: `${isUp ? '+' : ''}${changeRate.toFixed(2)}%`,
            isUp,
            volume: Math.floor(volume).toLocaleString(),
            amount: `${amount}조원`,
            openPrice: `${Math.floor(openPrice).toLocaleString()}원`,
            highPrice: `${Math.floor(highPrice).toLocaleString()}원`,
            lowPrice: `${Math.floor(lowPrice).toLocaleString()}원`,
            macd: macd.toString(),
            rsi: `${rsi}%`,
            individual: `${individualChange > 0 ? '+' : ''}${Math.floor(individualChange).toLocaleString()}`,
            individualIsUp: individualChange > 0,
            foreign: `${foreignChange > 0 ? '+' : ''}${Math.floor(foreignChange).toLocaleString()}`,
            foreignIsUp: foreignChange > 0,
            institution: `${institutionChange > 0 ? '+' : ''}${Math.floor(institutionChange).toLocaleString()}`,
            institutionIsUp: institutionChange > 0,
        });
    }

    return data;
};

export function StockDaily({ selectedStock }: StockDailyProps) {
    const dailyData = generateDailyData(selectedStock?.price || 125000);
    const stockName = selectedStock?.name || "선택된 종목";

    return (
        <>
            <Card className="p-6 rounded-2xl">
                <h3 className="font-semibold">
                    {selectedStock ? `${stockName} 일자별 시세` : "일자별 시세"}
                </h3>

                {!selectedStock ? (
                    <div className="text-center text-muted-foreground py-8">
                        종목을 선택하면 일자별 시세가 표시됩니다.
                    </div>
                ) : (
                    <div className="overflow-x-auto max-h-80 overflow-y-auto">
                        <table className="w-full text-xs min-w-max">
                            <thead className="sticky top-0 bg-card z-10">
                            <tr className="bg-muted/50">
                                <th className="px-3 py-2 text-left font-medium whitespace-nowrap min-w-[60px]">일자</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[80px]">종가</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[70px]">등락률</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[100px]">거래량(주)</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[80px]">거래대금</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[80px]">시가</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[80px]">고가</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[80px]">저가</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[60px]">MACD</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[60px]">RSI</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[80px]">개인</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[80px]">외국인</th>
                                <th className="px-3 py-2 text-right font-medium whitespace-nowrap min-w-[80px]">기관</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dailyData.map((data, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-border hover:bg-muted/30 transition-colors ${
                                        index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                                    }`}
                                >
                                    <td className="px-3 py-2 whitespace-nowrap text-foreground">{data.date}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap text-foreground">{data.closePrice}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap">
                        <span className={data.isUp ? "text-red-500" : "text-blue-500"}>
                            {data.changeRate}
                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap text-foreground">{data.volume}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap text-foreground">{data.amount}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap text-foreground">{data.openPrice}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap text-foreground">{data.highPrice}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap text-foreground">{data.lowPrice}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap text-foreground">{data.macd}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap text-foreground">{data.rsi}</td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap">
                        <span className={data.individualIsUp ? "text-red-500" : "text-blue-500"}>
                            {data.individual}
                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap">
                        <span className={data.foreignIsUp ? "text-red-500" : "text-blue-500"}>
                            {data.foreign}
                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-right whitespace-nowrap">
                        <span className={data.institutionIsUp ? "text-red-500" : "text-blue-500"}>
                            {data.institution}
                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </>
    )
}