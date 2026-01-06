"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Moon, Sun, Menu, X, User, History, Settings, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Dummy Account Data
interface Account {
  id: string
  accountNumber: string
  accountName: string
  isActive: boolean
}

const DUMMY_ACCOUNTS: Account[] = [
  { id: "1", accountNumber: "1234567890", accountName: "메인 계좌", isActive: true },
  { id: "2", accountNumber: "0987654321", accountName: "서브 계좌", isActive: false },
  { id: "3", accountNumber: "1112223333", accountName: "투자 계좌", isActive: true },
]

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Account State
  const [accounts, setAccounts] = useState<Account[]>(DUMMY_ACCOUNTS)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  useEffect(() => {
    // Check initial theme
    const root = document.documentElement
    setIsDark(root.classList.contains("dark"))
    
    // Set initial active account
    const firstActive = accounts.find(a => a.isActive)
    if (firstActive) setSelectedAccount(firstActive)
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    root.classList.toggle("dark")
    setIsDark(!isDark)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleAccountSelect = (account: Account) => {
    if (!account.isActive) return
    setSelectedAccount(account)
    setIsAccountOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-foreground truncate mr-2">
            <span className="hidden md:inline">Automated Trading System</span>
            <span className="md:hidden">ATS</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Account Selector */}
            {selectedAccount && (
                <Popover open={isAccountOpen} onOpenChange={setIsAccountOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                        variant="outline" 
                        role="combobox"
                        aria-expanded={isAccountOpen}
                        className="justify-between h-9 px-3 text-xs md:text-sm font-normal border-border bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="md:hidden truncate max-w-[80px]">{selectedAccount.accountName}</span>
                      <span className="hidden md:inline truncate">{selectedAccount.accountName} / {selectedAccount.accountNumber}</span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[240px] p-0" align="end">
                    <div className="p-1">
                        {accounts.map((account) => (
                            <div
                                key={account.id}
                                onClick={() => handleAccountSelect(account)}
                                className={cn(
                                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors",
                                    account.isActive 
                                        ? "hover:bg-accent hover:text-accent-foreground cursor-pointer" 
                                        : "opacity-50 cursor-not-allowed text-muted-foreground",
                                    selectedAccount.id === account.id && "bg-accent/50"
                                )}
                            >
                                <div className="flex flex-col w-full">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{account.accountName}</span>
                                        {selectedAccount.id === account.id && (
                                            <Check className="h-4 w-4" />
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{account.accountNumber}</span>
                                    {!account.isActive && <span className="text-[10px] text-red-500 mt-1">비활성화</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                  </PopoverContent>
                </Popover>
            )}

            <nav className="hidden items-center gap-6 md:flex ml-2">
              {/* Desktop Navigation - hidden on mobile */}
              <Link
                  href="/trade-schedule"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                거래예정
              </Link>
              <Link
                  href="/history"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                일자별 거래내역
              </Link>
              <Link
                  href="/account"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                잔고
              </Link>
            </nav>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors"
              aria-label="테마 전환"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Menu toggle */}
            <button
              onClick={toggleMenu}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors"
              aria-label="메뉴"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out menu from right */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleMenu} />

        {/* Menu panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-xl transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-bold text-foreground">메뉴</h2>
              <button
                onClick={toggleMenu}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent text-foreground transition-colors"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col gap-2 p-4">
              <Link
                href="/login"
                onClick={toggleMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground hover:bg-accent transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">로그인</span>
              </Link>
              <Link
                  href="/trade-schedule"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground hover:bg-accent transition-colors"
              >
                <History className="h-5 w-5" />
                <span className="font-medium">거래예정</span>
              </Link>
              <Link
                href="/history"
                onClick={toggleMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground hover:bg-accent transition-colors"
              >
                <History className="h-5 w-5" />
                <span className="font-medium">일자별 거래내역</span>
              </Link>
              <Link
                  href="/account"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground hover:bg-accent transition-colors"
              >
                <History className="h-5 w-5" />
                <span className="font-medium">잔고</span>
              </Link>
              <Link
                href="/settings"
                onClick={toggleMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground hover:bg-accent transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">설정</span>
              </Link>
              <Link
                  href="/super-settings"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground hover:bg-accent transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">마스터설정</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
