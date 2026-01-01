import Link from 'next/link'
import { 
  BookOpen, 
  FileText, 
  Video, 
  ArrowRight, 
  CheckCircle,
  Users,
  Star,
  Award,
  Sparkles,
  Download,
  Clock,
  CreditCard,
  Shield
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200">
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
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                無料サインアップ
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              書籍購入者限定コンテンツ
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              「起業の科学」
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">実践ツールキット</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              書籍に登場するAIプロンプト＆限定スライド・動画を
              <br className="hidden sm:block" />
              <span className="font-semibold text-gray-900">完全無料</span>で入手できます
            </p>
            
            {/* 具体的な数字 */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>AIプロンプト <span className="font-bold text-gray-900">XX本</span></span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>限定スライド <span className="font-bold text-gray-900">PDF付き</span></span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>解説動画 <span className="font-bold text-gray-900">視聴可能</span></span>
              </div>
            </div>

            {/* メインCTA */}
            <div className="max-w-md mx-auto mb-4">
              <Link
                href="/login?mode=signup"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02]"
              >
                <Download className="w-5 h-5" />
                今すぐ無料で手に入れる
              </Link>
            </div>
            
            {/* マイクロコピー */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>30秒で完了</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                <span>クレカ不要</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>メールのみで登録</span>
              </div>
            </div>

            {/* サブCTA */}
            <div className="mt-6">
              <Link
                href="/prompts"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                まずはプロンプトを見る
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-8 border-y border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-5 h-5 text-blue-600" />
              <span>累計<span className="text-gray-900 font-semibold">20万部</span>突破</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 text-blue-600" />
              <span>SAA <span className="text-gray-900 font-semibold">330名+</span> 卒業</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Amazon <span className="text-gray-900 font-semibold">4.5</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4">
            サインアップで手に入るもの
          </h2>
          <p className="text-gray-600 text-center mb-12">
            書籍の学びを実践に移すためのツールキット
          </p>

          {/* Slide Previews */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {/* Slide 1 */}
            <div className="group">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-3 relative hover:border-blue-300 transition-colors">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-blue-600 font-medium mb-1">SLIDE 01</div>
                    <div className="text-gray-900 font-medium">プロダクト設計</div>
                    <div className="text-gray-500 text-sm">フィーチャー洗い出し</div>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900">プロダクト設計スライド</h3>
              <p className="text-sm text-gray-500">MVP設計の具体的なステップを解説</p>
            </div>

            {/* Slide 2 */}
            <div className="group">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-3 relative hover:border-green-300 transition-colors">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-green-600 font-medium mb-1">SLIDE 02</div>
                    <div className="text-gray-900 font-medium">PMFチェック</div>
                    <div className="text-gray-500 text-sm">達成度を可視化</div>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900">PMF達成チェックリスト</h3>
              <p className="text-sm text-gray-500">プロダクトマーケットフィットの判定基準</p>
            </div>

            {/* Slide 3 */}
            <div className="group">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-3 relative hover:border-purple-300 transition-colors">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-purple-600 font-medium mb-1">VIDEO</div>
                    <div className="text-gray-900 font-medium">解説動画</div>
                    <div className="text-gray-500 text-sm">著者による解説</div>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900">起業の科学 解説動画</h3>
              <p className="text-sm text-gray-500">書籍の内容を動画でわかりやすく</p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              ChatGPT / Claude / Gemini 対応
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              ワンクリックでコピー
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              継続的にアップデート
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                AIプロンプト一覧
              </h2>
              <p className="text-gray-600">
                書籍「起業の科学」第3章に対応したプロンプト集
              </p>
            </div>
            <Link
              href="/prompts"
              className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Prompt Cards Preview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { step: 2, title: 'フィーチャー洗い出し', desc: 'リーンキャンバスから必要な機能を抽出', tag: '機能設計' },
              { step: 3, title: 'グルーピング', desc: 'フィーチャーをユーザー目的別に整理', tag: '機能設計' },
              { step: 4, title: 'ジャーニー設計', desc: 'ペルソナに基づくユーザーフローを設計', tag: 'UX設計' },
            ].map((prompt) => (
              <Link
                key={prompt.step}
                href="/prompts"
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                    {prompt.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {prompt.desc}
                    </p>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      {prompt.tag}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              すべてのプロンプトを見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Portal CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                動画・記事でもっと深く学ぶ
              </h2>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                「起業の科学」著者による解説動画や、最新のスタートアップ事例を
                <br className="hidden sm:block" />
                動画・記事で学べる専用ポータルをご利用いただけます。
              </p>
              <a
                href="https://unicornfarm.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-medium transition-all"
              >
                起業の科学ポータルへ
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            今すぐ始めよう
          </h2>
          <p className="text-gray-600 mb-6">
            完全無料でスライド・動画・プロンプトにアクセス
          </p>
          
          {/* CTA */}
          <div className="max-w-md mx-auto mb-4">
            <Link
              href="/login?mode=signup"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02]"
            >
              <Download className="w-5 h-5" />
              無料で手に入れる
            </Link>
          </div>
          
          {/* マイクロコピー */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>30秒で完了</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              <span>クレカ不要</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <Link
              href="/prompts"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              まずはプロンプトを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
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
