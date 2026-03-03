/* ═══════════════════════════════════════════════════════
   Database Types — Supabase Schema
   ═══════════════════════════════════════════════════════ */

export interface Database {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string;
          project_id: string;
          rating: number;
          review_text: string;
          name: string | null;
          image_url: string | null;
          country: string;
          consent_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          rating: number;
          review_text: string;
          name?: string | null;
          image_url?: string | null;
          country: string;
          consent_public: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
    };
  };
}

export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
