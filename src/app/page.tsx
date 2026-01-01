import Link from 'next/link'
import { ArrowRight, BookOpen, Zap, Shield, ExternalLink } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-700/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-sm text-primary-300 mb-8">
              <BookOpen className="w-4 h-4" />
              書籍購入者限定コンテンツ
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="gradient-text">起業の科学</span>
              <br />
              <span className="text-dark-200">Prompt Portal</span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-lg text-dark-400 mb-10 leading-relaxed">
              スタートアップサイエンスを実践するための
              <br className="hidden sm:block" />
              AIプロンプト集。すぐにコピーして使えます。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/prompts"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-xl shadow-primary-500/25"
              >
                プロンプトを見る
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 glass rounded-xl text-lg font-semibold text-dark-200 hover:bg-dark-800/50 transition-all"
              >
                ログインして全機能を使う
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="gradient-text">できること</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass rounded-2xl p-6 hover:border-primary-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">即座にコピー&ペースト</h3>
              <p className="text-dark-400 text-sm leading-relaxed">
                書籍で紹介されているプロンプトをワンクリックでコピー。ChatGPT、Claude、Geminiなど、お好みのAIですぐに使えます。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-2xl p-6 hover:border-primary-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/25">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">スライド&資料ダウンロード</h3>
              <p className="text-dark-400 text-sm leading-relaxed">
                ログインすると、書籍に対応した講義スライドやテンプレートをダウンロードできます。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-2xl p-6 hover:border-primary-500/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/25">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">継続的なアップデート</h3>
              <p className="text-dark-400 text-sm leading-relaxed">
                AIの進化に合わせてプロンプトを最適化。書籍購入者は常に最新のプロンプトにアクセスできます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unicorn Farm CTA */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                より深く学びたい方へ
              </h2>
              <p className="text-dark-400 mb-8 max-w-xl mx-auto">
                ユニコーンファームでは、「起業の科学」の著者による
                オンラインプログラムや個別メンタリングを提供しています。
              </p>
              <a
                href="https://unicornfarm.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors"
              >
                ユニコーンファームを見る
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-dark-500">
            <p>© 2024 起業の科学. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-dark-300 transition-colors">利用規約</a>
              <a href="#" className="hover:text-dark-300 transition-colors">プライバシー</a>
              <a href="#" className="hover:text-dark-300 transition-colors">お問い合わせ</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
