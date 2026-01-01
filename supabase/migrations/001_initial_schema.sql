-- =====================================================
-- 起業の科学 プロンプトポータル - データベーススキーマ
-- Supabase PostgreSQL
-- =====================================================

-- 拡張機能の有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ユーザープロファイル（Supabase Authと連携）
-- =====================================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    display_name TEXT,
    avatar_url TEXT,
    -- 購読状態
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'book', 'premium')),
    -- 書籍認証（QRコードからのアクセス追跡）
    book_verified BOOLEAN DEFAULT FALSE,
    book_verified_at TIMESTAMPTZ,
    -- ユニコーンファーム連携
    unicorn_farm_user_id TEXT,
    unicorn_farm_linked_at TIMESTAMPTZ,
    -- メタデータ
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- プロファイル自動作成トリガー
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 2. 書籍マスタ
-- =====================================================
CREATE TABLE public.books (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL, -- URL用: "kagaku-of-startup"
    title TEXT NOT NULL,
    subtitle TEXT,
    author TEXT NOT NULL,
    cover_image_url TEXT,
    description TEXT,
    published_at DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 初期データ: 起業の科学
INSERT INTO public.books (slug, title, author, description) VALUES
('kagaku-of-startup', '起業の科学', '田所雅之', 'スタートアップサイエンス');

-- =====================================================
-- 3. 章・セクション
-- =====================================================
CREATE TABLE public.chapters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(book_id, chapter_number)
);

-- 初期データ
INSERT INTO public.chapters (book_id, chapter_number, title, sort_order)
SELECT id, 3, 'プロダクト設計', 3
FROM public.books WHERE slug = 'kagaku-of-startup';

-- =====================================================
-- 4. プロンプト
-- =====================================================
CREATE TABLE public.prompts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
    -- 基本情報
    step_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    purpose TEXT, -- このプロンプトの目的
    category TEXT, -- 機能設計, UX設計, UI設計, etc.
    -- プロンプト本文
    prompt_text TEXT NOT NULL,
    -- アクセス制御
    access_level TEXT DEFAULT 'public' CHECK (access_level IN ('public', 'authenticated', 'premium')),
    -- メタデータ
    tags TEXT[] DEFAULT '{}',
    usage_tips TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    -- 統計
    copy_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_prompts_chapter ON public.prompts(chapter_id);
CREATE INDEX idx_prompts_access ON public.prompts(access_level);
CREATE INDEX idx_prompts_tags ON public.prompts USING GIN(tags);

-- =====================================================
-- 5. リソース（スライド、PDF、資料）
-- =====================================================
CREATE TABLE public.resources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
    prompt_id UUID REFERENCES public.prompts(id) ON DELETE SET NULL,
    -- 基本情報
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('slide', 'pdf', 'spreadsheet', 'video', 'link')),
    -- ファイル情報
    storage_path TEXT, -- Supabase Storage のパス
    external_url TEXT, -- 外部リンクの場合
    file_size_bytes BIGINT,
    mime_type TEXT,
    -- アクセス制御
    access_level TEXT DEFAULT 'authenticated' CHECK (access_level IN ('public', 'authenticated', 'premium')),
    -- メタデータ
    thumbnail_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_resources_chapter ON public.resources(chapter_id);
CREATE INDEX idx_resources_type ON public.resources(resource_type);

-- =====================================================
-- 6. アクセスログ（分析用）
-- =====================================================
CREATE TABLE public.access_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    -- アクション情報
    action_type TEXT NOT NULL CHECK (action_type IN ('view', 'copy', 'download', 'login', 'signup')),
    target_type TEXT, -- 'prompt', 'resource', 'page'
    target_id UUID,
    -- コンテキスト
    source TEXT, -- 'qr', 'direct', 'search', 'referral'
    user_agent TEXT,
    ip_address INET,
    -- タイムスタンプ
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス（分析クエリ用）
CREATE INDEX idx_access_logs_user ON public.access_logs(user_id);
CREATE INDEX idx_access_logs_action ON public.access_logs(action_type);
CREATE INDEX idx_access_logs_created ON public.access_logs(created_at DESC);

-- パーティション用（将来的に月次パーティション化）
CREATE INDEX idx_access_logs_month ON public.access_logs(DATE_TRUNC('month', created_at));

-- =====================================================
-- 7. QRコードトラッキング
-- =====================================================
CREATE TABLE public.qr_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL, -- QRに埋め込むユニークコード
    label TEXT, -- "第3章", "特典ページ" など
    target_path TEXT NOT NULL, -- リダイレクト先パス
    scan_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Row Level Security (RLS) ポリシー
-- =====================================================

-- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "プロファイルは本人のみ閲覧可能"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "プロファイルは本人のみ更新可能"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- books (公開)
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "書籍は誰でも閲覧可能"
    ON public.books FOR SELECT
    USING (is_active = TRUE);

-- chapters (公開)
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "章は誰でも閲覧可能"
    ON public.chapters FOR SELECT
    USING (TRUE);

-- prompts (アクセスレベルに応じて)
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公開プロンプトは誰でも閲覧可能"
    ON public.prompts FOR SELECT
    USING (
        is_active = TRUE 
        AND (
            access_level = 'public'
            OR (access_level = 'authenticated' AND auth.uid() IS NOT NULL)
            OR (access_level = 'premium' AND EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() 
                AND subscription_tier = 'premium'
            ))
        )
    );

-- resources (認証ユーザーのみ)
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "リソースはアクセスレベルに応じて閲覧可能"
    ON public.resources FOR SELECT
    USING (
        is_active = TRUE
        AND (
            access_level = 'public'
            OR (access_level = 'authenticated' AND auth.uid() IS NOT NULL)
            OR (access_level = 'premium' AND EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() 
                AND subscription_tier = 'premium'
            ))
        )
    );

-- access_logs (本人のみ)
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ログは本人のみ閲覧可能"
    ON public.access_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "ログは誰でも挿入可能"
    ON public.access_logs FOR INSERT
    WITH CHECK (TRUE);

-- =====================================================
-- ビュー・関数
-- =====================================================

-- プロンプト統計更新関数
CREATE OR REPLACE FUNCTION public.increment_prompt_stat(
    prompt_uuid UUID,
    stat_type TEXT
)
RETURNS VOID AS $$
BEGIN
    IF stat_type = 'view' THEN
        UPDATE public.prompts SET view_count = view_count + 1 WHERE id = prompt_uuid;
    ELSIF stat_type = 'copy' THEN
        UPDATE public.prompts SET copy_count = copy_count + 1 WHERE id = prompt_uuid;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- リソースダウンロード数更新関数
CREATE OR REPLACE FUNCTION public.increment_resource_download(resource_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.resources SET download_count = download_count + 1 WHERE id = resource_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_prompts_updated_at
    BEFORE UPDATE ON public.prompts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
