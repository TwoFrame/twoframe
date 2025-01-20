export interface EventData {
    id: string;
    tournament_id: string;
    title: string;
    game: string;
    entrant_limit: number;
    start_date: string;
    rules: string;
    created_at: string;
    attendees: number;
    slug: string;
    serialized_bracket: string;
    completed: boolean;
  }
