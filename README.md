# 起業の科学 - Prompt Portal

書籍「起業の科学」購入者向けのプロンプトポータルサイト。

## 技術スタック

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Supabase (Auth, PostgreSQL, Storage)
- **Hosting**: Vercel
- **Styling**: Tailwind CSS

## アーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Next.js 14 (App Router)                 │   │
│  │  - /           Landing Page                          │   │
│  │  - /prompts    プロンプト一覧（公開）                 │   │
│  │  - /dashboard  ダッシュボード（要認証）              │   │
│  │  - /login      ログイン/サインアップ                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Supabase                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │   Auth   │  │ Postgres │  │ Storage  │                  │
│  │ (認証)   │  │  (RLS)   │  │ (資料)   │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## セットアップ

### 1. Supabase プロジェクト作成

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. SQL Editor で以下のマイグレーションを実行:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`

### 2. 環境変数設定

```bash
cp .env.example .env.local
```

`.env.local` に Supabase の認証情報を設定:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 依存関係インストール & 開発サーバー起動

```bash
npm install
npm run dev
```

http://localhost:3000 でアクセス

### 4. Vercel へデプロイ

```bash
npx vercel
```

## プロジェクト構成

```
book-prompt-portal/
├── src/
│   ├── app/
│   │   ├── page.tsx              # ランディングページ
│   │   ├── layout.tsx            # ルートレイアウト
│   │   ├── globals.css           # グローバルCSS
│   │   ├── prompts/
│   │   │   └── page.tsx          # プロンプト一覧
│   │   ├── dashboard/
│   │   │   └── page.tsx          # ダッシュボード
│   │   ├── login/
│   │   │   └── page.tsx          # ログイン
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts      # OAuth コールバック
│   ├── components/
│   │   ├── Header.tsx            # ヘッダー
│   │   └── PromptCard.tsx        # プロンプトカード
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts         # ブラウザ用クライアント
│   │       ├── server.ts         # サーバー用クライアント
│   │       └── database.types.ts # 型定義
│   └── middleware.ts             # 認証ミドルウェア
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql
│       └── 002_seed_data.sql
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## データベース構造

### テーブル

| テーブル | 説明 |
|---------|------|
| `profiles` | ユーザープロファイル（Auth連携） |
| `books` | 書籍マスタ |
| `chapters` | 章・セクション |
| `prompts` | プロンプトデータ |
| `resources` | ダウンロード資料 |
| `access_logs` | アクセスログ |
| `qr_codes` | QRコードトラッキング |

### アクセスレベル

| レベル | 説明 |
|--------|------|
| `public` | 誰でもアクセス可能 |
| `authenticated` | ログインユーザーのみ |
| `premium` | 有料会員のみ |

## 認証フロー

1. **Email/Password**: 従来型のメール+パスワード認証
2. **Magic Link**: パスワード不要のメールリンク認証
3. **Google OAuth**: Googleアカウントでワンクリックログイン

## 将来の拡張

### ユニコーンファーム連携

```typescript
// profiles テーブルに連携情報を保存
unicorn_farm_user_id: string
unicorn_farm_linked_at: timestamp
```

### プレミアム機能

- `subscription_tier` フィールドで会員種別を管理
- RLS ポリシーでアクセス制御

## 開発コマンド

```bash
# 開発サーバー
npm run dev

# ビルド
npm run build

# 型チェック
npm run lint

# Supabase 型生成
npm run db:generate-types
```

## ライセンス

Copyright © 2024 起業の科学. All rights reserved.
