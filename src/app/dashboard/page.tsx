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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold">
                起
              </div>
              <div>
                <span className="font-bold text-gray-900">起業の科学</span>
                <span className="text-blue-600 text-sm ml-1">PROMPT PORTAL</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/prompts"
                className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                プロンプト
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
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
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                ようこそ、{profile?.display_name || user.email?.split('@')[0]}さん
              </h1>
              <p className="text-gray-500">
                起業の科学の特典コンテンツにアクセスできます
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">
                {profile?.subscription_tier === 'premium' ? 'プレミアム会員' : '書籍購入者'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/prompts"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  プロンプト一覧
                </h3>
                <p className="text-sm text-gray-500">全プロンプトにアクセス</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
          </Link>

          <a
            href="https://unicornfarm.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-green-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                  動画・記事ポータル
                </h3>
                <p className="text-sm text-gray-500">もっと深く学ぶ</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
            </div>
          </a>
        </div>

        {/* Resources Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">ダウンロード資料</h2>
          
          {resources && resources.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${resourceColors[resource.resource_type]} rounded-lg flex items-center justify-center shadow-lg shrink-0`}>
                        {resourceIcons[resource.resource_type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1 truncate">{resource.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 capitalize">
                      {resource.resource_type}
                    </span>
                    {resource.external_url ? (
                      <a
                        href={resource.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        開く
                      </a>
                    ) : resource.storage_path ? (
                      <button
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        <Download className="w-4 h-4" />
                        ダウンロード
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">準備中</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">現在ダウンロード可能な資料はありません</p>
            </div>
          )}
        </section>

        {/* Unicorn Farm CTA */}
        {profile?.subscription_tier !== 'premium' && (
          <section className="mt-12">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    プレミアム会員にアップグレード
                  </h3>
                  <p className="text-blue-100">
                    ユニコーンファームのプログラムに参加すると、すべての特典コンテンツと
                    メンタリングセッションにアクセスできます。
                  </p>
                </div>
                <a
                  href="https://unicornfarm.jp/premium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
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
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              © 2024 起業の科学. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                利用規約
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                プライバシー
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
