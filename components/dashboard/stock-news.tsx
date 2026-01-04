"use client"
import { Card } from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Stock} from "@/components/dashboard/stock";

interface StockNewsProps {
    selectedStock?: Stock | null;
}

const newsItems = [
    {
        title: "긴 헤드라인, 경영체제 공약하는 좀 롱한 발당션 간제",
        description:
            "2건이로.COM은 새월 즐 2천 3.2억~5억+가격과 매진.세안구아 온올2천 효과할포이번가 발이(사.가) 동무청으로 1월 5일+연관수정으로 거교호토 TA-7체계올 조...",
        category: "헤드...TF7서머스",
        time: "17분전",
        image: "/business-building.jpg",
    },
    {
        title: "긴 헤드라인, 경영체제 공약하는 좀 롱한 발당션 간제",
        description:
            "2건이로.COM은 새월 즐 2천 3.2억~5억+가격과 매진.세안구아 온올2천 효과할포이번가 발이(사.가) 동무청으로 1월 5일+연관수정으로 거교호토 TA-7체계올 조...",
        category: "헤드...TF7서머스",
        time: "17분전",
        image: "/financial-chart.png",
    },
    {
        title: "긴 헤드라인스(OMER), VARTEMLE가 상팔 - TA-TMA 시로점 위한 발당 항 등명앞 공화",
        description:
            "스캐코스OM은 후 대+CRO등.COM)는 도 VARTEMLA시가 추전화크ㅌㅏ TMA 시로체올을 위란 발당창 컬락고로도 시+ 229내 전수 2남애간에서의 신점아2025.",
        category: "헤드...서정도",
        time: "2시간전",
        image: "/data-technology.jpg",
    },
]

export function StockNews({ selectedStock }: StockNewsProps) {
    const stockName = selectedStock?.name || "선택된 종목";

    return(
        <>
            <Card className="p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                        {selectedStock ? `${stockName} 관련 뉴스` : "관련 뉴스"}
                    </h3>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-sm">
                            최신순
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                            인기순
                        </Button>
                    </div>
                </div>

                {!selectedStock ? (
                    <div className="text-center text-gray-500 py-8">
                        종목을 선택하면 관련 뉴스가 표시됩니다.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {newsItems.map((news, idx) => (
                            <div
                                key={idx}
                                className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                            >
                                <div className="flex-1 space-y-2">
                                    <h4 className="font-medium text-sm leading-snug">
                                        [{selectedStock.name}] {news.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{news.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{news.category}</span>
                                        <span>•</span>
                                        <span>{news.time}</span>
                                    </div>
                                </div>
                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </>
    )
}