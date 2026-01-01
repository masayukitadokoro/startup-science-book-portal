'use client'

import { useState } from 'react'
import { Copy, Check, Lock, ChevronRight, FileText, Lightbulb } from 'lucide-react'
import { Prompt } from '@/lib/supabase/database.types'

interface PromptCardProps {
  prompt: Prompt
  isAuthenticated: boolean
  onCopy?: () => void
}

export default function PromptCard({ prompt, isAuthenticated, onCopy }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const isLocked = prompt.access_level !== 'public' && !isAuthenticated

  const handleCopy = async () => {
    if (isLocked) return
    
    try {
      await navigator.clipboard.writeText(prompt.prompt_text)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const categoryColors: Record<string, string> = {
    '機能設計': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'UX設計': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'UI設計': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'プロトタイピング': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ビジュアルデザイン': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  }

  return (
    <div className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${expanded ? 'ring-2 ring-primary-500/50' : ''}`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left flex items-start gap-4 hover:bg-dark-800/30 transition-colors"
      >
        <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/25">
          {prompt.step_number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white truncate">{prompt.title}</h3>
            {isLocked && <Lock className="w-4 h-4 text-dark-400 shrink-0" />}
          </div>
          <p className="text-sm text-dark-400 line-clamp-2">{prompt.purpose}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[prompt.category || ''] || 'bg-dark-700 text-dark-300 border-dark-600'}`}>
              {prompt.category}
            </span>
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-dark-500 shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-dark-800 animate-fade-in">
          {/* Tags */}
          <div className="px-5 py-3 border-b border-dark-800 flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-primary-500/10 text-primary-300 rounded-full border border-primary-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Prompt Text */}
          <div className="relative">
            <div className="flex items-center justify-between px-5 py-3 bg-dark-900/50 border-b border-dark-800">
              <div className="flex items-center gap-2 text-sm text-primary-300">
                <FileText className="w-4 h-4" />
                プロンプト本文
              </div>
              <button
                onClick={handleCopy}
                disabled={isLocked}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isLocked
                    ? 'bg-dark-700 text-dark-500 cursor-not-allowed'
                    : copied
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    コピーしました
                  </>
                ) : isLocked ? (
                  <>
                    <Lock className="w-4 h-4" />
                    ログインが必要
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    コピー
                  </>
                )}
              </button>
            </div>
            <div className={`p-5 ${isLocked ? 'relative overflow-hidden' : ''}`}>
              <pre className={`font-mono text-sm text-dark-300 whitespace-pre-wrap leading-relaxed ${isLocked ? 'blur-sm select-none' : ''}`}>
                {prompt.prompt_text}
              </pre>
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-900/80">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-dark-500 mx-auto mb-2" />
                    <p className="text-dark-400 text-sm">このプロンプトを見るにはログインが必要です</p>
                    <a
                      href="/login"
                      className="inline-block mt-3 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-sm font-medium text-white hover:from-primary-600 hover:to-primary-700 transition-all"
                    >
                      ログインする
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          {prompt.usage_tips && !isLocked && (
            <div className="px-5 py-4 bg-green-500/5 border-t border-green-500/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-300 mb-1">使い方のヒント</p>
                  <p className="text-sm text-dark-400">{prompt.usage_tips}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
