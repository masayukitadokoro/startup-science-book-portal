import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { 
  FileText, 
  Presentation, 
  Table, 
  Video, 
  ExternalLink, 
  Download,
  BookOpen,
  Star,
  ArrowRight,
  LogOut
} from 'lucide-react'

// 型定義
type Profile = {
  display_name?: string | null
  subscription_tier?: string | null
}

type Resource = {
  id: string
  title: string
  description?: string | null
  resource_type: 'slide' | 'pdf' | 'spreadsheet' | 'video' | 'link'
  external_url?: string | null
  storage_path?: string | null
}

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // プロファイル取得
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // リソース取得
  const { data: resourcesData } = await supabase
    .from('resources')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  const profile = profileData as Profile | null
  const resources = resourcesData as Resource[] | null

  const resourceIcons: Record<string, React.ReactNode> = {
    slide: <Presentation className="w-5 h-5 text-white" />,
    pdf: <FileText className="w-5 h-5 text-white" />,
    spreadsheet: <Table className="w-5 h-5 text-white" />,
    video: <Video className="w-5 h-5 text-white" />,
    link: <ExternalLink className="w-5 h-5 text-white" />,
  }

  const resourceColors: Record<string, string> = {
    slide: 'from-orange-500 to-orange-600',
    pdf: 'from-red-500 to-red-600',
    spreadsheet: 'from-green-500 to-green-600',
    video: 'from-purple-500 to-purple-600',
    link: 'from-blue-500 to-blue-600',
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold">
                起
              </div>
              <div>
                <span className="font-bold text-white">起業の科学</span>
                <span className="text-primary-400 text-sm ml-1">PROMPT PORTAL</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/prompts"
                className="hidden sm:flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                プロンプト
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">ログアウト</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                ようこそ、{profile?.display_name || user.email?.split('@')[0]}さん
              </h1>
              <p className="text-dark-400">
                起業の科学の特典コンテンツにアクセスできます
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full">
              <Star className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-300">
                {profile?.subscription_tier === 'premium' ? 'プレミアム会員' : '書籍購入者'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/prompts"
            className="glass rounded-xl p-5 hover:border-primary-500/40 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1 group-hover:text-primary-300 transition-colors">
                  プロンプト一覧
                </h3>
                <p className="text-sm text-dark-400">全プロンプトにアクセス</p>
              </div>
              <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-400 transition-colors" />
            </div>
          </Link>

          <a
            href="https://unicornfarm.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 hover:border-primary-500/40 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1 group-hover:text-green-300 transition-colors">
                  動画・記事ポータル
                </h3>
                <p className="text-sm text-dark-400">もっと深く学ぶ</p>
              </div>
              <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-green-400 transition-colors" />
            </div>
          </a>
        </div>

        {/* Resources Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">ダウンロード資料</h2>
          
          {resources && resources.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="glass rounded-xl overflow-hidden hover:border-primary-500/40 transition-all"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${resourceColors[resource.resource_type]} rounded-lg flex items-center justify-center shadow-lg shrink-0`}>
                        {resourceIcons[resource.resource_type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white mb-1 truncate">{resource.title}</h3>
                        <p className="text-sm text-dark-400 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-dark-900/50 border-t border-dark-800 flex items-center justify-between">
                    <span className="text-xs text-dark-500 capitalize">
                      {resource.resource_type}
                    </span>
                    {resource.external_url ? (
                      <a
                        href={resource.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        開く
                      </a>
                    ) : resource.storage_path ? (
                      <button
                        className="flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロード
                      </button>
                    ) : (
                      <span className="text-xs text-dark-500">準備中</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <FileText className="w-12 h-12 text-dark-600 mx-auto mb-4" />
              <p className="text-dark-400">現在ダウンロード可能な資料はありません</p>
            </div>
          )}
        </section>

        {/* Unicorn Farm CTA */}
        {profile?.subscription_tier !== 'premium' && (
          <section className="mt-12">
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    プレミアム会員にアップグレード
                  </h3>
                  <p className="text-dark-400">
                    ユニコーンファームのプログラムに参加すると、すべての特典コンテンツと
                    メンタリングセッションにアクセスできます。
                  </p>
                </div>
                <a
                  href="https://unicornfarm.jp/premium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 text-white"
                >
                  詳細を見る
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-dark-500 text-sm">
              © 2024 起業の科学. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                利用規約
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                プライバシー
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
