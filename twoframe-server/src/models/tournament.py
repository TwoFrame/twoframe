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
    state: Literal['open', 'playing', 'finished']


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


class CreateAttendeePayload(BaseModel):
    name: str
    attendee_code: str

class AdminJoinPayload(BaseModel):
    admin_code: str