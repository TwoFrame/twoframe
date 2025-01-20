export interface TournamentCreateState {
  validation_error: {
    title?: string[];
    start_date?: string[];
    end_date?: string[];
    description?: string[];
    is_public?: string[];
  } | null;
  server_error?: any;
  success?: boolean;
}

export interface TournamentData {
  public: boolean | null;
  id: string;
  owner_id: string;
  created_at: Date;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  slug: string;
}

export type TournamentContextType = {
  tournament: TournamentData | null;
};
