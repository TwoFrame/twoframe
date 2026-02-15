import math
from collections import deque

NODE_WIDTH = 200
NODE_HEIGHT = 64
FIRST_ROUND_NODE_GAP = 100
ROUND_GAP = 264


def calculate_x(round: int):
    return (round - 1) * ROUND_GAP + (round) * NODE_WIDTH - NODE_WIDTH


def generate_bracket(attendees: int):
    rounds = math.ceil(math.log2(attendees))
    nodesInFirstRound = 2 ** (rounds - 1)

    q = deque()
    nodes = []
    edges = []

    for i in range(nodesInFirstRound):
        q.append(
            {
                "id": f"R1_M{i + 1}",
                "position": {
                    "x": calculate_x(1),
                    "y": i * (NODE_HEIGHT + FIRST_ROUND_NODE_GAP),
                },
                "data": {
                    "round": 1,
                    "match": i + 1,
                    "player1": None,
                    "player2": None,
                    "score1": 0,
                    "score2": 0,
                    "winner": None,
                },
                "type": "bracketNode",
            }
        )

    while len(q) > 0:
        n1 = q.popleft()
        nodes.append(n1)
        if len(q) == 0:
            break
        n2 = q.popleft()
        nodes.append(n2)

        next_round = n1["data"]["round"] + 1
        n3 = {
            "id": f"R{next_round}_M{(n1['data']['match'] + 1) // 2}",
            "position": {
                "x": calculate_x(next_round),
                "y": (n1["position"]["y"] + n2["position"]["y"]) // 2,
            },
            "data": {
                "round": next_round,
                "match": (n1["data"]["match"] + 1) // 2,
                "player1": None,
                "player2": None,
                "score1": 0,
                "score2": 0,
                "winner": None,
            },
            "type": "bracketNode",
        }
        q.append(n3)
        edges.append(
            {
                "id": f"{n1['id']}-{n3['id']}",
                "source": n1["id"],
                "target": n3["id"],
                "type": "smoothstep",
                "animated": True,
            }
        )
        edges.append(
            {
                "id": f"{n2['id']}-{n3['id']}",
                "source": n2["id"],
                "target": n3["id"],
                "type": "smoothstep",
                "animated": True,
            }
        )

    for i in range(rounds):
        nodes.append(
            {
                "id": f"RL{i + 1}",
                "position": {
                    "x": calculate_x(i + 1),
                    "y": -FIRST_ROUND_NODE_GAP,
                },
                "data": {
                    "label": f"Round {i + 1}",
                },
                "type": "roundLabelNode",
            }
        )
    return nodes, edges
