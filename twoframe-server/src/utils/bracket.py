import math
from collections import deque

NODE_WIDTH = 200
NODE_HEIGHT = 64
FIRST_ROUND_NODE_GAP = 100
ROUND_GAP = 164


def generate_bracket(attendees: int):
    totalRounds = math.ceil(math.log2(attendees))
    idealTotalAttendees = 2 ** totalRounds
    idealNodesInFirstRound = idealTotalAttendees / 2
    idealYRangeInFirstRound = idealNodesInFirstRound * NODE_HEIGHT + (idealNodesInFirstRound - 1) * FIRST_ROUND_NODE_GAP

    def calculate_node_x(round: int):
        return (round - 1) * ROUND_GAP + (round) * NODE_WIDTH - NODE_WIDTH

    nodes = {}
    edges = {}
    q = deque()

    q.append(((1,2), {
        "id": f"R{totalRounds}M1",
        "position": {
            "x": calculate_node_x(totalRounds),
            "y": idealYRangeInFirstRound / 2
        },
        "data": {
            "round": totalRounds,
            "match": 1,
            "player1": None,
            "player2": None,
            "score1": 0,
            "score2": 0,
            "winner": None,
            "target": None,
            "playerSources": {},
            "final": True,
        },
        "type": "bracketNode",
    }))



    while len(q) > 0:
        seeds, node = q.popleft()
        currRound = node["data"]["round"]
        newRound = currRound - 1
        yChange = idealYRangeInFirstRound / (2 ** (totalRounds - currRound+2))
        nodes[node["id"]] = node

        if (currRound < 2):
            continue


        signs = [-1, 1]
        newMatchNumbers = [2 * node["data"]["match"] - 1, 2 * node["data"]["match"]]

        byeFound = False
        for i in range(len(seeds)):
            newMatchId = f"R{newRound}M{newMatchNumbers[i]}"
            newSeeds = (seeds[i], 2 ** (totalRounds + 1 - newRound) + 1 - seeds[i])
            if max(newSeeds) > attendees:
                byeFound = True
                continue
            q.append(
                (
                    newSeeds,
                    {
                        "id": newMatchId,
                        "position": {
                            "x": calculate_node_x(newRound),
                            "y": node["position"]["y"] if byeFound else node["position"]["y"] + signs[i] * yChange
                        },
                        "data": {
                            "round": newRound,
                            "match": newMatchNumbers[i],
                            "player1": None,
                            "player2": None,
                            "score1": 0,
                            "score2": 0,    
                            "winner": None,
                            "target": node["id"],
                            "playerSources": {}
                        },
                        "type": "bracketNode",
                    }
                )
            )
            node["data"]["playerSources"][f"player{i + 1}"] = (newMatchId, False)
            
            edges[f"{newMatchId}-{node["id"]}"] = {
                "id": f"{newMatchId}-{node["id"]}",
                "source": newMatchId,
                "target": node["id"],
                "targetPlayer": f"player{i + 1}",
                "type": "smoothstep",
                "animated": True
            }

    for i in range(totalRounds):
        nodes[f"RL{i + 1}"] = {
            "id": f"RL{i + 1}",
            "position": {
                "x": calculate_node_x(i + 1),
                "y": 0,
            },
            "data": {
                "label": f"Round {i + 1}",
            },
            "type": "roundLabelNode",
        }

    return nodes, edges
