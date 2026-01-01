'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/Header'
import PromptCard from '@/components/PromptCard'
import { Filter, Loader2 } from 'lucide-react'

// 型定義
type Prompt = {
  id: string
  chapter_id: string
  step_number: number
  title: string
  purpose: string | null
  category: string | null
  prompt_text: string
  access_level: 'public' | 'authenticated' | 'premium'
  tags: string[]
  usage_tips: string | null
  sort_order: number
  is_active: boolean
  copy_count: number
  view_count: number
  created_at: string
  updated_at: string
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // ユーザー状態確認
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      // プロンプト取得
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (error) {
        console.error('Error fetching prompts:', error)
      } else {
        setPrompts((data as Prompt[]) || [])
      }
      setLoading(false)
    }

    fetchData()
  }, [supabase])

  // カテゴリー一覧
  const categories = useMemo(() => {
    const cats = new Set(prompts.map(p => p.category).filter(Boolean))
    return Array.from(cats) as string[]
  }, [prompts])

  // フィルタリング
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      // 検索クエリ
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          prompt.title.toLowerCase().includes(query) ||
          prompt.purpose?.toLowerCase().includes(query) ||
          prompt.prompt_text.toLowerCase().includes(query) ||
          prompt.tags.some(t => t.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // カテゴリフィルター
      if (selectedCategory && prompt.category !== selectedCategory) {
        return false
      }

      return true
    })
  }, [prompts, searchQuery, selectedCategory])

  // ステップごとにグループ化
  const groupedPrompts = useMemo(() => {
    const groups: Record<number, Prompt[]> = {}
    filteredPrompts.forEach(prompt => {
      if (!groups[prompt.step_number]) {
        groups[prompt.step_number] = []
      }
      groups[prompt.step_number].push(prompt)
    })
    return groups
  }, [filteredPrompts])

  const stepTitles: Record<number, string> = {
    2: 'フィーチャー洗い出し',
    3: 'グルーピング',
    4: 'ジャーニー設計',
    5: 'UI要素設計',
    6: '画面遷移実装',
    7: 'ビジュアルデザイン',
  }

  const handleCopy = async (promptId: string) => {
    // 統計更新（エラーを無視）
    try {
      await fetch('/api/track-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId })
      }).catch(() => {})
    } catch (err) {
      // 統計更新のエラーは無視
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header 
        showSearch={true}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
            プロンプト一覧
          </h1>
          <p className="text-dark-400">
            第3章 プロダクト設計のプロンプト集
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-sm text-dark-400">
            <Filter className="w-4 h-4" />
            カテゴリ:
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              selectedCategory === null
                ? 'bg-primary-500 text-white'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
            }`}
          >
            すべて
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-dark-400">
          {filteredPrompts.length} 件のプロンプト
          {searchQuery && ` (「${searchQuery}」で検索)`}
        </div>

        {/* Prompt List */}
        {Object.keys(groupedPrompts).length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-dark-400">該当するプロンプトが見つかりません</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedPrompts)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([step, stepPrompts]) => (
                <section key={step}>
                  <h2 className="flex items-center gap-3 text-lg font-semibold text-dark-200 mb-4">
                    <span className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {step}
                    </span>
                    {stepTitles[Number(step)] || `ステップ ${step}`}
                  </h2>
                  <div className="space-y-4">
                    {stepPrompts.map(prompt => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        isAuthenticated={isAuthenticated}
                        onCopy={() => handleCopy(prompt.id)}
                      />
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}

        {/* Login CTA for non-authenticated users */}
        {!isAuthenticated && (
          <div className="mt-12 glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              すべてのプロンプトにアクセス
            </h3>
            <p className="text-dark-400 mb-6">
              ログインすると、プレミアムプロンプトやスライド、資料もダウンロードできます。
            </p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25"
            >
              無料でログイン
            </a>
          </div>
        )}
      </main>
    </div>
  )
}
