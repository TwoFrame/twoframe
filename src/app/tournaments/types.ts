export interface TournamentCreateState {
  errors?: {
    title?: string[];
    start_date?: string[];
    end_date?: string[];
  };
  success?: boolean;
}
