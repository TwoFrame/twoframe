import uuid
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from botocore.exceptions import ClientError

from src.models.tournament import (
    CreateTournamentPayload,
    CreateTournamentResponse,
    AttendeeJoinPayload,
    AdminJoinPayload,
)
from src.dynamodb.client import dynamodb_client

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/tournament", response_model=CreateTournamentResponse)
def create_tournament(payload: CreateTournamentPayload):
    try:
        tournament = dynamodb_client.create_tournament(
            name=payload.name,
            date=payload.date,
        )
    except ClientError as e:
        raise HTTPException(status_code=500, detail="Could not create tournament")

    return CreateTournamentResponse(
        tournament_id=tournament.tournament_id,
        admin_code=tournament.admin_code,
        attendee_code=tournament.attendee_code,
    )


@app.post("/tournament/admin")
def join_as_admin(payload: AdminJoinPayload):
    tournament = dynamodb_client.get_tournament_by_admin_code(
        payload.admin_code
    )

    if not tournament:
        raise HTTPException(status_code=404, detail="Invalid admin code")

    return tournament

@app.post("/tournament/join")
def join_as_attendee(payload: AttendeeJoinPayload):
    tournament = dynamodb_client.get_tournament_by_attendee_code(
        payload.attendee_code
    )

    if not tournament:
        raise HTTPException(status_code=404, detail="Invalid attendee code")

    try:
        attendee = dynamodb_client.add_attendee(
            tournament_id=tournament["tournament_id"],
            name=payload.name,
        )
    except ClientError:
        raise HTTPException(status_code=500, detail="Could not join tournament")

    return {
        "tournament": tournament,
        "attendee": attendee,
    }
