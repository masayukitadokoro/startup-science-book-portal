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
  Download
} from 'lucide-react'

export default function HomePage() {
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
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                サインアップ
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              書籍購入者限定コンテンツ
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              「起業の科学」
              <br />
              <span className="gradient-text">実践ツールキット</span>
            </h1>
            <p className="text-lg text-dark-400 max-w-2xl mx-auto mb-8">
              書籍に登場するAIプロンプト＆限定スライド・動画を入手して、
              <br className="hidden sm:block" />
              スタートアップサイエンスを実践しよう
            </p>

            {/* Email Signup Form */}
            <div className="max-w-md mx-auto mb-8">
              <Link
                href="/login?mode=signup"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-primary-500/25"
              >
                <Download className="w-5 h-5" />
                無料でサインアップして限定資料を入手
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Secondary CTA */}
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              まずはプロンプトを見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-8 border-y border-dark-800">
            <div className="flex items-center gap-2 text-dark-400">
              <Award className="w-5 h-5 text-primary-400" />
              <span>累計<span className="text-white font-semibold">20万部</span>突破</span>
            </div>
            <div className="flex items-center gap-2 text-dark-400">
              <Users className="w-5 h-5 text-primary-400" />
              <span>SAA <span className="text-white font-semibold">330名+</span> 卒業</span>
            </div>
            <div className="flex items-center gap-2 text-dark-400">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Amazon <span className="text-white font-semibold">4.5</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
            サインアップで手に入るもの
          </h2>
          <p className="text-dark-400 text-center mb-12">
            書籍の学びを実践に移すためのツールキット
          </p>

          {/* Slide Previews */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {/* Slide 1 */}
            <div className="group">
              <div className="aspect-[4/3] bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 overflow-hidden mb-3 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-primary-400 mb-1">SLIDE 01</div>
                    <div className="text-white font-medium">プロダクト設計</div>
                    <div className="text-dark-500 text-sm">フィーチャー洗い出し</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-medium text-white">プロダクト設計スライド</h3>
              <p className="text-sm text-dark-400">MVP設計の具体的なステップを解説</p>
            </div>

            {/* Slide 2 */}
            <div className="group">
              <div className="aspect-[4/3] bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 overflow-hidden mb-3 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-green-400 mb-1">SLIDE 02</div>
                    <div className="text-white font-medium">PMFチェック</div>
                    <div className="text-dark-500 text-sm">達成度を可視化</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-medium text-white">PMF達成チェックリスト</h3>
              <p className="text-sm text-dark-400">プロダクトマーケットフィットの判定基準</p>
            </div>

            {/* Slide 3 */}
            <div className="group">
              <div className="aspect-[4/3] bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 overflow-hidden mb-3 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-purple-400 mb-1">VIDEO</div>
                    <div className="text-white font-medium">解説動画</div>
                    <div className="text-dark-500 text-sm">著者による解説</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-medium text-white">起業の科学 解説動画</h3>
              <p className="text-sm text-dark-400">書籍の内容を動画でわかりやすく</p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
            <div className="flex items-center gap-2 text-dark-300">
              <CheckCircle className="w-4 h-4 text-primary-400" />
              ChatGPT / Claude / Gemini 対応
            </div>
            <div className="flex items-center gap-2 text-dark-300">
              <CheckCircle className="w-4 h-4 text-primary-400" />
              ワンクリックでコピー
            </div>
            <div className="flex items-center gap-2 text-dark-300">
              <CheckCircle className="w-4 h-4 text-primary-400" />
              継続的にアップデート
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Preview Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                AIプロンプト一覧
              </h2>
              <p className="text-dark-400">
                書籍「起業の科学」第3章に対応したプロンプト集
              </p>
            </div>
            <Link
              href="/prompts"
              className="hidden sm:flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
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
                className="glass rounded-xl p-5 hover:border-primary-500/40 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                    {prompt.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white group-hover:text-primary-300 transition-colors mb-1">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-dark-400 mb-2 line-clamp-2">
                      {prompt.desc}
                    </p>
                    <span className="inline-block px-2 py-1 bg-primary-500/10 text-primary-400 rounded text-xs">
                      {prompt.tag}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-dark-600 group-hover:text-primary-400 transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              すべてのプロンプトを見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Portal CTA */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/25">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                動画・記事でもっと深く学ぶ
              </h2>
              <p className="text-dark-400 mb-8 max-w-lg mx-auto">
                「起業の科学」著者による解説動画や、最新のスタートアップ事例を
                <br className="hidden sm:block" />
                動画・記事で学べる専用ポータルをご利用いただけます。
              </p>
              <a
                href="https://unicornfarm.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-medium transition-all"
              >
                起業の科学ポータルへ
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            今すぐ始めよう
          </h2>
          <p className="text-dark-400 mb-8">
            無料でサインアップして、限定スライド・動画・プロンプトにアクセス
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login?mode=signup"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-primary-500/25"
            >
              <Download className="w-5 h-5" />
              無料でサインアップ
            </Link>
            <Link
              href="/prompts"
              className="flex items-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl font-medium transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              プロンプトを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8">
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
