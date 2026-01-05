"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  CrosshairMode,
  CandlestickSeries,
  LineSeries,
  HistogramSeries, // 거래량용
  LineType         // 곡선형 설정을 위해 필요
} from "lightweight-charts";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {Stock} from "@/components/dashboard/stock";

interface StockDailyProps {
  selectedStock?: Stock | null;
}

export function StockGraph({ selectedStock }: StockDailyProps){

  const stockName = selectedStock?.name || "선택된 종목";

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [showTooltip, setShowTooltip] = useState(true); //기본 툴팁
  const [showEma, setShowEma] = useState(false); //ema 12, 26선
  const [showSma, setShowSma] = useState(false); //sma20, 50 선
  const [showVolume, setShowVolume] = useState(false); //거래량

  const chartRef = useRef<any>(null);
  const candlestickSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);
  const ema12Ref = useRef<any>(null);
  const ema26Ref = useRef<any>(null);
  const sma20Ref = useRef<any>(null);
  const sma50Ref = useRef<any>(null);
  const showTooltipRef = useRef(showTooltip);

  useEffect(() => { showTooltipRef.current = showTooltip; }, [showTooltip]);

  // 지표 가시성 제어 (확대 상태 유지)
  useEffect(() => {
    ema12Ref.current?.applyOptions({ visible: showEma });
    ema26Ref.current?.applyOptions({ visible: showEma });
  }, [showEma]);

  useEffect(() => {
    sma20Ref.current?.applyOptions({ visible: showSma });
    sma50Ref.current?.applyOptions({ visible: showSma });
  }, [showSma]);

  useEffect(() => {
    volumeSeriesRef.current?.applyOptions({ visible: showVolume });
  }, [showVolume]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: "transparent" }, textColor: "#333" },
      width: chartContainerRef.current.clientWidth,
      height: 500, // 거래량이 추가되어 높이를 조금 키움
      grid: { vertLines: { visible: false }, horzLines: { color: "#f0f0f0" } },
      crosshair: { mode: CrosshairMode.Normal },
      // 오른쪽 가격축 외에 거래량용 축 설정
      rightPriceScale: {
        scaleMargins: { top: 0.1, bottom: 0.25 }, // 주가 차트 영역
        borderVisible: false,
      },
    });
    chartRef.current = chart;

    // 1. 캔들스틱 시리즈
    candlestickSeriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: "#ef5350", downColor: "#26a69a", borderVisible: false, wickUpColor: "#ef5350", wickDownColor: "#26a69a",
    });

    // 2. 거래량 시리즈 (Histogram)
    volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
      color: "#E5E7EB",
      priceFormat: { type: "volume" },
      priceScaleId: "", // 별도 스케일 사용
      visible: false, // 초기 숨김
    });

    // 거래량 축의 위치를 차트 하단 20% 지점에 배치
    chart.priceScale("").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    // 3. 곡선형 이동평균선 (lineType: LineType.Curved 추가)
    const lineOptions = { lineWidth: 2, lineType: LineType.Curved, visible:false};

    // @ts-ignore
    ema12Ref.current = chart.addSeries(LineSeries, { ...lineOptions, color: "#FF6B35" });
    // @ts-ignore
    ema26Ref.current = chart.addSeries(LineSeries, { ...lineOptions, color: "#F7931E" });
    // @ts-ignore
    sma20Ref.current = chart.addSeries(LineSeries, { ...lineOptions, color: "#4BC0C0", lineStyle: 2 });
    // @ts-ignore
    sma50Ref.current = chart.addSeries(LineSeries, { ...lineOptions, color: "#9B59B6", lineStyle: 2 });

    // PDF 기반 정제 데이터 + 거래량(value) 추가
    const dummyData = [
      // 2025년 10월 데이터
      { time: "2025-10-30", open: 101700, high: 105800, low: 100700, close: 104300, volume: 58920995 }, // [cite: 10]
      { time: "2025-10-31", open: 109200, high: 109200, low: 101500, close: 107700, volume: 79465688 }, // [cite: 10]

      // 2025년 11월 데이터
      { time: "2025-11-03", open: 105500, high: 111500, low: 105500, close: 111300, volume: 51153623 }, //
      { time: "2025-11-04", open: 111500, high: 113400, low: 102100, close: 104200, volume: 57975690 }, //
      { time: "2025-11-05", open: 103500, high: 103800, low: 96700, close: 100300, volume: 81789273 },  //
      { time: "2025-11-06", open: 101600, high: 104700, low: 98800, close: 99600, volume: 47976118 },   //
      { time: "2025-11-07", open: 97800, high: 100300, low: 94000, close: 97500, volume: 40533295 },    //
      { time: "2025-11-10", open: 98000, high: 101300, low: 97700, close: 101300, volume: 37426697 },   //
      { time: "2025-11-11", open: 103200, high: 106000, low: 102000, close: 104100, volume: 45942879 }, //
      { time: "2025-11-12", open: 104000, high: 104300, low: 101600, close: 103900, volume: 29288027 }, //
      { time: "2025-11-13", open: 102500, high: 104200, low: 102300, close: 102600, volume: 27930989 }, //
      { time: "2025-11-14", open: 100400, high: 100900, low: 97000, close: 97500, volume: 36940812 },   //
      { time: "2025-11-17", open: 99000, high: 101000, low: 98600, close: 100200, volume: 26710103 },   //
      { time: "2025-11-18", open: 98600, high: 100900, low: 97500, close: 98100, volume: 26900751 },    //
      { time: "2025-11-19", open: 97700, high: 97900, low: 94600, close: 97700, volume: 29310533 },     //
      { time: "2025-11-20", open: 99400, high: 102900, low: 99100, close: 101400, volume: 40559094 },   //
      { time: "2025-11-21", open: 97400, high: 98100, low: 93500, close: 94400, volume: 40958515 },     //
      { time: "2025-11-24", open: 96700, high: 99000, low: 95700, close: 97000, volume: 42828059 },     //
      { time: "2025-11-25", open: 98800, high: 101500, low: 97800, close: 98700, volume: 28150998 },    //
      { time: "2025-11-26", open: 100100, high: 103200, low: 99300, close: 103100, volume: 35637269 },  //
      { time: "2025-11-27", open: 104300, high: 105500, low: 102700, close: 103400, volume: 28679291 }, //
      { time: "2025-11-28", open: 103500, high: 103800, low: 100500, close: 101500, volume: 23409549 }, //

      // 2025년 12월 데이터
      { time: "2025-12-01", open: 101500, high: 102800, low: 99900, close: 100600, volume: 18061869 },  //
      { time: "2025-12-02", open: 101000, high: 104000, low: 100800, close: 104000, volume: 21321056 }, //
      { time: "2025-12-03", open: 104300, high: 105500, low: 103900, close: 104700, volume: 23745599 }, //
      { time: "2025-12-04", open: 104000, high: 105300, low: 102000, close: 104900, volume: 19390830 }, //
      { time: "2025-12-05", open: 104700, high: 108400, low: 104300, close: 108200, volume: 30906604 }, //
      { time: "2025-12-08", open: 111500, high: 112000, low: 108000, close: 109500, volume: 25145683 }, //
      { time: "2025-12-09", open: 107500, high: 110600, low: 107300, close: 108400, volume: 20936599 }, //
      { time: "2025-12-10", open: 108400, high: 109800, low: 107400, close: 108500, volume: 20201909 }, //
      { time: "2025-12-11", open: 108700, high: 110500, low: 107300, close: 107700, volume: 33736537 }, //
      { time: "2025-12-12", open: 107300, high: 108900, low: 106100, close: 108500, volume: 20527997 }, //
      { time: "2025-12-15", open: 106200, high: 106400, low: 104600, close: 105600, volume: 31033350 }, //
      { time: "2025-12-16", open: 105800, high: 105800, low: 102700, close: 103400, volume: 26066595 }, //
      { time: "2025-12-17", open: 103500, high: 108200, low: 103300, close: 108100, volume: 11651979 }, //
      { time: "2025-12-18", open: 104400, high: 109300, low: 104400, close: 108100, volume: 3006672 },  //
      { time: "2025-12-19", open: 108900, high: 109800, low: 106200, close: 106600, volume: 35835103 }, //
      { time: "2025-12-22", open: 108500, high: 110700, low: 108300, close: 110700, volume: 38723282 }, //
      { time: "2025-12-23", open: 111000, high: 112500, low: 110400, close: 111500, volume: 30330158 }, //
      { time: "2025-12-24", open: 112000, high: 112500, low: 110900, close: 111300, volume: 18266922 }, //
      { time: "2025-12-26", open: 112000, high: 117100, low: 111600, close: 117000, volume: 49719900 }, //
      { time: "2025-12-29", open: 117300, high: 120300, low: 116000, close: 118800, volume: 33785290 }, //
      { time: "2025-12-30", open: 119400, high: 121200, low: 118700, close: 120400, volume: 27688959 }, //

      // 2026년 1월 데이터
      { time: "2026-01-02", open: 120200, high: 129600, low: 120000, close: 129300, volume: 42351732 }  //
    ];

    candlestickSeriesRef.current.setData(dummyData);

    // 거래량 데이터 매핑 (가격 상승 시 빨강, 하락 시 파랑/회색 처리 가능)
    volumeSeriesRef.current.setData(dummyData.map(d => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? "rgba(239, 83, 80, 0.3)" : "rgba(38, 166, 154, 0.3)"
    })));

    // 이평선 데이터 매핑 (곡선형 적용)
    ema12Ref.current.setData(dummyData.map(d => ({ time: d.time, value: d.close * 1.01 })));
    ema26Ref.current.setData(dummyData.map(d => ({ time: d.time, value: d.close * 1.02 })));
    sma20Ref.current.setData(dummyData.map(d => ({ time: d.time, value: d.close * 0.98 })));
    sma50Ref.current.setData(dummyData.map(d => ({ time: d.time, value: d.close * 0.97 })));

    // 툴팁 로직 (거래량 정보 포함)
    chart.subscribeCrosshairMove((param) => {
      const tooltip = tooltipRef.current;
      if (!tooltip || !chartContainerRef.current) return;

      if (!showTooltipRef.current || !param.point || !param.time) {
        tooltip.style.display = "none";
      } else {
        const data = param.seriesData.get(candlestickSeriesRef.current) as any;
        const volData = param.seriesData.get(volumeSeriesRef.current) as any;
        if (data) {
          tooltip.style.display = "block";
          tooltip.innerHTML = `
            <div style="color: #666; font-size: 11px; margin-bottom: 4px;">일자: ${data.time}</div>
            <div style="display: grid; grid-template-columns: 40px 1fr; gap: 4px; font-size: 12px;">
              <span style="color: #888">시가</span> <span style="font-weight: bold">${data.open.toLocaleString()}</span>
              <span style="color: #ef5350">고가</span> <span style="font-weight: bold; color: #ef5350">${data.high.toLocaleString()}</span>
              <span style="color: #26a69a">저가</span> <span style="font-weight: bold; color: #26a69a">${data.low.toLocaleString()}</span>
              <span style="color: #333">종가</span> <span style="font-weight: bold">${data.close.toLocaleString()}</span>
              <span style="color: #888; border-top: 1px solid #eee; padding-top: 4px;">거래</span> 
              <span style="font-weight: bold; border-top: 1px solid #eee; padding-top: 4px;">${volData?.value.toLocaleString() ?? "-"}</span>
            </div>
          `;
          let left = param.point.x + 15;
          if (left > chartContainerRef.current.clientWidth - 150) left = param.point.x - 140;
          tooltip.style.left = left + "px";
          tooltip.style.top = param.point.y + 15 + "px";
        }
      }
    });

    const handleResize = () => chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
      <Card className="p-6 rounded-2xl relative shadow-sm border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-semibold tracking-tight ">일자별 시세 차트</h3>
            <p className="text-xs text-muted-foreground mt-1">{selectedStock ? `${stockName} 가 선택 되었습니다.` : '종목을 선택하세요'}</p>
          </div>

          {/* 컨트롤 패널 */}
          <div className="flex flex-wrap gap-4 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
            <div className="flex items-center space-x-2 px-2">
              <Switch id="vol-mode" checked={showVolume} onCheckedChange={setShowVolume} />
              <Label htmlFor="vol-mode" className="text-xs font-medium cursor-pointer">거래량</Label>
            </div>
            <div className="flex items-center space-x-2 px-2 border-l border-slate-200">
              <Switch id="ema-mode" checked={showEma} onCheckedChange={setShowEma} />
              <Label htmlFor="ema-mode" className="text-xs font-medium cursor-pointer text-[#FF6B35]">EMA</Label>
            </div>
            <div className="flex items-center space-x-2 px-2 border-l border-slate-200">
              <Switch id="sma-mode" checked={showSma} onCheckedChange={setShowSma} />
              <Label htmlFor="sma-mode" className="text-xs font-medium cursor-pointer text-[#4BC0C0]">SMA</Label>
            </div>
            <div className="flex items-center space-x-2 px-2 border-l border-slate-200">
              <Switch id="tooltip-mode" checked={showTooltip} onCheckedChange={setShowTooltip} />
              <Label htmlFor="tooltip-mode" className="text-xs font-medium cursor-pointer">상세툴팁</Label>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div ref={chartContainerRef} className="w-full bg-white rounded-xl" style={{ minHeight: "500px" }} />
          <div ref={tooltipRef} className="absolute hidden z-50 p-3 bg-white/98 backdrop-blur-md border border-slate-200 rounded-lg shadow-2xl pointer-events-none" style={{ width: "140px" }} />
        </div>
      </Card>
  );
}