'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { Search, Menu, X, LogIn, LogOut, User as UserIcon, BookOpen } from 'lucide-react'

interface HeaderProps {
  onSearch?: (query: string) => void
  searchQuery?: string
  showSearch?: boolean
}

export default function Header({ onSearch, searchQuery = '', showSearch = true }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-primary-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">
              起
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight">起業の科学</h1>
              <p className="text-xs text-primary-300 tracking-widest">PROMPT PORTAL</p>
            </div>
          </Link>

          {/* Search (Desktop) */}
          {showSearch && (
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input
                  type="text"
                  placeholder="プロンプトを検索..."
                  value={searchQuery}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-900/50 border border-primary-500/30 rounded-xl text-sm placeholder:text-dark-400 focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/prompts" 
              className="text-sm text-dark-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              プロンプト
            </Link>
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm text-dark-300 hover:text-white transition-colors"
                >
                  ダッシュボード
                </Link>
                <div className="flex items-center gap-3 pl-3 border-l border-dark-700">
                  <span className="text-sm text-dark-400">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25"
              >
                <LogIn className="w-4 h-4" />
                ログイン
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                type="text"
                placeholder="プロンプトを検索..."
                value={searchQuery}
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900/50 border border-primary-500/30 rounded-xl text-sm placeholder:text-dark-400 focus:border-primary-500/60 transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-dark-800 animate-fade-in">
          <nav className="px-4 py-4 space-y-2">
            <Link
              href="/prompts"
              className="flex items-center gap-3 px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5" />
              プロンプト一覧
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserIcon className="w-5 h-5" />
                  ダッシュボード
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  ログアウト
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                ログイン
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
