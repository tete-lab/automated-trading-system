"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

// API 응답 상태 타입
type ApiResponseStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApiResponse {
  status: ApiResponseStatus;
  message?: string;
  data?: any;
  error?: string;
}

export default function SuperSettings() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [yahooApiKey, setYahooApiKey] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<ApiResponse>({ status: 'idle' });

  // 오늘 날짜를 yyyy-mm-dd 형식으로 포맷
  const formatDateForDisplay = (date: Date) => {
    return format(date, "yyyy년 MM월 dd일", { locale: ko });
  };

  const formatDateForApi = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  // Yahoo Finance API Key 저장
  const handleSaveApiKey = async () => {
    if (!yahooApiKey.trim()) {
      setApiResponse({
        status: 'error',
        error: 'API Key를 입력해주세요.',
      });
      return;
    }

    setApiResponse({ status: 'loading' });
    
    try {
      // API Key 저장 로직 (실제 API 호출)
      const response = await fetch('/api/settings/yahoo-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: yahooApiKey }),
      });

      if (response.ok) {
        setApiResponse({
          status: 'success',
          message: 'Yahoo Finance API Key가 성공적으로 저장되었습니다.',
        });
      } else {
        const errorData = await response.json();
        setApiResponse({
          status: 'error',
          error: errorData.message || 'API Key 저장에 실패했습니다.',
        });
      }
    } catch (error) {
      setApiResponse({
        status: 'error',
        error: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
      });
    }
  };

  // 일자별 데이터 가져오기
  const handleFetchData = async () => {
    if (startDate > endDate) {
      setApiResponse({
        status: 'error',
        error: '시작일이 종료일보다 늦을 수 없습니다.',
      });
      return;
    }

    if (!yahooApiKey.trim()) {
      setApiResponse({
        status: 'error',
        error: 'Yahoo Finance API Key를 먼저 등록해주세요.',
      });
      return;
    }

    setApiResponse({ status: 'loading' });

    try {
      // 일자별 데이터 가져오기 API 호출
      const response = await fetch('/api/data/fetch-daily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: formatDateForApi(startDate),
          endDate: formatDateForApi(endDate),
          apiKey: yahooApiKey,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setApiResponse({
          status: 'success',
          message: `데이터를 성공적으로 가져왔습니다. (${responseData.recordCount || 0}개 레코드)`,
          data: responseData,
        });
      } else {
        setApiResponse({
          status: 'error',
          error: responseData.message || '데이터 가져오기에 실패했습니다.',
        });
      }
    } catch (error) {
      setApiResponse({
        status: 'error',
        error: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
      });
    }
  };

  // 결과 상태에 따른 아이콘과 스타일
  const getStatusIcon = () => {
    switch (apiResponse.status) {
      case 'loading':
        return <AlertCircle className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (apiResponse.status) {
      case 'loading':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4f6]">
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">마스터 설정</h1>
          <p className="text-muted-foreground mt-1">시스템 고급 설정 및 데이터 관리</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 설정 영역 */}
          <div className="lg:col-span-2">
            <Card className="p-6 rounded-2xl">
              <div className="space-y-6">
                {/* Yahoo Finance API Key */}
                <div className="space-y-3">
                  <Label htmlFor="yahoo-api-key" className="text-lg font-semibold">
                    Yahoo Finance API Key
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    주식 데이터를 가져오기 위한 Yahoo Finance API Key를 등록해주세요.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      id="yahoo-api-key"
                      type="password"
                      placeholder="Yahoo Finance API Key를 입력해주세요"
                      value={yahooApiKey}
                      onChange={(e) => setYahooApiKey(e.target.value)}
                      className="rounded-lg text-base flex-1"
                    />
                    <Button
                      onClick={handleSaveApiKey}
                      disabled={apiResponse.status === 'loading'}
                      className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      {apiResponse.status === 'loading' ? '저장중...' : '저장'}
                    </Button>
                  </div>
                </div>

                {/* 일자별 데이터 가져오기 */}
                <div className="space-y-3 border-t pt-6">
                  <Label className="text-lg font-semibold">
                    일자별 데이터 가져오기
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    지정된 기간의 주식 데이터를 Yahoo Finance에서 가져옵니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 시작일 */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">시작일</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal rounded-lg"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatDateForDisplay(startDate)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date) => date && setStartDate(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* 종료일 */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">종료일</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal rounded-lg"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatDateForDisplay(endDate)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(date) => date && setEndDate(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <Button
                    onClick={handleFetchData}
                    disabled={apiResponse.status === 'loading'}
                    className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white py-3 text-base"
                  >
                    {apiResponse.status === 'loading' ? '데이터 가져오는 중...' : '데이터 가져오기'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* 결과 영역 */}
          <div className="lg:col-span-1">
            <Card className="p-6 rounded-2xl h-fit">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">실행 결과</Label>
                
                {apiResponse.status === 'idle' ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">작업을 실행하면 결과가 여기에 표시됩니다.</p>
                  </div>
                ) : (
                  <div className={`rounded-lg border p-4 ${getStatusColor()}`}>
                    <div className="flex items-start gap-3">
                      {getStatusIcon()}
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {apiResponse.status === 'loading' && '작업 진행중'}
                          {apiResponse.status === 'success' && '성공'}
                          {apiResponse.status === 'error' && '오류 발생'}
                        </div>
                        
                        <div className="text-sm mt-1">
                          {apiResponse.message && (
                            <p>{apiResponse.message}</p>
                          )}
                          {apiResponse.error && (
                            <p>{apiResponse.error}</p>
                          )}
                        </div>

                        {/* 성공 시 추가 정보 표시 */}
                        {apiResponse.status === 'success' && apiResponse.data && (
                          <div className="mt-3 text-xs bg-white/50 rounded p-2">
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(apiResponse.data, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 현재 설정된 기간 표시 */}
                <div className="text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800 rounded p-3">
                  <p className="font-medium mb-1">설정된 기간:</p>
                  <p>{formatDateForApi(startDate)} ~ {formatDateForApi(endDate)}</p>
                  <p className="mt-1">
                    총 {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1)}일
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}