from datetime import datetime

def iso_to_dt(iso_str):
    return datetime.fromisoformat(iso_str.replace("Z", "+00:00"))

def format_data(odds_info, line):
    if line["key"] == "h2h":
        return [
            {
            "game_id": odds_info["game_id"],
            "commence_time": odds_info["commence_time"],
            "sportsbook": odds_info["sportsbook"],
            "market": "Moneyline",
            "team": outcome["name"],
            "price": outcome["price"],
            "line": outcome["name"] + " ML",
            "home_team": odds_info["home_team"],
            "away_team": odds_info["away_team"]
        }
            for outcome in line["outcomes"]
        ]
    elif line["key"] == "spreads":
        return [
            {
            "game_id": odds_info["game_id"],
            "commence_time": odds_info["commence_time"],
            "sportsbook": odds_info["sportsbook"],
            "market": "Spread",
            "team": outcome["name"],
            "point": outcome["point"],
            "line": outcome["name"] + " " + (outcome["point"]<0 and str(outcome["point"]) or "+"+str(outcome["point"])),
            "price": outcome["price"],
            "home_team": odds_info["home_team"],
            "away_team": odds_info["away_team"]
        }
        for outcome in line["outcomes"]
    ]
    elif line["key"] == "totals":
        return [
            {
            "game_id": odds_info["game_id"],
            "commence_time": odds_info["commence_time"],
            "sportsbook": odds_info["sportsbook"],
            "market": "Total",
            "team": outcome["name"],
            "point": outcome["point"],
            "line": outcome["name"] + " " + str(outcome["point"]),
            "price": outcome["price"],
            "home_team": odds_info["home_team"],
            "away_team": odds_info["away_team"]
        }
        for outcome in line["outcomes"]
    ]

def preprocess_data(data):
    processed_data = []
    if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
        for event in data:
            event_id = event['id']
            home_team = event['home_team']
            away_team = event['away_team']
            commence_time = event['commence_time']
            for bookmaker in event['bookmakers']:
                odds_info = {
                    "game_id": event_id,
                    "sportsbook": bookmaker['title'],
                    "home_team": home_team,
                    "away_team": away_team,
                    "commence_time": commence_time
                }
                for market in bookmaker['markets']:
                    formatted_odds = format_data(odds_info, market)
                    processed_data.extend(formatted_odds)
    else:
        print("Unexpected data format")
    return processed_data


data = [
  {
    "id": "562a55b3afcb73ae98f6e3cdd74d1ef0",
    "sport_key": "baseball_mlb",
    "sport_title": "MLB",
    "commence_time": "2024-07-21T17:37:00Z",
    "home_team": "New York Yankees",
    "away_team": "Tampa Bay Rays",
    "bookmakers": [
      {
        "key": "fanduel",
        "title": "FanDuel",
        "last_update": "2024-07-21T20:39:38Z",
        "markets": [
          {
            "key": "h2h",
            "last_update": "2024-07-21T20:39:38Z",
            "outcomes": [
              { "name": "New York Yankees", "price": 15.0 },
              { "name": "Tampa Bay Rays", "price": 1.02 }
            ]
          },
          {
            "key": "spreads",
            "last_update": "2024-07-21T20:39:38Z",
            "outcomes": [
              { "name": "New York Yankees", "price": 4.4, "point": 1.5 },
              { "name": "Tampa Bay Rays", "price": 1.19, "point": -1.5 }
            ]
          }
        ]
      },
      {
        "key": "draftkings",
        "title": "DraftKings",
        "last_update": "2024-07-21T20:39:37Z",
        "markets": [
          {
            "key": "h2h",
            "last_update": "2024-07-21T20:39:37Z",
            "outcomes": [
              { "name": "New York Yankees", "price": 17.0 },
              { "name": "Tampa Bay Rays", "price": 1.02 }
            ]
          },
          {
            "key": "spreads",
            "last_update": "2024-07-21T20:39:37Z",
            "outcomes": [
              { "name": "New York Yankees", "price": 3.8, "point": 1.5 },
              { "name": "Tampa Bay Rays", "price": 1.25, "point": -1.5 }
            ]
          },
          {
            "key": "totals",
            "last_update": "2024-07-21T20:39:37Z",
            "outcomes": [
              { "name": "Over", "price": 3.6, "point": 10.5 },
              { "name": "Under", "price": 1.28, "point": 10.5 }
            ]
          }
        ]
      },
      {
        "key": "betmgm",
        "title": "BetMGM",
        "last_update": "2024-07-21T20:40:43Z",
        "markets": [
          {
            "key": "h2h",
            "last_update": "2024-07-21T20:40:43Z",
            "outcomes": [
              { "name": "New York Yankees", "price": 7.25 },
              { "name": "Tampa Bay Rays", "price": 1.09 }
            ]
          },
          {
            "key": "spreads",
            "last_update": "2024-07-21T20:40:43Z",
            "outcomes": [
              { "name": "New York Yankees", "price": 3.4, "point": 1.5 },
              { "name": "Tampa Bay Rays", "price": 1.29, "point": -1.5 }
            ]
          }
        ]
      }
    ]
  }
]

