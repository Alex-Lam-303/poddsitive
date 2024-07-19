import sqlite3
from datetime import datetime

def get_team(name):
    # Dummy implementation, replace with actual logic
    return name

def iso_to_dt(iso_str):
    # Convert ISO 8601 string to datetime object
    return datetime.fromisoformat(iso_str.replace("Z", "+00:00"))

def fmt_odds(odds_info: dict, line: dict) -> list[dict]:
    return [
        {
            "game_id": odds_info["game_id"],           # game_id
            "sportsbook": odds_info["sportsbook"],     # sportsbook
            "market": "money_line",                    # market
            "team": get_team(line["outcomes"][0]["name"]),  # team
            "price": line["outcomes"][0]["price"],     # price
            "updated": iso_to_dt(line["last_update"]), # updated
            "home_team": odds_info["home_team"],       # home_team
            "away_team": odds_info["away_team"]        # away_team
        },
        {
            "game_id": odds_info["game_id"],           # game_id
            "sportsbook": odds_info["sportsbook"],     # sportsbook
            "market": "money_line",                    # market
            "team": get_team(line["outcomes"][1]["name"]),  # team
            "price": line["outcomes"][1]["price"],     # price
            "updated": iso_to_dt(line["last_update"]), # updated
            "home_team": odds_info["home_team"],       # home_team
            "away_team": odds_info["away_team"]        # away_team
        }
    ] if line["key"] == "h2h" else []

def preprocess_data(data):
    processed_data = []
    print("Data structure:", type(data))  # Debug print
    if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
        for event in data:
            print("Event structure:", type(event))  # Debug print
            event_id = event['id']
            home_team = event['home_team']
            away_team = event['away_team']
            for bookmaker in event['bookmakers']:
                odds_info = {
                    "game_id": event_id,
                    "sportsbook": bookmaker['title'],
                    "home_team": home_team,
                    "away_team": away_team
                }
                for market in bookmaker['markets']:
                    formatted_odds = fmt_odds(odds_info, market)
                    processed_data.extend(formatted_odds)
    else:
        print("Unexpected data format")
    return processed_data

def process_data_to_sql(data):
    # Pre-process the data
    processed_data = preprocess_data(data)

    # Connect to an in-memory SQLite database
    conn = sqlite3.connect(':memory:')
    cursor = conn.cursor()

    # Create events table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            game_id TEXT,
            sportsbook TEXT,
            market TEXT,
            team TEXT,
            price REAL,
            updated TEXT,
            home_team TEXT,
            away_team TEXT
        )
    ''')

    # Insert pre-processed data into events table
    for odds in processed_data:
        cursor.execute('''
            INSERT INTO events (
                game_id, sportsbook, market, team, price, updated, home_team, away_team
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (odds['game_id'], odds['sportsbook'], odds['market'], odds['team'], odds['price'], odds['updated'], odds['home_team'], odds['away_team']))

    # Query for positive EV using the provided query
    cursor.execute('''
        WITH last_line AS (
            SELECT
                money_line.game_id, money_line.sportsbook, money_line.team,
                (
                    CASE
                        WHEN game.away_team = money_line.team THEN game.home_team
                        WHEN game.away_team != money_line.team THEN game.away_team
                    END
                ) AS opp, p.updated, money_line.price, 1 / money_line.price AS imp_prob
            FROM
                events AS money_line
            JOIN
                (
                    SELECT
                        game_id, sportsbook, team, MAX(updated) as updated
                    FROM
                        events
                    GROUP BY game_id, sportsbook, team
                ) p
                    ON
                money_line.game_id = p.game_id
                    AND
                money_line.sportsbook = p.sportsbook
                    AND
                money_line.team = p.team
                    AND
                money_line.updated = p.updated
            JOIN
                (
                    SELECT DISTINCT game_id, home_team, away_team
                    FROM events
                ) game
                    ON
                game.game_id = money_line.game_id
        ),
        positive_ev_bets AS (
            SELECT
                last_line.team, last_line.opp, last_line.sportsbook,
                last_line.price, ROUND(agg_lines.avg_line, 2) AS avg_price,
                ROUND(last_line.imp_prob, 5) AS imp_prob,
                ROUND(agg_lines.imp_prob, 5) As avg_imp_prob, 
                ROUND(agg_lines.imp_prob - last_line.imp_prob, 5) As positive_ev
            FROM
                last_line
            LEFT JOIN
                (
                    SELECT
                        game_id, team, AVG(price) as avg_line,
                        AVG(1 / price) as imp_prob
                    FROM
                        last_line
                    GROUP BY
                        game_id, team
                ) agg_lines
                    ON
                last_line.game_id = agg_lines.game_id
                    AND
                last_line.team = agg_lines.team
            WHERE
                (agg_lines.imp_prob - last_line.imp_prob) > .01
        ),
        max_ev_bets AS (
            SELECT
                team, opp, MAX(positive_ev) as max_ev
            FROM
                positive_ev_bets
            GROUP BY
                team, opp
        )
        SELECT
            p.team, p.opp, p.sportsbook, p.price, p.avg_price, p.imp_prob, p.avg_imp_prob, p.positive_ev
        FROM
            positive_ev_bets p
        JOIN
            max_ev_bets m
        ON
            p.team = m.team
            AND p.opp = m.opp
            AND p.positive_ev = m.max_ev
        ORDER BY
            p.positive_ev DESC;
    ''')
    positive_ev_bets = cursor.fetchall()

    # Print the results
    print("Positive EV Bets:")
    for bet in positive_ev_bets:
        print(bet)

    # Close connection
    conn.close()

# Assuming 'data' and 'data2' are already defined
print("Processing data:")
process_data_to_sql(data)

print("\nProcessing data2:")
process_data_to_sql(data2)