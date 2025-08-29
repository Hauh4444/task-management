import { createClient } from '@supabase/supabase-js'

// Supabase config - using fallback values since env vars can be finicky sometimes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lxngbsfmchpysgcheawr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bmdic2ZtY2hweXNnY2hlYXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0ODg3ODYsImV4cCI6MjA3MjA2NDc4Nn0.VNEnxH6mTKdAdeGr3ugeX7YG7RsPRNtY8dyoWURvNbo'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration - check your environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database type definitions - keeping these here for now but could move to separate file
export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'todo' | 'in-progress' | 'completed'
          priority: 'low' | 'medium' | 'high'
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'todo' | 'in-progress' | 'completed'
          priority?: 'low' | 'medium' | 'high'
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'in-progress' | 'completed'
          priority?: 'low' | 'medium' | 'high'
          user_id?: string
        }
      }
    }
  }
}