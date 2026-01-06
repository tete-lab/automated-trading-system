
"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash2, Edit2, RotateCcw } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
}

export default function Settings() {
  const [tradeLock, setTradeLock] = useState(false);
  const [sellRsi, setSellRsi] = useState<number>(70);
  const [buyRsi, setBuyRsi] = useState<number>(30);
  const [kiwoomAppKey, setKiwoomAppKey] = useState<string>("");
  const [kiwoomSecretKey, setKiwoomSecretKey] = useState<string>("");

  // 계좌 관련 상태
  const [newAccountNumber, setNewAccountNumber] = useState<string>("");
  const [newAccountName, setNewAccountName] = useState<string>("");
  const [newEndDate, setNewEndDate] = useState<Date>(new Date());
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      accountNumber: "1234567890",
      accountName: "메인 계좌",
      endDate: new Date("2025-12-31"),
      isActive: true,
      createdAt: new Date("2024-01-01")
    },
    {
      id: "2",
      accountNumber: "0987654321",
      accountName: "서브 계좌",
      endDate: new Date("2025-06-30"),
      isActive: false,
      createdAt: new Date("2024-06-01")
    }
  ]);
  const [editingAccount, setEditingAccount] = useState<string | null>(null);

  // 날짜 포맷 함수
  const formatDateForDisplay = (date: Date) => {
    return format(date, "yyyy년 MM월 dd일", { locale: ko });
  };

  const formatDateForApi = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  // 폼 초기화
  const handleResetForm = () => {
    setNewAccountNumber("");
    setNewAccountName("");
    setNewEndDate(new Date());
  };

  // 계좌 선택 (왼쪽 폼에 데이터 채우기)
  const handleAccountClick = (account: Account) => {
    setNewAccountNumber(account.accountNumber);
    setNewAccountName(account.accountName);
    setNewEndDate(account.endDate);
  };

  // 계좌 추가
  const handleAddAccount = () => {
    if (!newAccountNumber.trim() || !newAccountName.trim()) {
      alert("계좌번호와 계좌명을 모두 입력해주세요.");
      return;
    }

    const newAccount: Account = {
      id: Date.now().toString(),
      accountNumber: newAccountNumber.trim(),
      accountName: newAccountName.trim(),
      endDate: newEndDate,
      isActive: true,
      createdAt: new Date()
    };

    setAccounts(prev => [...prev, newAccount]);
    handleResetForm();
  };

  // 계좌 삭제
  const handleDeleteAccount = (accountId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    if (confirm("정말로 이 계좌를 삭제하시겠습니까?")) {
      setAccounts(prev => prev.filter(account => account.id !== accountId));
      if (newAccountNumber === accounts.find(a => a.id === accountId)?.accountNumber) {
        handleResetForm();
      }
    }
  };

  // 계좌 활성화/비활성화 토글
  const handleToggleAccount = (accountId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    setAccounts(prev =>
        prev.map(account =>
            account.id === accountId
                ? { ...account, isActive: !account.isActive }
                : account
        )
    );
  };

  // 계좌 수정
  const handleEditAccount = (accountId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    setEditingAccount(accountId);
  };

  const handleSaveEdit = (accountId: string, updatedData: Partial<Account>) => {
    setAccounts(prev =>
        prev.map(account =>
            account.id === accountId
                ? { ...account, ...updatedData }
                : account
        )
    );
    setEditingAccount(null);
  };

  // 전체 설정 저장
  const handleSaveSettings = () => {
    const settingsData = {
      tradeLock,
      sellRsi,
      buyRsi,
      kiwoomAppKey,
      kiwoomSecretKey,
      accounts
    };

    console.log("Settings to save:", settingsData);
    alert("설정이 저장되었습니다.");
  };

  return (
      <div className="min-h-screen bg-[#f2f4f6]">
        <div className="p-4 lg:p-6 max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">설정</h1>
            <p className="text-muted-foreground mt-1">계좌 및 키움 API 등록</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 기본 설정 영역 */}
            <div className="lg:col-span-2">
              <Card className="p-6 rounded-2xl">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="trade-lock" className="text-lg font-semibold">
                        거래 Lock
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">OFF</span>
                        <Switch
                            id="trade-lock"
                            checked={tradeLock}
                            onCheckedChange={setTradeLock}
                        />
                        <span className="text-sm text-muted-foreground">ON</span>
                      </div>
                    </div>
                    <p className="text-xs text-red-500">(ON 일 때, 자동 거래가 중지됩니다.)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sell-rsi" className="text-lg font-semibold">
                      매도 기본 RSI 값
                    </Label>
                    <p className="text-xs text-red-500">매도 조건에서 기술적 지표의 기본값은 RSI 70 이상 입니다.</p>
                    <Input
                        id="sell-rsi"
                        type="number"
                        placeholder="예: 70"
                        value={sellRsi}
                        onChange={(e) => setSellRsi(Number(e.target.value))}
                        className="rounded-lg text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buy-rsi" className="text-lg font-semibold">
                      매수 기본 RSI 값
                    </Label>
                    <p className="text-xs text-red-500">매수 조건에서 기술적 지표의 기본값은 RSI 30 이하 입니다.</p>
                    <Input
                        id="buy-rsi"
                        type="number"
                        placeholder="예: 30"
                        value={buyRsi}
                        onChange={(e) => setBuyRsi(Number(e.target.value))}
                        className="rounded-lg text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kiwoom-app-key" className="text-lg font-semibold">
                      키움 App Key
                    </Label>
                    <Input
                        id="kiwoom-app-key"
                        type="password"
                        placeholder="키움 App Key를 입력해주세요"
                        value={kiwoomAppKey}
                        onChange={(e) => setKiwoomAppKey(e.target.value)}
                        className="rounded-lg text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kiwoom-secret-key" className="text-lg font-semibold">
                      키움 Secret Key
                    </Label>
                    <Input
                        id="kiwoom-secret-key"
                        type="password"
                        placeholder="키움 Secret Key를 입력해주세요"
                        value={kiwoomSecretKey}
                        onChange={(e) => setKiwoomSecretKey(e.target.value)}
                        className="rounded-lg text-base"
                    />
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">계좌번호</Label>
                        <Input
                            placeholder="계좌번호를 입력해주세요"
                            value={newAccountNumber}
                            onChange={(e) => setNewAccountNumber(e.target.value)}
                            className="rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">계좌명</Label>
                        <Input
                            placeholder="계좌명을 입력해주세요"
                            value={newAccountName}
                            onChange={(e) => setNewAccountName(e.target.value)}
                            className="rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">종료일</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal rounded-lg"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatDateForDisplay(newEndDate)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                              mode="single"
                              selected={newEndDate}
                              onSelect={(date) => date && setNewEndDate(date)}
                              initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <Button
                      onClick={handleSaveSettings}
                      className="w-full rounded-lg bg-[#2E64D8] hover:bg-[#2554B8] text-white py-6 text-base"
                  >
                    설정 저장
                  </Button>
                </div>
              </Card>
            </div>

            {/* 등록된 계좌 목록 */}
            <div className="lg:col-span-1">
              <Card className="p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="text-lg font-semibold">등록된 계좌</Label>


                      <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleResetForm}
                          className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          title="계좌 입력 초기화"
                      >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </Button>

                    </div>
                    <span className="text-sm text-muted-foreground">
                      총 {accounts.length}개
                    </span>
                  </div>

                  {accounts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">등록된 계좌가 없습니다.</p>
                      </div>
                  ) : (
                      <div className="space-y-3">
                        {accounts.map((account) => (
                            <Card 
                                key={account.id} 
                                onClick={() => handleAccountClick(account)}
                                className={`p-4 border-2 transition-all cursor-pointer hover:shadow-md ${
                                    account.isActive
                                        ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
                                        : 'border-gray-200 bg-gray-50 dark:bg-gray-900/20'
                                }`}
                            >
                              <div className="space-y-3">
                                {editingAccount === account.id ? (
                                    // 편집 모드
                                    <div onClick={(e) => e.stopPropagation()}>
                                      <EditAccountForm
                                          account={account}
                                          onSave={(updatedData) => handleSaveEdit(account.id, updatedData)}
                                          onCancel={() => setEditingAccount(null)}
                                      />
                                    </div>
                                ) : (
                                    // 보기 모드
                                    <>
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-sm">{account.accountName}</h3>
                                            <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                                                account.isActive
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400'
                                            }`}>
                                      {account.isActive ? '활성' : '비활성'}
                                    </span>
                                          </div>
                                          <p className="text-xs text-muted-foreground mt-1">
                                            {account.accountNumber}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            종료일: {formatDateForApi(account.endDate)}
                                          </p>
                                        </div>

                                        <div className="flex items-center gap-1">
                                          <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={(e) => handleEditAccount(account.id, e)}
                                              className="p-1 h-7 w-7"
                                          >
                                            <Edit2 className="w-3 h-3" />
                                          </Button>
                                          <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={(e) => handleDeleteAccount(account.id, e)}
                                              className="p-1 h-7 w-7 text-red-500 hover:text-red-700"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between pt-2 border-t">
                                <span className="text-xs text-muted-foreground">
                                  등록일: {formatDateForApi(account.createdAt)}
                                </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => handleToggleAccount(account.id, e)}
                                            className={`text-xs h-7 ${
                                                account.isActive
                                                    ? 'border-red-200 text-red-600 hover:bg-red-50'
                                                    : 'border-green-200 text-green-600 hover:bg-green-50'
                                            }`}
                                        >
                                          {account.isActive ? '비활성화' : '활성화'}
                                        </Button>
                                      </div>
                                    </>
                                )}
                              </div>
                            </Card>
                        ))}
                      </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
  )
}

// 계좌 편집 폼 컴포넌트
function EditAccountForm({
                           account,
                           onSave,
                           onCancel
                         }: {
  account: Account;
  onSave: (data: Partial<Account>) => void;
  onCancel: () => void;
}) {
  const [accountName, setAccountName] = useState(account.accountName);
  const [endDate, setEndDate] = useState(account.endDate);

  const formatDateForDisplay = (date: Date) => {
    return format(date, "yyyy년 MM월 dd일", { locale: ko });
  };

  const handleSave = () => {
    if (!accountName.trim()) {
      alert("계좌명을 입력해주세요.");
      return;
    }

    onSave({
      accountName: accountName.trim(),
      endDate: endDate
    });
  };

  return (
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs font-medium">계좌명</Label>
          <Input
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="text-xs h-8"
              placeholder="계좌명을 입력해주세요"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">종료일</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal text-xs h-8"
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
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

        <div className="flex gap-2">
          <Button
              onClick={handleSave}
              className="flex-1 text-xs h-8 bg-blue-600 hover:bg-blue-700"
          >
            저장
          </Button>
          <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 text-xs h-8"
          >
            취소
          </Button>
        </div>
      </div>
  );
}