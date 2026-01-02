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
              無料登録
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
              無料で全て入手
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
              サンプルプロンプトを見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-12">
            コンテンツのサンプル
          </h2>

          {/* Content Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Card 1: PDF Slide */}
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
                    <div className="text-sm font-medium text-white/90">良いアイディアとは</div>
                    <div className="text-teal-100 text-sm mt-1">（PDFサンプル）を見る</div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 rounded-full p-2">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </a>

            {/* Card 2: Google Spreadsheet */}
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
                    <div className="text-sm font-medium text-white/90">良いアイディアの事例集</div>
                    <div className="text-green-100 text-sm mt-1">サンプルを見る</div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 rounded-full p-2">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
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
                    <div className="text-sm font-medium text-white/90">解説動画</div>
                    <div className="text-red-100 text-sm mt-1">サンプルを見る</div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 rounded-full p-2">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </a>
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
              無料で全て入手
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
              サンプルプロンプトを見る
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
