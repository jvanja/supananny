export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      job_types: {
        Row: {
          id: number
          job_name: string | null
        }
        Insert: {
          id?: number
          job_name?: string | null
        }
        Update: {
          id?: number
          job_name?: string | null
        }
      }
      languages: {
        Row: {
          id: number
          language_name: string | null
        }
        Insert: {
          id?: number
          language_name?: string | null
        }
        Update: {
          id?: number
          language_name?: string | null
        }
      }
      messages: {
        Row: {
          created_at: string
          id: number
          message: string
          post_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string
          post_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          post_id?: number | null
        }
      }
      posts: {
        Row: {
          created_at: string
          id: number
          post: string | null
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          post?: string | null
          user: string
        }
        Update: {
          created_at?: string
          id?: number
          post?: string | null
          user?: string
        }
      }
      users_meta: {
        Row: {
          about: string | null
          can_drive: boolean | null
          created_at: string | null
          full_time_or_part_time: boolean | null
          id: number
          job_type: number | null
          location: string | null
          name: string | null
          picture: string | null
          radius: number | null
          slug: string | null
          uuid: string | null
        }
        Insert: {
          about?: string | null
          can_drive?: boolean | null
          created_at?: string | null
          full_time_or_part_time?: boolean | null
          id?: number
          job_type?: number | null
          location?: string | null
          name?: string | null
          picture?: string | null
          radius?: number | null
          slug?: string | null
          uuid?: string | null
        }
        Update: {
          about?: string | null
          can_drive?: boolean | null
          created_at?: string | null
          full_time_or_part_time?: boolean | null
          id?: number
          job_type?: number | null
          location?: string | null
          name?: string | null
          picture?: string | null
          radius?: number | null
          slug?: string | null
          uuid?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
