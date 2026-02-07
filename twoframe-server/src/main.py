import uuid
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from botocore.exceptions import ClientError

from src.models.tournament import (
    CreateTournamentPayload,
    UpdateTournamentStatePayload,
    CreateTournamentResponse,
    CreateAttendeePayload,
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

@app.get("/tournament/{id}")
def get_tournament(id: str):
    tournament = dynamodb_client.get_tournament(id)
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return {
        "date": tournament["date"],
        "tournament_id": tournament["tournament_id"],
        "name": tournament["name"],
    }

@app.get("/tournament/admin/{code}")
def get_tournament_by_admin_code(code: str):
    tournament = dynamodb_client.get_tournament_by_admin_code(
        code
    )

    if not tournament:
        raise HTTPException(status_code=404, detail="Invalid admin code")

    return tournament

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

@app.post("/attendee")
def create_attendee(payload: CreateAttendeePayload):
    tournament = dynamodb_client.get_tournament_by_attendee_code(
        payload.attendee_code
    )

    if not tournament:
        raise HTTPException(status_code=404, detail="Invalid attendee code")
    
    if tournament["state"] != "open":
        raise HTTPException(status_code=403, detail="Tournament not accepting new attendees")

    try:
        attendee = dynamodb_client.create_attendee(
            name=payload.name,
            attendee_code=payload.attendee_code,
            tournament_id=tournament["tournament_id"],
        )
    except ClientError:
        raise HTTPException(status_code=500, detail="Could not join tournament")

    return {
        "attendee": attendee
    }

@app.get("/tournament/{id}/attendees")
def get_attendees(id: str):
    attendees = dynamodb_client.get_attendees(id)
    return {
        "attendees": attendees
    }

@app.put("/tournament/{id}/state")
def update_tournament_state(payload: UpdateTournamentStatePayload):
    #make sure tournament exists
    tournament = dynamodb_client.get_tournament(payload.tournament_id)
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    
    #make sure the state transition is valid
    if payload.state == "playing" and tournament["state"] != "open":
        raise HTTPException(status_code=403, detail="Tournament cannot be transitioned to playing. Current state: " + tournament["state"])
    if payload.state == "completed" and tournament["state"] != "playing":
        raise HTTPException(status_code=403, detail="Tournament cannot be transitioned to completed. Current state: " + tournament["state"])
    
    tournament = dynamodb_client.update_tournament_state(
        tournament_id=payload.tournament_id,
        new_state=payload.state,
    )

    return {
        "message": "Tournament state updated"
    }
