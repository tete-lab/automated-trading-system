"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Moon, Sun, Menu, X, User, History, Settings } from "lucide-react"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Check initial theme
    const root = document.documentElement
    setIsDark(root.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    root.classList.toggle("dark")
    setIsDark(!isDark)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-foreground">
            Automated Trading System
          </Link>





          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-6 md:flex">
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
                  href="/settings"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                설정
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
                href="/settings"
                onClick={toggleMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground hover:bg-accent transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">설정</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
