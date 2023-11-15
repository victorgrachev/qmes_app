export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      chat: {
        Row: {
          created_at: string | null;
          id: number;
          name: string | null;
          type: Database['public']['Enums']['type_chat'] | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
          type?: Database['public']['Enums']['type_chat'] | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
          type?: Database['public']['Enums']['type_chat'] | null;
        };
        Relationships: [];
      };
      file: {
        Row: {
          created_at: string | null;
          file_type_id: number | null;
          id: number;
          name: string | null;
          url: string | null;
        };
        Insert: {
          created_at?: string | null;
          file_type_id?: number | null;
          id?: number;
          name?: string | null;
          url?: string | null;
        };
        Update: {
          created_at?: string | null;
          file_type_id?: number | null;
          id?: number;
          name?: string | null;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'file_file_type_id_fkey';
            columns: ['file_type_id'];
            isOneToOne: false;
            referencedRelation: 'file_type';
            referencedColumns: ['id'];
          },
        ];
      };
      file_message: {
        Row: {
          created_at: string | null;
          file_id: number | null;
          id: number;
          message_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          file_id?: number | null;
          id?: number;
          message_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          file_id?: number | null;
          id?: number;
          message_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'file_message_file_id_fkey';
            columns: ['file_id'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'file_message_message_id_fkey';
            columns: ['message_id'];
            isOneToOne: false;
            referencedRelation: 'message';
            referencedColumns: ['id'];
          },
        ];
      };
      file_type: {
        Row: {
          code: string | null;
          created_at: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          code?: string | null;
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      message: {
        Row: {
          chat_id: number | null;
          created_at: string | null;
          creator_user_id: number | null;
          id: number;
          text_value: string | null;
        };
        Insert: {
          chat_id?: number | null;
          created_at?: string | null;
          creator_user_id?: number | null;
          id?: number;
          text_value?: string | null;
        };
        Update: {
          chat_id?: number | null;
          created_at?: string | null;
          creator_user_id?: number | null;
          id?: number;
          text_value?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'message_chat_id_fkey';
            columns: ['chat_id'];
            isOneToOne: false;
            referencedRelation: 'chat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'message_creator_user_id_fkey';
            columns: ['creator_user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      participant_chat: {
        Row: {
          chat_id: number | null;
          created_at: string | null;
          id: number;
          user_id: number | null;
        };
        Insert: {
          chat_id?: number | null;
          created_at?: string | null;
          id?: number;
          user_id?: number | null;
        };
        Update: {
          chat_id?: number | null;
          created_at?: string | null;
          id?: number;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'participant_chat_chat_id_fkey';
            columns: ['chat_id'];
            isOneToOne: false;
            referencedRelation: 'chat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'participant_chat_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      user: {
        Row: {
          birthday: string | null;
          created_at: string | null;
          first_name: string | null;
          gender: Database['public']['Enums']['gender'] | null;
          id: number;
          iqs: string;
          last_name: string | null;
        };
        Insert: {
          birthday?: string | null;
          created_at?: string | null;
          first_name?: string | null;
          gender?: Database['public']['Enums']['gender'] | null;
          id?: number;
          iqs: string;
          last_name?: string | null;
        };
        Update: {
          birthday?: string | null;
          created_at?: string | null;
          first_name?: string | null;
          gender?: Database['public']['Enums']['gender'] | null;
          id?: number;
          iqs?: string;
          last_name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      gender: 'male' | 'female';
      type_chat: 'single' | 'group';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
