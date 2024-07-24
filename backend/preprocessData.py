from datetime import datetime

teamMap = {
    "Arizona Diamondbacks": "AZ",
    "Atlanta Braves": "ATL",
    "Baltimore Orioles": "BAL",
    "Boston Red Sox": "BOS",
    "Chicago Cubs": "CHC",
    "Chicago White Sox": "CWS",
    "Cincinnati Reds": "CIN",
    "Cleveland Guardians": "CLE",
    "Colorado Rockies": "COL",
    "Detroit Tigers": "DET",
    "Houston Astros": "HOU",
    "Kansas City Royals": "KC",
    "Los Angeles Angels": "LAA",
    "Los Angeles Dodgers": "LAD",
    "Miami Marlins": "MIA",
    "Milwaukee Brewers": "MIL",
    "Minnesota Twins": "MIN",
    "New York Mets": "NYM",
    "New York Yankees": "NYY",
    "Oakland Athletics": "OAK",
    "Philadelphia Phillies": "PHI",
    "Pittsburgh Pirates": "PIT",
    "San Diego Padres": "SD",
    "San Francisco Giants": "SF",
    "Seattle Mariners": "SEA",
    "St. Louis Cardinals": "STL",
    "Tampa Bay Rays": "TB",
    "Texas Rangers": "TEX",
    "Toronto Blue Jays": "TOR",
    "Washington Nationals": "WSH",
}


def iso_to_dt(iso_str):
    return datetime.fromisoformat(iso_str.replace("Z", "+00:00"))

def format_data(odds_info, line):
    if line["key"] == "h2h":
        return [
            {
            "game_id": odds_info["game_id"],
            "sport_key": odds_info["sport_key"],
            "commence_time": odds_info["commence_time"],
            "sportsbook": odds_info["sportsbook"],
            "market": "Moneyline",
            "team": outcome["name"],
            "price": outcome["price"],
            "line": outcome["name"] + " Moneyline",
            "home_team": odds_info["home_team"],
            "away_team": odds_info["away_team"],
            "last_update": line["last_update"]
        }
            for outcome in line["outcomes"]
        ]
    elif line["key"] == "spreads":
        return [
            {
            "game_id": odds_info["game_id"],
            "sport_key": odds_info["sport_key"],
            "commence_time": odds_info["commence_time"],
            "sportsbook": odds_info["sportsbook"],
            "market": "Spread",
            "team": outcome["name"],
            "point": outcome["point"],
            "line": outcome["name"] + " " + (outcome["point"]<0 and str(outcome["point"]) or "+"+str(outcome["point"])),
            "price": outcome["price"],
            "home_team": odds_info["home_team"],
            "away_team": odds_info["away_team"],
            "last_update": line["last_update"]
        }
        for outcome in line["outcomes"]
    ]
    elif line["key"] == "totals":
        return [
            {
            "game_id": odds_info["game_id"],
            "sport_key": odds_info["sport_key"],
            "commence_time": odds_info["commence_time"],
            "sportsbook": odds_info["sportsbook"],
            "market": "Total",
            "team": outcome["name"],
            "point": outcome["point"],
            "line": teamMap[odds_info["home_team"]] + " vs " + teamMap[odds_info["away_team"]] + "\n" + str(outcome["name"]) + " " + str(outcome["point"]),
            "price": outcome["price"],
            "home_team": odds_info["home_team"],
            "away_team": odds_info["away_team"],
            "last_update": line["last_update"]
        }
        for outcome in line["outcomes"]
    ]

def preprocess_data(data):
    processed_data = []
    if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
        for event in data:
            event_id = event['id']
            sport_key = event['sport_key']
            home_team = event['home_team']
            away_team = event['away_team']
            commence_time = event['commence_time']
            for bookmaker in event['bookmakers']:
                odds_info = {
                    "game_id": event_id,
                    "sport_key": sport_key,
                    "sportsbook": bookmaker['title'],
                    "home_team": home_team,
                    "away_team": away_team,
                    "commence_time": commence_time,
                }
                for market in bookmaker['markets']:
                    formatted_odds = format_data(odds_info, market)
                    processed_data.extend(formatted_odds)
    else:
        print("Unexpected data format")
    return processed_data