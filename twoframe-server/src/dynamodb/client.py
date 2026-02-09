import boto3
import random
import string
from uuid import uuid4
from typing import Optional
import json

from src.config import settings
from src.models.tournament import Tournament, Attendee
from src.utils.bracket import generate_bracket

class DynamoDBClient:
    def __init__(self):
        self.dynamodb = boto3.resource(
            "dynamodb",
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key,
            aws_secret_access_key=settings.aws_secret_key,
        )
        self.tournament_table = self.dynamodb.Table(settings.tournament_table_name)
        self.attendee_table = self.dynamodb.Table(settings.attendee_table_name)


    # -------------------------
    # Tournament
    # -------------------------
    def create_tournament(self, name: str, date: str) -> Tournament:
        tournament = Tournament(
            tournament_id=str(uuid4()),
            name=name,
            date=date,
            admin_code=str(uuid4()),
            attendee_code="".join(
                random.choices(string.ascii_uppercase + string.digits, k=8)
            ),
            state="open"
        )

        self.tournament_table.put_item(
            Item=tournament.model_dump(),
            ConditionExpression="attribute_not_exists(tournament_id)",
        )

        return tournament

    def get_tournament(self, tournament_id: str):
        response = self.tournament_table.get_item(
            Key={"tournament_id": tournament_id}
        )
        return response.get("Item", None)

    def get_tournament_by_admin_code(self, admin_code: str):
        response = self.tournament_table.scan(
            FilterExpression="admin_code = :code",
            ExpressionAttributeValues={":code": admin_code},
        )
        items = response.get("Items", [])
        return items[0] if items else None

    def get_tournament_by_attendee_code(self, attendee_code: str):
        response = self.tournament_table.scan(
            FilterExpression="attendee_code = :code",
            ExpressionAttributeValues={":code": attendee_code},
        )
        items = response.get("Items", [])
        return items[0] if items else None

    def update_tournament_state(self, tournament_id: str, new_state: str, num_attendees: Optional[int] = None):
        if new_state == "playing":
            #need to generate bracket first
            nodes, edges = generate_bracket(num_attendees)

            serialized_bracket = {
                "nodes": nodes,
                "edges": edges,
            }
            
            
            # When starting tournament, initialize bracket field
            self.tournament_table.update_item(
                Key={"tournament_id": tournament_id},
                UpdateExpression="SET #state = :state, bracket = :bracket", 
                ExpressionAttributeNames={"#state": "state"},
                ExpressionAttributeValues={
                    ":state": new_state,
                    ":bracket": json.dumps(serialized_bracket)
                },
            )
        else:
            # For other state transitions (e.g., completed), only update state
            self.tournament_table.update_item(
                Key={"tournament_id": tournament_id},
                UpdateExpression="SET #state = :state",
                ExpressionAttributeNames={"#state": "state"},
                ExpressionAttributeValues={
                    ":state": new_state
                },
            )

    # -------------------------
    # Attendee
    # -------------------------
    def create_attendee(self, name: str, attendee_code: str, tournament_id: str) -> Attendee:
        #first has to check that code is valid
        tournament = self.get_tournament_by_attendee_code(attendee_code)
        
        attendee = Attendee(
            tournament_id=tournament_id,
            attendee_id=str(uuid4()),
            name=name,
        )

        self.attendee_table.put_item(
            Item=attendee.model_dump(),
            ConditionExpression="attribute_not_exists(attendee_id)",
        )

        return attendee
    
    def get_attendees(self, tournament_id:str):
        response = self.attendee_table.scan(
            FilterExpression="tournament_id = :id",
            ExpressionAttributeValues={ ":id": tournament_id },
        )
        return response.get("Items", [])
    
    def update_bracket(self, tournament_id: str, bracket: str):
        self.tournament_table.update_item(
            Key={"tournament_id": tournament_id},
            UpdateExpression="SET bracket = :bracket",
            ExpressionAttributeValues={
                ":bracket": bracket
            },
        )
        
# singleton
dynamodb_client = DynamoDBClient()