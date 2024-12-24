export interface TournamentCreateState {
  validation_error: {
    title?: string[],
    start_date?: string[],
    end_date?: string[],
    description?: string[],
    is_public?: string[]
  } | null;
  server_error?: any;
  success?: boolean;
}
