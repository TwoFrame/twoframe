import boto3
import random
import string
from uuid import uuid4

from src.config import settings
from src.models.tournament import Tournament, Attendee

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
        )

        self.tournament_table.put_item(
            Item=tournament.model_dump(),
            ConditionExpression="attribute_not_exists(tournament_id)",
        )

        return tournament

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

    # -------------------------
    # Attendee
    # -------------------------
    def add_attendee(self, tournament_id: str, name: str) -> Attendee:
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


# singleton
dynamodb_client = DynamoDBClient()