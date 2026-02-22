from pydantic import BaseModel
from typing import Literal

# -------------------------
# Tables
# -------------------------


class Tournament(BaseModel):
    tournament_id: str
    name: str
    date: str
    admin_code: str
    attendee_code: str
    state: Literal["open", "playing", "completed"]


class Attendee(BaseModel):
    tournament_id: str
    attendee_id: str
    name: str


# -------------------------
# API Payloads
# -------------------------


class CreateTournamentPayload(BaseModel):
    name: str
    date: str


class CreateTournamentResponse(BaseModel):
    tournament_id: str
    admin_code: str
    attendee_code: str


class UpdateTournamentStatePayload(BaseModel):
    tournament_id: str
    state: Literal["playing", "completed"]


class CreateAttendeePayload(BaseModel):
    name: str
    attendee_code: str


class UpdateMatchPayload(BaseModel):
    admin_code: str
    player1: str | None
    player2: str | None
    score1: int | None
    score2: int | None
    winner: Literal[1, 2] | None

class UndoPlayerSourcePayload(BaseModel):
    admin_code: str
    player_source: Literal["player1", "player2"]
