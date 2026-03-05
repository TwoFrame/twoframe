export type TournamentState = "open" | "playing" | "completed";

export type TournamentData = {
  tournament_id: string;
  name: string;
  date: string;
  admin_code: string;
  attendee_code: string;
  state: TournamentState;
  bracket?: string;
  attendees?: Attendee[];
};

export type Attendee = {
  name: string;
  tournament_id: string;
  attendee_id: string;
};
