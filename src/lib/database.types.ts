export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          display_name: string | null
          avatar_url: string | null
          subscription_tier: 'free' | 'book' | 'premium'
          book_verified: boolean
          book_verified_at: string | null
          unicorn_farm_user_id: string | null
          unicorn_farm_linked_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          display_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'book' | 'premium'
          book_verified?: boolean
          book_verified_at?: string | null
          unicorn_farm_user_id?: string | null
          unicorn_farm_linked_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          display_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'book' | 'premium'
          book_verified?: boolean
          book_verified_at?: string | null
          unicorn_farm_user_id?: string | null
          unicorn_farm_linked_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      books: {
        Row: {
          id: string
          slug: string
          title: string
          subtitle: string | null
          author: string
          cover_image_url: string | null
          description: string | null
          published_at: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          subtitle?: string | null
          author: string
          cover_image_url?: string | null
          description?: string | null
          published_at?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          subtitle?: string | null
          author?: string
          cover_image_url?: string | null
          description?: string | null
          published_at?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      chapters: {
        Row: {
          id: string
          book_id: string
          chapter_number: number
          title: string
          description: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          book_id: string
          chapter_number: number
          title: string
          description?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          book_id?: string
          chapter_number?: number
          title?: string
          description?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      prompts: {
        Row: {
          id: string
          chapter_id: string
          step_number: number
          title: string
          purpose: string | null
          category: string | null
          prompt_text: string
          access_level: 'public' | 'authenticated' | 'premium'
          tags: string[]
          usage_tips: string | null
          sort_order: number
          is_active: boolean
          copy_count: number
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          chapter_id: string
          step_number: number
          title: string
          purpose?: string | null
          category?: string | null
          prompt_text: string
          access_level?: 'public' | 'authenticated' | 'premium'
          tags?: string[]
          usage_tips?: string | null
          sort_order?: number
          is_active?: boolean
          copy_count?: number
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          chapter_id?: string
          step_number?: number
          title?: string
          purpose?: string | null
          category?: string | null
          prompt_text?: string
          access_level?: 'public' | 'authenticated' | 'premium'
          tags?: string[]
          usage_tips?: string | null
          sort_order?: number
          is_active?: boolean
          copy_count?: number
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          chapter_id: string
          prompt_id: string | null
          title: string
          description: string | null
          resource_type: 'slide' | 'pdf' | 'spreadsheet' | 'video' | 'link'
          storage_path: string | null
          external_url: string | null
          file_size_bytes: number | null
          mime_type: string | null
          access_level: 'public' | 'authenticated' | 'premium'
          thumbnail_url: string | null
          sort_order: number
          is_active: boolean
          download_count: number
          created_at: string
        }
        Insert: {
          id?: string
          chapter_id: string
          prompt_id?: string | null
          title: string
          description?: string | null
          resource_type: 'slide' | 'pdf' | 'spreadsheet' | 'video' | 'link'
          storage_path?: string | null
          external_url?: string | null
          file_size_bytes?: number | null
          mime_type?: string | null
          access_level?: 'public' | 'authenticated' | 'premium'
          thumbnail_url?: string | null
          sort_order?: number
          is_active?: boolean
          download_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          chapter_id?: string
          prompt_id?: string | null
          title?: string
          description?: string | null
          resource_type?: 'slide' | 'pdf' | 'spreadsheet' | 'video' | 'link'
          storage_path?: string | null
          external_url?: string | null
          file_size_bytes?: number | null
          mime_type?: string | null
          access_level?: 'public' | 'authenticated' | 'premium'
          thumbnail_url?: string | null
          sort_order?: number
          is_active?: boolean
          download_count?: number
          created_at?: string
        }
      }
      access_logs: {
        Row: {
          id: string
          user_id: string | null
          action_type: 'view' | 'copy' | 'download' | 'login' | 'signup'
          target_type: string | null
          target_id: string | null
          source: string | null
          user_agent: string | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action_type: 'view' | 'copy' | 'download' | 'login' | 'signup'
          target_type?: string | null
          target_id?: string | null
          source?: string | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action_type?: 'view' | 'copy' | 'download' | 'login' | 'signup'
          target_type?: string | null
          target_id?: string | null
          source?: string | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
        }
      }
      qr_codes: {
        Row: {
          id: string
          book_id: string
          code: string
          label: string | null
          target_path: string
          scan_count: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          book_id: string
          code: string
          label?: string | null
          target_path: string
          scan_count?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          book_id?: string
          code?: string
          label?: string | null
          target_path?: string
          scan_count?: number
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_prompt_stat: {
        Args: {
          prompt_uuid: string
          stat_type: string
        }
        Returns: void
      }
      increment_resource_download: {
        Args: {
          resource_uuid: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// 便利な型エイリアス
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Book = Database['public']['Tables']['books']['Row']
export type Chapter = Database['public']['Tables']['chapters']['Row']
export type Prompt = Database['public']['Tables']['prompts']['Row']
export type Resource = Database['public']['Tables']['resources']['Row']
export type AccessLog = Database['public']['Tables']['access_logs']['Row']
export type QRCode = Database['public']['Tables']['qr_codes']['Row']
