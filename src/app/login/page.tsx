'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, Loader2, ArrowLeft, CheckCircle, Download, FileText, Video } from 'lucide-react'

function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'signup' | 'login' | 'magic'>('signup')
  const [emailSent, setEmailSent] = useState(false)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const initialMode = searchParams.get('mode')
  const supabase = createClient()

  // URLパラメータでモード指定があれば適用
  useState(() => {
    if (initialMode === 'login') setMode('login')
    if (initialMode === 'magic') setMode('magic')
  })

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setEmailSent(true)
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = redirect
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setEmailSent(true)
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    })
  }

  if (emailSent) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">メールを確認してください</h1>
            <p className="text-dark-400 mb-6">
              <span className="text-white">{email}</span> に
              {mode === 'signup' ? '確認' : 'ログイン'}リンクを送信しました。
              <br />
              メール内のリンクをクリックしてください。
            </p>
            <button
              onClick={() => {
                setEmailSent(false)
                setEmail('')
              }}
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              別のメールアドレスを使用
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          ホームに戻る
        </Link>

        {/* Benefits Card */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-medium text-dark-400 mb-4">サインアップで入手できるもの</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-400" />
              </div>
              <span className="text-white text-sm">プロダクト設計スライド（PDF）</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-white text-sm">PMF達成チェックリスト</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Video className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-white text-sm">起業の科学 解説動画</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {mode === 'signup' ? '無料サインアップ' : mode === 'magic' ? 'マジックリンク' : 'ログイン'}
          </h1>
          <p className="text-dark-400 text-center mb-8">
            {mode === 'signup'
              ? '限定資料にアクセスしよう'
              : mode === 'magic'
              ? 'メールでログインリンクを受け取る'
              : 'アカウントにログイン'}
          </p>

          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-dark-900 rounded-lg">
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-primary-500 text-white'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              サインアップ
            </button>
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-dark-700 text-white'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              ログイン
            </button>
            <button
              onClick={() => setMode('magic')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'magic'
                  ? 'bg-dark-700 text-white'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              マジックリンク
            </button>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 rounded-xl font-medium hover:bg-gray-100 transition-colors mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Googleで{mode === 'signup' ? 'サインアップ' : 'ログイン'}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-800 text-dark-500">または</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={mode === 'signup' ? handleSignUp : mode === 'magic' ? handleMagicLink : handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark-300 mb-2">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password (not for magic link) */}
            {mode !== 'magic' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>
                {mode === 'signup' && (
                  <p className="text-xs text-dark-500 mt-1">6文字以上で入力してください</p>
                )}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === 'signup' ? (
                <>
                  <Download className="w-5 h-5" />
                  無料でサインアップ
                </>
              ) : mode === 'magic' ? (
                'ログインリンクを送信'
              ) : (
                'ログイン'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-dark-500 text-sm mt-6">
          サインアップすることで、
          <a href="#" className="text-primary-400 hover:text-primary-300">利用規約</a>
          と
          <a href="#" className="text-primary-400 hover:text-primary-300">プライバシーポリシー</a>
          に同意したものとみなされます。
        </p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    }>
      <SignUpForm />
    </Suspense>
  )
}
