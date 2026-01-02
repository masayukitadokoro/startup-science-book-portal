import Link from 'next/link'
import { 
  FileText, 
  Video, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Download,
  Clock,
  CreditCard,
  Table,
  Play,
  ExternalLink
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold">
                起
              </div>
              <div>
                <span className="font-bold text-gray-900">起業の科学</span>
                <span className="text-orange-500 text-sm ml-1">PROMPT PORTAL</span>
              </div>
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              無料サインアップ
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-orange-700 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            書籍購入者限定コンテンツ
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            「起業の科学」
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">実践ツールキット</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            書籍に登場するAIプロンプト＆限定スライドを
            <br />
            <span className="font-semibold text-gray-900">完全無料</span>で入手できます
          </p>
          
          {/* 具体的な数字 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-gray-700 mb-10">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>実践プロンプト <span className="font-bold text-gray-900">30本以上</span></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>限定スライド <span className="font-bold text-gray-900">1000ページ</span>ダウンロード</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>解説動画 <span className="font-bold text-gray-900">視聴可能</span></span>
            </div>
          </div>

          {/* メインCTA */}
          <div className="max-w-sm mx-auto space-y-4">
            <Link
              href="/login?mode=signup"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02]"
            >
              <Download className="w-5 h-5" />
              今すぐ無料で手に入れる
              <ArrowRight className="w-5 h-5" />
            </Link>
            
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

            {/* サブCTA */}
            <Link
              href="/prompts"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all border border-gray-200"
            >
              まずはプロンプトを見る
              <ArrowRight className="w-4 h-4" />
            </Link>
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

          {/* Content Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Card 1: PDF Slide - Idea Verification */}
            <a
              href="/slides/idea-verification.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl overflow-hidden mb-3 relative hover:shadow-xl transition-all">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-teal-200 font-medium mb-1">PDF SLIDE</div>
                    <div className="font-bold text-lg">Idea Verification</div>
                    <div className="text-teal-100 text-sm">良いアイディアに気づく</div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 rounded-full p-2">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">アイディア検証スライド</h3>
              <p className="text-sm text-gray-500">課題の質を高め、良いビジネスアイディアを見つける方法</p>
            </a>

            {/* Card 2: Google Spreadsheet - イノベーションのジレンマ対応リスト */}
            <a
              href="https://docs.google.com/spreadsheets/d/1mFEZ7ayNJQOfFdvBn2feExM34MjrV7BDhe6Ok1H1w08/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-green-500 to-green-600 rounded-xl overflow-hidden mb-3 relative hover:shadow-xl transition-all">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Table className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-green-200 font-medium mb-1">SPREADSHEET</div>
                    <div className="font-bold text-lg">良いアイディアの事例</div>
                    <div className="text-green-100 text-sm">イノベーションのジレンマ対応</div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 rounded-full p-2">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">イノベーションのジレンマ対応リスト</h3>
              <p className="text-sm text-gray-500">大企業が抱えるジレンマをついて成功したビジネスアイディア集</p>
            </a>

            {/* Card 3: YouTube Video */}
            <a
              href="https://www.youtube.com/watch?v=g0_NNunXpas"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-red-500 to-red-600 rounded-xl overflow-hidden mb-3 relative hover:shadow-xl transition-all">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 ml-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-red-200 font-medium mb-1">YOUTUBE</div>
                    <div className="font-bold text-lg">解説動画</div>
                    <div className="text-red-100 text-sm">著者による講義</div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 rounded-full p-2">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">起業の科学 解説動画</h3>
              <p className="text-sm text-gray-500">書籍の内容を著者が動画でわかりやすく解説</p>
            </a>
          </div>
        </div>
      </section>

      {/* Video Portal CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
      <section className="py-16 bg-orange-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
            今すぐアクセス
          </h2>
          
          {/* CTA */}
          <div className="max-w-sm mx-auto space-y-4">
            <Link
              href="/login?mode=signup"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02]"
            >
              <Download className="w-5 h-5" />
              無料で手に入れる
              <ArrowRight className="w-5 h-5" />
            </Link>
            
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

            {/* サブCTA */}
            <Link
              href="/prompts"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-all border border-gray-200"
            >
              プロンプトを見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
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
